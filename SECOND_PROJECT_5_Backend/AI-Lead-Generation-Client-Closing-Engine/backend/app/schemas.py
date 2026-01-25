# app/schemas.py
from pydantic import BaseModel, EmailStr

class SignupRequest(BaseModel):
      email: EmailStr
      password: str

class SignupResponse(BaseModel):
    message: str

class LoginRequest(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    role: str


class LeadCreate(BaseModel):
    business_name: str
    email: EmailStr
    industry: str
    city: str

class LeadResponse(BaseModel):
    id: int
    business_name: str
    email: str
    industry: str
    city: str
    status: str

    class Config:
        from_attributes: True


class AIEmailResponse(BaseModel):
    subject: str
    body: str


class OutreachResponse(BaseModel):
    message: str
    lead_status: str




class ReplyRequest(BaseModel):
    content: str


class ReplyResponse(BaseModel):
    intent: str
    lead_status: str


class ProposalResponse(BaseModel):
    id: int
    lead_id: int
    content: str
    lead_status: str

    class Config:
        from_attributes = True



class PaymentLinkResponse(BaseModel):
    payment_url: str
    lead_status: str


class LeadStatusUpdate(BaseModel):
    status: str
