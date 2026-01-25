# app/routes/leads.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
 
from ..database import SessionLocal
from ..models import Lead, LeadStatus, User
from ..schemas import LeadCreate, LeadResponse,LeadStatusUpdate
from app.dependencies.roles import require_role
from app.core.roles import Role

router = APIRouter(prefix="/leads", tags=["Leads"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ CREATE LEAD (ADMIN + AGENT)
@router.post("/", response_model=LeadResponse)
def create_lead(
    lead: LeadCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role([Role.ADMIN, Role.AGENT]))
):
    existing = db.query(Lead).filter(Lead.email == lead.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Lead already exists")

    new_lead = Lead(
        business_name=lead.business_name,
        email=lead.email,
        industry=lead.industry,
        city=lead.city,
        status=LeadStatus.NEW.value,
        # assigned_to=current_user["sub"]  # ✅ FIXED
        assigned_to=current_user.id  
    )

    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)
    return new_lead


# ✅ LIST LEADS (ROLE-AWARE)
@router.get("/", response_model=list[LeadResponse])
def list_leads(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role([Role.ADMIN, Role.AGENT]))
):
    # ADMIN → all leads
    # if current_user.role == Role.ADMIN:
    if current_user.role == Role.ADMIN.value:
        return db.query(Lead).all()

    # AGENT → only assigned leads
    return (
        db.query(Lead)
        .filter(Lead.assigned_to == current_user.id)
        .all()
    )


# ✅ VIEW LEAD BY ID (SECURE)
@router.get("/{lead_id}", response_model=LeadResponse)
def get_lead(
    lead_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role([Role.ADMIN, Role.AGENT]))
):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()

    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    # AGENT cannot access other agent's leads
    # if current_user.role != Role.ADMIN and lead.assigned_to != current_user.id:
    if current_user.role != Role.ADMIN.value and lead.assigned_to != current_user.id:

        raise HTTPException(status_code=403, detail="Not authorized")

    return lead





# ✅ UPDATE LEAD STATUS (ADMIN + AGENT)
@router.patch("/{lead_id}", response_model=LeadResponse)
def update_lead_status(
    lead_id: int,
    payload: LeadStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role([Role.ADMIN, Role.AGENT])),
):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()

    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    # AGENT cannot update other agent's leads
    if current_user.role != Role.ADMIN.value and lead.assigned_to != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    # Validate status
    valid_statuses = [s.value for s in LeadStatus]
    if payload.status not in valid_statuses:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status. Must be one of {valid_statuses}",
        )

    # Update + persist
    lead.status = payload.status
    db.commit()
    db.refresh(lead)

    # 🔥 CRITICAL: return FULL lead
    return lead
