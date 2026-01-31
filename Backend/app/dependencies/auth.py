from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
import os
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import User

security = HTTPBearer()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        identity = payload.get("sub")
        if not identity:
            raise HTTPException(status_code=401, detail="Invalid token payload")

        # 🔥 SUPPORT BOTH EMAIL & ID TOKENS
        if "@" in identity:
            user = db.query(User).filter(User.email == identity).first()
        else:
            user = db.query(User).filter(User.id == int(identity)).first()

        if not user:
            raise HTTPException(status_code=401, detail="User not found")

        return user

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )


# from fastapi import Depends, HTTPException, status
# from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
# from jose import jwt, JWTError
# import os
# from sqlalchemy.orm import Session

# from app.database import SessionLocal
# from app.models import User

# security = HTTPBearer()

# SECRET_KEY = os.getenv("JWT_SECRET_KEY")
# ALGORITHM = os.getenv("JWT_ALGORITHM")


# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# def get_current_user(
#     credentials: HTTPAuthorizationCredentials = Depends(security),
#     db: Session = Depends(get_db)
# ):
#     token = credentials.credentials
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

#         user_id = payload.get("sub")
#         if not user_id:
#             raise HTTPException(status_code=401, detail="Invalid token payload")

#         user = db.query(User).filter(User.id == int(user_id)).first()
#         if not user:
#             raise HTTPException(status_code=401, detail="User not found")

#         return user   # ✅ RETURN REAL USER OBJECT

#     except JWTError:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid or expired token"
#         )


# from fastapi import Depends, HTTPException, status
# from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
# from jose import jwt, JWTError
# import os

# security = HTTPBearer()

# SECRET_KEY = os.getenv("JWT_SECRET_KEY")
# ALGORITHM = os.getenv("JWT_ALGORITHM")

# def get_current_user(
#     credentials: HTTPAuthorizationCredentials = Depends(security)
# ):
#     token = credentials.credentials
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         return payload
#     except JWTError:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid or expired token"
#         )
