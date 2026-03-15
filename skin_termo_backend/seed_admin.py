from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
import auth_utils
import os
from dotenv import load_dotenv

load_dotenv()

def seed_admin():
    db = SessionLocal()
    try:
        # Check if admin already exists
        admin_email = "admin@skintermo.ai"
        admin = db.query(models.User).filter(models.User.email == admin_email).first()
        
        if not admin:
            print(f"Creating admin user: {admin_email}")
            hashed_password = auth_utils.get_password_hash("admin123") # Default secure password
            new_admin = models.User(
                name="System Administrator",
                email=admin_email,
                password=hashed_password,
                role="admin"
            )
            db.add(new_admin)
            db.commit()
            print("Admin user created successfully!")
        else:
            print("Admin user already exists.")
            
    except Exception as e:
        print(f"Error seeding admin: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    # Ensure tables are created
    models.Base.metadata.create_all(bind=engine)
    seed_admin()
