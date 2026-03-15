from sqlalchemy import Column, Integer, String, Boolean, Text, ForeignKey, JSON, Float
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False) # 'doctor' or 'patient'
    
    profile = relationship("DoctorProfile", back_populates="user", uselist=False)

class DoctorProfile(Base):
    __tablename__ = "doctor_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    
    # 1. Personal Info
    full_name = Column(String(255))
    dob = Column(String(50))
    gender = Column(String(20))
    profile_photo = Column(Text) # Base64 or URL
    phone_number = Column(String(20))
    languages_spoken = Column(JSON) # List of strings
    city_location = Column(String(255))
    
    # 2. Professional Credentials
    medical_degree = Column(String(255))
    specialization = Column(String(255))
    years_experience = Column(Integer)
    sub_specializations = Column(JSON) # List of strings
    medical_college = Column(String(255))
    certifications = Column(Text)
    bio = Column(Text)
    
    # 3. Verification
    license_number = Column(String(255))
    license_document = Column(Text) # Base64 or URL
    id_proof = Column(Text) # Base64 or URL
    affiliation_name = Column(String(255))
    affiliation_document = Column(Text) # Base64 or URL
    approval_status = Column(String(50), default="Pending") # Pending/Verified/Rejected
    
    # 4. Consultation Settings
    consultation_modes = Column(JSON) # List of strings
    consultation_fees = Column(JSON) # Dict: mode -> fee
    availability_schedule = Column(JSON) # Nested dict for slots
    max_patients_per_day = Column(Integer)
    sla_response_time = Column(String(100))
    clinic_address = Column(Text)
    
    # 5. Banking & Payouts
    bank_account_number = Column(String(100))
    ifsc_code = Column(String(50))
    account_holder_name = Column(String(255))
    upi_id = Column(String(100))
    pan_number = Column(String(20))
    gst_number = Column(String(20))
    
    # Admin Location Management
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    user = relationship("User", back_populates="profile")

class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id")) # Foreign Key: references User primary key
    title = Column(String(255), default="New Chat")
    created_at = Column(String(50)) # ISO format string for simplicity

    user = relationship("User")
    messages = relationship("ChatMessage", back_populates="session", cascade="all, delete-orphan")

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("chat_sessions.id"))
    role = Column(String(50)) # 'user' or 'assistant'
    content = Column(Text)
    timestamp = Column(String(50))

    session = relationship("ChatSession", back_populates="messages")

class AnalysisHistory(Base):
    __tablename__ = "analysis_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    image_url = Column(String(500)) # Path to the saved image
    disease_name = Column(String(255))
    confidence = Column(String(50))
    severity = Column(String(50))
    description = Column(Text)
    symptoms = Column(JSON) # List of strings
    recommendations = Column(JSON) # List of strings
    seek_medical_attention = Column(Boolean)
    timestamp = Column(String(50))

    user = relationship("User")
