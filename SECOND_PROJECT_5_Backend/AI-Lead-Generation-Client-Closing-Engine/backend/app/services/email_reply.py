from sqlalchemy.orm import Session
from app.models import Lead, LeadStatus
from app.ai.intent_classifier import classify_intent


def process_email_reply(db: Session, lead_id: int, content: str):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()

    if not lead:
        raise ValueError("Lead not found")

    # 🧠 AI intent detection
    intent = classify_intent(content)

    # 🔄 Update lead status
    lead.status = intent
    db.commit()

    return {
        "intent": intent,
        "lead_status": lead.status
    }
