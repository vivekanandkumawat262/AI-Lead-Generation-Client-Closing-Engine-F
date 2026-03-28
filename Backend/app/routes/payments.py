from ..dependencies.auth import get_current_user
import stripe
import os
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models import Lead, LeadStatus, Payment
from ..schemas import PaymentLinkResponse
from app.dependencies.roles import require_role
from app.core.roles import Role

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

router = APIRouter(prefix="/payments", tags=["Payments"])
print("Stripe Key:", stripe.api_key)  

# 🔹 DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
      

# 🔹 Create Payment Link 
  
@router.post("/create/{lead_id}")
def create_payment_link(lead_id: int, db: Session = Depends(get_db)):

    print("🔥 CREATE API HIT")

    lead = db.query(Lead).filter(Lead.id == lead_id).first()

    if not lead:
        print("❌ Lead not found")
        raise HTTPException(status_code=404)

    print("Lead ID:", lead.id)
    print("Lead Status:", lead.status)

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="payment",
            line_items=[{
                "price_data": {
                    "currency": "inr",
                    "product_data": {
                        "name": f"Service for {lead.business_name}",
                    },
                    "unit_amount": 3000000,
                },
                "quantity": 1,
            }],
            success_url="http://localhost:5173/payment-success",
            cancel_url="http://localhost:5173/payment-cancel",
            metadata={"lead_id": str(lead.id)}
        )

        print("✅ SESSION CREATED")
        print("SESSION ID:", session.id)
        print("METADATA:", session.metadata)
        print("URL:", session.url)

    except Exception as e:
        print("❌ STRIPE ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))

    return {"payment_url": session.url}


 

@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):

    print("\n🔥 WEBHOOK HIT")

    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload,
            sig_header,
            os.getenv("STRIPE_WEBHOOK_SECRET")
        )
    except Exception as e:
        print("❌ SIGNATURE ERROR:", e)
        raise HTTPException(status_code=400)

    print("✅ EVENT RECEIVED:", event["type"])

    if event["type"] == "checkout.session.completed":

        session = event["data"]["object"]

        print("🔥 FULL SESSION:", session)

        metadata = session.get("metadata", {})
        print("🔥 METADATA:", metadata)

        lead_id = metadata.get("lead_id")

        if not lead_id:
            print("❌ NO LEAD ID → SKIPPING")
            return {"status": "ignored"}

        print("✅ LEAD ID:", lead_id)

        lead = db.query(Lead).filter(Lead.id == int(lead_id)).first()

        if not lead:
            print("❌ LEAD NOT FOUND")
            return {"status": "error"}

        lead.status = LeadStatus.PAID.value

        payment = Payment(
            lead_id=lead.id,
            stripe_payment_intent=session.get("payment_intent"),
            amount=session.get("amount_total"),
            status="PAID"
        )

        db.add(payment)
        db.commit()

        print("🎉 PAYMENT SUCCESS → DB UPDATED")

    return {"status": "success"}
 
       
# 🔹 Get Payment Status for a Lead (ADMIN + AGENT)
@router.get("/{lead_id}")
def get_payment_status(
    lead_id: int,
    db: Session = Depends(get_db),
    user=Depends(require_role([Role.ADMIN, Role.AGENT]))
):
    payment = (
        db.query(Payment)
        .filter(Payment.lead_id == lead_id)
        .order_by(Payment.created_at.desc())
        .first()
    )

    if not payment:
        raise HTTPException(status_code=404, detail="No payment found")

    return {
        "lead_id": lead_id,
        "status": payment.status,
        "amount": payment.amount,
        "payment_intent": payment.stripe_payment_intent
    }


# 🔹 Get All Payments (ADMIN only)
@router.get("/")
def list_payments(
    db: Session = Depends(get_db),
    user=Depends(require_role([Role.ADMIN]))
):
    payments = db.query(Payment).order_by(Payment.created_at.desc()).all()

    return [
        {
            "id": p.id,
            "lead_id": p.lead_id,
            "amount": p.amount,
            "status": p.status,
            "created_at": p.created_at,
            "stripe_payment_intent": p.stripe_payment_intent
        }
        for p in payments
    ]


 