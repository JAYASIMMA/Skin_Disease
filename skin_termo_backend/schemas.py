from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    is_profile_complete: bool
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    name: str
    is_profile_complete: bool

class TokenData(BaseModel):
    email: Optional[str] = None

class AnalysisRequest(BaseModel):
    image_base64: str

class ChatRequest(BaseModel):
    messages: List[dict]

# --- DOCTOR ONBOARDING SCHEMAS ---

class DoctorProfileBase(BaseModel):
    full_name: str
    dob: str
    gender: str
    profile_photo: Optional[str] = None
    phone_number: str
    languages_spoken: Optional[List[str]] = []
    city_location: str
    
    medical_degree: str
    specialization: str
    years_experience: int
    sub_specializations: Optional[List[str]] = []
    medical_college: str
    certifications: Optional[str] = None
    bio: Optional[str] = None
    
    license_number: str
    license_document: Optional[str] = None
    id_proof: Optional[str] = None
    affiliation_name: str
    affiliation_document: Optional[str] = None
    
    consultation_modes: List[str]
    consultation_fees: dict
    availability_schedule: dict
    max_patients_per_day: Optional[int] = None
    sla_response_time: Optional[str] = None
    clinic_address: Optional[str] = None
    
    bank_account_number: str
    ifsc_code: str
    account_holder_name: str
    upi_id: Optional[str] = None
    pan_number: str
    gst_number: Optional[str] = None

class DoctorProfileCreate(DoctorProfileBase):
    pass

class DoctorProfileResponse(DoctorProfileBase):
    id: int
    user_id: int
    approval_status: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    
    class Config:
        from_attributes = True

class DoctorLocationUpdate(BaseModel):
    latitude: float
    longitude: float

class UserResponseExtended(UserResponse):
    profile: Optional[DoctorProfileResponse] = None

# --- ACCOUNT & CHAT SCHEMAS ---

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None

class ChatMessageBase(BaseModel):
    role: str
    content: str
    timestamp: str

class ChatMessageCreate(ChatMessageBase):
    pass

class ChatMessageResponse(ChatMessageBase):
    id: int
    class Config:
        from_attributes = True

class ChatSessionBase(BaseModel):
    title: str

class ChatSessionCreate(ChatSessionBase):
    pass

class ChatSessionResponse(ChatSessionBase):
    id: int
    user_id: int
    created_at: str
    class Config:
        from_attributes = True

class ChatSessionDetailResponse(ChatSessionResponse):
    messages: List[ChatMessageResponse] = []

class AnalysisHistoryBase(BaseModel):
    disease_name: str
    confidence: str
    severity: str
    description: str
    symptoms: List[str]
    recommendations: List[str]
    seek_medical_attention: bool
    timestamp: str

class AnalysisHistoryResponse(AnalysisHistoryBase):
    id: int
    user_id: int
    image_url: str
    class Config:
        from_attributes = True
