from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import requests
import os
import json
from dotenv import load_dotenv

import models, schemas, auth_utils, database
from database import engine, get_db
from fastapi.staticfiles import StaticFiles
import uuid
import base64

load_dotenv()

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="SkinTermo API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure upload directory exists
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

ZHIPU_API_KEY = os.getenv("ZHIPU_API_KEY")
ZHIPU_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions"

@app.get("/")
def read_root():
    return {"message": "SkinTermo Backend is running"}

# --- AUTH ENDPOINTS ---

@app.post("/auth/register", response_model=schemas.UserResponse)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth_utils.get_password_hash(user.password)
    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        role=user.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/auth/login", response_model=schemas.Token)
def login_user(user_credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    if not user or not auth_utils.verify_password(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = auth_utils.create_access_token(data={"sub": user.email, "role": user.role})
    
    is_profile_complete = True
    if user.role == "doctor":
        profile = db.query(models.DoctorProfile).filter(models.DoctorProfile.user_id == user.id).first()
        # Consider complete if there's a specialized degree or similar marker
        is_profile_complete = profile is not None and profile.medical_degree is not None

    return {
        "access_token": access_token, 
        "token_type": "bearer", 
        "role": user.role,
        "name": user.name,
        "is_profile_complete": is_profile_complete
    }

# --- SKIN ANALYSIS ---

@app.post("/analysis/scan")
def analyze_skin(request: schemas.AnalysisRequest, current_user: models.User = Depends(auth_utils.get_current_user), db: Session = Depends(get_db)):
    prompt = """You are a highly experienced Dermatologist. Analyze this clinical skin image with precision.
    Focus on: lesion type (macule, papule, etc.), color, distribution, and border characteristics.
    
    Provide a professional assessment in the following JSON format ONLY:
    {
      "disease_name": "Primary suspected condition",
      "confidence": "High/Medium/Low",
      "severity": "Mild/Moderate/Severe",
      "description": "Professional clinical description including differential diagnoses if relevant. End with: 'DISCLAIMER: This is an AI-assisted analysis for informational purposes only. Consult a human specialist.'",
      "symptoms": ["list", "clinical", "signs"],
      "recommendations": ["immediate", "steps", "or", "prevention"],
      "seek_medical_attention": true/false
    }"""

    payload = {
        "model": "glm-4.6v-flash",
        "temperature": 0.2,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{request.image_base64}"}
                    }
                ]
            }
        ]
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {ZHIPU_API_KEY}"
    }

    try:
        # Save image to disk for history
        filename = f"{uuid.uuid4()}.jpg"
        filepath = os.path.join(UPLOAD_DIR, filename)
        with open(filepath, "wb") as f:
            f.write(base64.b64decode(request.image_base64))
        
        image_url = f"/uploads/{filename}"

        print(f"Sending enhanced analysis request to ZhipuAI...")
        response = requests.post(ZHIPU_URL, json=payload, headers=headers)
        response.raise_for_status()
        raw_content = response.json()["choices"][0]["message"]["content"]
        
        # Parse JSON from response
        import re
        json_match = re.search(r'\{[\s\S]*\}', raw_content)
        if json_match:
            parsed_json = json.loads(json_match.group(0))
            
            # Save to history table
            from datetime import datetime
            history = models.AnalysisHistory(
                user_id=current_user.id,
                image_url=image_url,
                disease_name=parsed_json.get("disease_name"),
                confidence=parsed_json.get("confidence"),
                severity=parsed_json.get("severity"),
                description=parsed_json.get("description"),
                symptoms=parsed_json.get("symptoms"),
                recommendations=parsed_json.get("recommendations"),
                seek_medical_attention=parsed_json.get("seek_medical_attention"),
                timestamp=datetime.utcnow().isoformat()
            )
            db.add(history)
            db.commit()
            
            # Return result with the server-side image URL
            parsed_json["image_url"] = image_url
            return parsed_json
        
        return {
            "disease_name": "Analysis Failed",
            "description": "Could not parse AI response",
            "confidence": "N/A",
            "severity": "N/A",
            "symptoms": [],
            "recommendations": ["Try again later"],
            "seek_medical_attention": False
        }
    except requests.exceptions.HTTPError as e:
        error_detail = e.response.text if e.response else str(e)
        print(f"ZhipuAI HTTP Error: {error_detail}")
        raise HTTPException(status_code=e.response.status_code if e.response else 500, detail=f"ZhipuAI Error: {error_detail}")
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# --- PUBLIC DOCTOR ENDPOINTS ---

@app.get("/doctors", response_model=List[schemas.UserResponseExtended])
def get_verified_doctors(db: Session = Depends(get_db)):
    """Fetch verified doctors for the patient portal list."""
    # Returns only doctors who have completed their profile or are marked as doctor role
    # In a production app, we'd also filter by approval_status == 'Verified'
    return db.query(models.User).filter(models.User.role == "doctor").all()

# --- ADMIN ENDPOINTS ---

@app.get("/admin/doctors", response_model=List[schemas.UserResponseExtended])
def get_doctors(db: Session = Depends(get_db)):
    return db.query(models.User).filter(models.User.role == "doctor").all()

@app.get("/admin/users", response_model=List[schemas.UserResponseExtended])
def get_all_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

@app.patch("/admin/doctor/{doctor_id}/location")
def update_doctor_location(doctor_id: int, coord: schemas.DoctorLocationUpdate, db: Session = Depends(get_db)):
    profile = db.query(models.DoctorProfile).filter(models.DoctorProfile.user_id == doctor_id).first()
    if not profile:
        # Create empty profile if not exists to store location
        profile = models.DoctorProfile(user_id=doctor_id)
        db.add(profile)
    
    profile.latitude = coord.latitude
    profile.longitude = coord.longitude
    db.commit()
    return {"message": "Location updated successfully"}

@app.delete("/admin/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}

@app.get("/auth/me", response_model=schemas.UserResponse)
def get_me(current_user: models.User = Depends(auth_utils.get_current_user)):
    return current_user

@app.patch("/auth/me", response_model=schemas.UserResponse)
def update_me(update_data: schemas.UserUpdate, current_user: models.User = Depends(auth_utils.get_current_user), db: Session = Depends(get_db)):
    if update_data.name:
        current_user.name = update_data.name
    if update_data.email:
        # Check if email is already taken
        existing = db.query(models.User).filter(models.User.email == update_data.email).first()
        if existing and existing.id != current_user.id:
            raise HTTPException(status_code=400, detail="Email already in use")
        current_user.email = update_data.email
    db.commit()
    db.refresh(current_user)
    return current_user

# --- CHAT HISTORY ENDPOINTS ---

@app.post("/chat/sessions", response_model=schemas.ChatSessionResponse)
def create_chat_session(session: schemas.ChatSessionCreate, current_user: models.User = Depends(auth_utils.get_current_user), db: Session = Depends(get_db)):
    from datetime import datetime
    new_session = models.ChatSession(
        user_id=current_user.id, # Foreign Key: linking to logged in User's primary key
        title=session.title,
        created_at=datetime.utcnow().isoformat()
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session

@app.get("/chat/sessions", response_model=List[schemas.ChatSessionResponse])
def get_chat_sessions(current_user: models.User = Depends(auth_utils.get_current_user), db: Session = Depends(get_db)):
    # Filtering sessions by Foreign Key (user_id) to ensure private history
    return db.query(models.ChatSession).filter(models.ChatSession.user_id == current_user.id).order_by(models.ChatSession.created_at.desc()).all()

@app.get("/chat/sessions/{session_id}", response_model=schemas.ChatSessionDetailResponse)
def get_chat_session_detail(session_id: int, current_user: models.User = Depends(auth_utils.get_current_user), db: Session = Depends(get_db)):
    session = db.query(models.ChatSession).filter(models.ChatSession.id == session_id, models.ChatSession.user_id == current_user.id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session

@app.post("/chat/sessions/{session_id}/messages", response_model=schemas.ChatMessageResponse)
def add_chat_message(session_id: int, message: schemas.ChatMessageCreate, current_user: models.User = Depends(auth_utils.get_current_user), db: Session = Depends(get_db)):
    session = db.query(models.ChatSession).filter(models.ChatSession.id == session_id, models.ChatSession.user_id == current_user.id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    new_message = models.ChatMessage(
        session_id=session_id,
        role=message.role,
        content=message.content,
        timestamp=message.timestamp
    )
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message

@app.get("/analysis/history", response_model=List[schemas.AnalysisHistoryResponse])
def get_analysis_history(current_user: models.User = Depends(auth_utils.get_current_user), db: Session = Depends(get_db)):
    return db.query(models.AnalysisHistory).filter(models.AnalysisHistory.user_id == current_user.id).order_by(models.AnalysisHistory.timestamp.desc()).all()

# --- AI CHAT ENDPOINTS ---

@app.post("/chat/message")
def chat_with_ai(request: schemas.ChatRequest):
    print(f"Processing clinical chat request with {len(request.messages)} messages")
    
    # Specialized Healthcare System Prompt
    system_prompt = (
        "You are 'SkinTermo AI', a specialized Cardiology, Dermatology and Skincare AI Assistant. "
        "Your goal is to analyze skin conditions described by the user and provide detailed, clinical, yet empathetic advice. "
        "Structure your response logically: "
        "1. Analysis of the condition based on symptoms. "
        "2. Recommended medical treatments (OTC or Prescription-grade suggestions). "
        "3. Home remedies and preventive skincare routines. "
        "IMPORTANT: Always include a medical disclaimer advising to consult a physical doctor for formal diagnosis."
    )

    # Filter messages to only include 'role' and 'content' as required by Zhipu API
    filtered_messages = [
        {"role": m["role"], "content": m["content"]} 
        for m in request.messages
    ]

    payload = {
        "model": "glm-4.7-flash", # Using the high-speed Flash model for snappy chat
        "messages": [
            {"role": "system", "content": system_prompt},
            *filtered_messages
        ],
        "temperature": 0.3
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {ZHIPU_API_KEY}"
    }

    try:
        response = requests.post(ZHIPU_URL, json=payload, headers=headers)
        response.raise_for_status()
        return {"content": response.json()["choices"][0]["message"]["content"]}
    except Exception as e:
        print(f"Chat Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# --- DOCTOR PORTAL ENDPOINTS ---

@app.post("/doctor/onboarding", response_model=schemas.DoctorProfileResponse)
def onboard_doctor(profile: schemas.DoctorProfileCreate, db: Session = Depends(get_db)):
    # In a real app, we'd get the user_id from the JWT token
    # For now, we'll try to find a user with the matching name/email or require an ID
    # Simulating finding the user:
    user = db.query(models.User).filter(models.User.name == profile.full_name).first()
    if not user:
        raise HTTPException(status_code=404, detail="User account not found. Please register first.")
    
    existing_profile = db.query(models.DoctorProfile).filter(models.DoctorProfile.user_id == user.id).first()
    
    profile_data = profile.dict()
    if existing_profile:
        for key, value in profile_data.items():
            setattr(existing_profile, key, value)
        db.commit()
        db.refresh(existing_profile)
        return existing_profile
    
    new_profile = models.DoctorProfile(**profile_data, user_id=user.id)
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile

@app.get("/doctor/me/profile", response_model=schemas.DoctorProfileResponse)
def get_my_doctor_profile(current_user: models.User = Depends(auth_utils.get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "doctor":
        raise HTTPException(status_code=403, detail="Not authorized")
    profile = db.query(models.DoctorProfile).filter(models.DoctorProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@app.get("/doctor/profile/{user_id}", response_model=schemas.DoctorProfileResponse)
def get_doctor_profile(user_id: int, db: Session = Depends(get_db)):
    profile = db.query(models.DoctorProfile).filter(models.DoctorProfile.user_id == user_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile
