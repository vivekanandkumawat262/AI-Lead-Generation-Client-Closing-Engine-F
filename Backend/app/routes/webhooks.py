from fastapi import APIRouter, Request, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Lead
from app.services.email_reply import process_email_reply

router = APIRouter(prefix="/webhooks", tags=["Webhooks"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/email-reply")
async def email_reply_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.json()

    """
    Example payload (SendGrid / Mailgun style):
    {
      "to": "reply+lead_2@yourdomain.com",
      "text": "Yes, I'm interested"
    }
    """

    to_email = payload.get("to")
    content = payload.get("text")

    if not to_email or not content:
        raise HTTPException(status_code=400, detail="Invalid payload")

    # 🔍 Extract lead_id from email
    lead_id = extract_lead_id(to_email)

    if not lead_id:
        raise HTTPException(status_code=400, detail="Lead ID not found")

    # 🔥 Process reply using AI
    result = process_email_reply(db, lead_id, content)

    return {
        "message": "Reply processed",
        "lead_id": lead_id,
        "intent": result["intent"],
        "status": result["lead_status"]
    }


def extract_lead_id(email: str):
    """
    reply+lead_2@yourdomain.com → 2
    """
    try:
        if "lead_" in email:
            return int(email.split("lead_")[1].split("@")[0])
    except:
        return None
