# backend/app/routers/__init__.py

from fastapi import APIRouter

router = APIRouter()

from . import auth, patients, doctors, ai

router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(patients.router, prefix="/patients", tags=["patients"])
router.include_router(doctors.router, prefix="/doctors", tags=["doctors"])
router.include_router(ai.router, prefix="/ai", tags=["ai"])

__all__ = ['auth', 'patients', 'doctors', 'ai']
router.include_router(doctors.router, prefix="/doctors", tags=["doctors"])
router.include_router(ai.router, prefix="/ai", tags=["ai"])