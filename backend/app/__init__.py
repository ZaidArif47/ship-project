# backend/app/__init__.py

from fastapi import FastAPI

app = FastAPI()

# Import routers
from .routers import auth, patients, doctors, ai

# Include routers
app.include_router(auth.router)
app.include_router(patients.router)
app.include_router(doctors.router)
app.include_router(ai.router)