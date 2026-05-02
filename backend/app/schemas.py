from pydantic import BaseModel
from typing import List, Optional

# Pydantic schemas for data validation and serialization

class UserBase(BaseModel):
    username: str
    email: str
    role: str = "patient"

class UserCreate(UserBase):
    password: str
    
class UserLogin(BaseModel):
    username: str
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class PatientBase(BaseModel):
    name: str
    age: int
    gender: str

class PatientCreate(PatientBase):
    pass

class PatientUpdate(PatientBase):
    pass

class Patient(PatientBase):
    id: int

    class Config:
        orm_mode = True

class DoctorBase(BaseModel):
    name: str
    specialty: str

class DoctorCreate(DoctorBase):
    pass

class Doctor(DoctorBase):
    id: int

    class Config:
        orm_mode = True

class ReportBase(BaseModel):
    patient_id: int
    doctor_id: int
    report_data: str

class ReportCreate(ReportBase):
    pass

class Report(ReportBase):
    id: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None