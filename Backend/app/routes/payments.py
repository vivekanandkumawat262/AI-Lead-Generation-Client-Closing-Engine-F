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


# 🔹 DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔹 Create Payment Link (ADMIN only)
@router.post("/create/{lead_id}", response_model=PaymentLinkResponse)
def create_payment_link(
    lead_id: int,
    db: Session = Depends(get_db),
    user=Depends(require_role([Role.ADMIN]))
):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    if lead.status != LeadStatus.PROPOSAL_SENT.value:
        raise HTTPException(
            status_code=400,
            detail="Payment allowed only after proposal is sent"
        )

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="payment",
            line_items=[{
                "price_data": {
                    "currency": "inr",
                    "product_data": {
                        "name": f"Marketing Services for {lead.business_name}",
                    },
                    "unit_amount": 3000000,  # ₹30,000
                },
                "quantity": 1,
            }],
            success_url="http://localhost:3000/payment-success",
            cancel_url="http://localhost:3000/payment-cancel",
            metadata={"lead_id": str(lead.id)}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {
        "payment_url": session.url,
        "lead_status": lead.status
    }


# 🔹 Stripe Webhook (called by Stripe)
@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload,
            sig_header,
            os.getenv("STRIPE_WEBHOOK_SECRET")
        )
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid webhook")

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]

        lead_id = int(session["metadata"]["lead_id"])
        payment_intent = session["payment_intent"]
        amount_total = session["amount_total"]

        lead = db.query(Lead).filter(Lead.id == lead_id).first()
        if not lead:
            raise HTTPException(status_code=404, detail="Lead not found")

        # 🔥 Update lead status
        lead.status = LeadStatus.PAID.value

        # 🔥 Save payment record
        payment = Payment(
            lead_id=lead.id,
            stripe_payment_intent=payment_intent,
            amount=amount_total,
            status="PAID"
        )

        db.add(payment)
        db.commit()

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




# from ..dependencies.auth import get_current_user
# import stripe
# import os
# from fastapi import APIRouter, Depends, HTTPException, Request
# from sqlalchemy.orm import Session

# from ..database import SessionLocal
# from ..models import Lead, LeadStatus, Payment
# from ..schemas import PaymentLinkResponse
# from app.dependencies.roles import require_role
# from app.core.roles import Role



# stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# router = APIRouter(prefix="/payments", tags=["Payments"])

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# # 🔹 Create Payment Link
# @router.post("/create/{lead_id}", response_model=PaymentLinkResponse)
# def create_payment_link(lead_id: int, db: Session = Depends(get_db),
#     user=Depends(require_role([Role.ADMIN]))  ):
#     lead = db.query(Lead).filter(Lead.id == lead_id).first()
#     if not lead:
#         raise HTTPException(status_code=404, detail="Lead not found")

#     if lead.status != LeadStatus.PROPOSAL_SENT.value:
#         raise HTTPException(
#             status_code=400,
#             detail="Payment allowed only after proposal is sent"
#         )

#     session = stripe.checkout.Session.create(
#         payment_method_types=["card"],
#         mode="payment",
#         line_items=[
#             {
#                 "price_data": {
#                     "currency": "inr",
#                     "product_data": {
#                         "name": f"Marketing Services for {lead.business_name}",
#                     },
#                     "unit_amount": 3000000,  # ₹30,000
#                 },
#                 "quantity": 1,
#             }
#         ],
#         success_url="http://localhost:3000/success",
#         cancel_url="http://localhost:3000/cancel",
#         metadata={
#             "lead_id": str(lead.id)
#         }
#     )

#     return {
#         "payment_url": session.url,
#         "lead_status": lead.status
#     }


# # 🔹 Stripe Webhook
# @router.post("/webhook")
# async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
#     payload = await request.body()
#     sig_header = request.headers.get("stripe-signature")

#     try:
#         event = stripe.Webhook.construct_event(
#             payload,
#             sig_header,
#             os.getenv("STRIPE_WEBHOOK_SECRET")
#         )
#     except Exception:
#         raise HTTPException(status_code=400, detail="Invalid webhook")

#     if event["type"] == "checkout.session.completed":
#         session = event["data"]["object"]
#         lead_id = int(session["metadata"]["lead_id"])

#         lead = db.query(Lead).filter(Lead.id == lead_id).first()
#         if lead:
#             lead.status = LeadStatus.PAID.value

#             payment = Payment(
#                 lead_id=lead.id,
#                 stripe_payment_intent=session["payment_intent"],
#                 amount=session["amount_total"],
#                 status="PAID"
#             )
#             db.add(payment)
#             db.commit()

#     return {"status": "success"}
