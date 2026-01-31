from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models import User
from ..schemas import LoginRequest, TokenResponse, SignupRequest, SignupResponse
from ..core.security import hash_password
from ..core.security import verify_password
from ..core.jwt import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register",response_model=SignupResponse)
def register_user(data: SignupRequest, db: Session = Depends(get_db)):
    # 1. Check existing user
    user = db.query(User).filter(User.email == data.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    #2. Hash password 
    hashed_password = hash_password(data.password)

    #3. Create user
    new_user = User(
        email=data.email,
        password_hash=hashed_password,
        role="AGENT"  # default role
    )

    db.add(new_user)
    db.commit()

    return {"message": "User registered successfully"}


@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "sub": user.email,
        "role": user.role
    })
    
    

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role
    }
