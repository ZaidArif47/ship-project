import os

class Config:
    """Base configuration class."""
    SECRET_KEY = os.getenv("SECRET_KEY", "your_default_secret_key")
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 1 day

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True

class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False

config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig
}

settings = DevelopmentConfig()