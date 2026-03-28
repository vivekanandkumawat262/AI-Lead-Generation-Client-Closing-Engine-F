from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models import Lead, LeadStatus, EmailLog
from ..services.email_service import send_email

router = APIRouter(prefix="/outreach", tags=["Outreach"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/send")
def send_outreach(lead_id: int, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    print(lead.id,lead.business_name)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    email = (
        db.query(EmailLog)
        .filter(EmailLog.id == lead_id)
        .order_by(EmailLog.sent_at.desc())
        .first()
    )

    if not email:
        raise HTTPException(status_code=400, detail="No email generated for this lead")

    try:
        send_email(
            to_email=lead.email,
            subject=email.subject,
            body=email.body,
        )

        # Update lead status AFTER successful send
        lead.status = LeadStatus.CONTACTED.value

        db.commit()

        return {
            "message": "Email sent successfully",
            "lead_id": lead.id,
            "status": lead.status
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))




 