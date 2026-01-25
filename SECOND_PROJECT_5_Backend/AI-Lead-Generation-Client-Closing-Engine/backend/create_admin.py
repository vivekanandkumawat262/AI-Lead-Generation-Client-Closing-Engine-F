from app.database import SessionLocal
from app.models import User
from app.core.security import hash_password

db = SessionLocal()

EMAIL = "admin@crm.com"
PASSWORD = "admin123"

existing = db.query(User).filter(User.email == EMAIL).first()

if existing:
    print("✅ Admin already exists.")
    print("   Email:", existing.email)
    print("   Role:", existing.role)
else:
    admin = User(
        email=EMAIL,
        password_hash=hash_password(PASSWORD),
        role="ADMIN"
    )
    db.add(admin)
    db.commit()
    print("🎉 Admin user created successfully!")
    print("   Email:", EMAIL)
    print("   Password:", PASSWORD)
