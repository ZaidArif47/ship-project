from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import logging
from datetime import datetime

Base = declarative_base()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AuditLog(Base):
    __tablename__ = 'audit_logs'

    id = Column(Integer, primary_key=True, index=True)
    action = Column(String, index=True)
    user_id = Column(Integer, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

def log_action(action: str, user_id: int):
    """Log an action performed by a user."""
    logger.info(f"Action: {action}, User ID: {user_id}, Timestamp: {datetime.utcnow()}")
    # Here you would typically save the log to the database
    # For example:
    # db = SessionLocal()
    # db.add(AuditLog(action=action, user_id=user_id))
    # db.commit()
    # db.close()