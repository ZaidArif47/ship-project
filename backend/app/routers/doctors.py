from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, models, schemas
from ..database import get_db

router = APIRouter()

@router.get("/doctors/", response_model=List[schemas.Doctor])
def read_doctors(db: Session = Depends(get_db)):
    doctors = crud.get_doctors(db)
    return doctors

@router.post("/doctors/", response_model=schemas.Doctor)
def create_doctor(doctor: schemas.DoctorCreate, db: Session = Depends(get_db)):
    return crud.create_doctor(db, doctor)