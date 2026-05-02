from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, patients, doctors, ai
from .database import engine, Base, SessionLocal
from . import crud, models, security, schemas
from sqlalchemy.orm import Session
import os

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(patients.router)
app.include_router(doctors.router)
app.include_router(ai.router)

@app.on_event("startup")
def startup_event():
    # Drop all tables and recreate them to reset the database
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Create predefined users
        user_create = schemas.UserCreate(username="testuser1", email="test@example.com", password="testpatient", role="patient")
        crud.create_user(db, user_create)
        user_create = schemas.UserCreate(username="adminuser1", email="admin@example.com", password="admindoctor", role="admin")
        crud.create_user(db, user_create)
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Ship Project API!"}