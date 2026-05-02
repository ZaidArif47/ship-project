# Architecture Overview of Ship Project

## Introduction
The Ship Project is a FastAPI application designed to manage patient and doctor interactions, including AI-generated reports. This document outlines the architecture of the application, detailing its components and their interactions.

## Architecture Components

### 1. Backend
The backend is built using FastAPI and is responsible for handling business logic, data management, and API endpoints.

- **App Module**: Contains the main application logic.
  - `main.py`: Entry point for the FastAPI application, where the app instance is created and routes are defined.
  - `config.py`: Manages environment variables and security configurations.
  - `database.py`: Handles database connections and session management using SQLAlchemy.
  - `models.py`: Defines the SQLAlchemy models representing the database schema.
  - `schemas.py`: Contains Pydantic schemas for data validation and serialization.
  - `auth.py`: Manages JWT authentication and refresh token logic.
  - `security.py`: Implements encryption, hashing, and role-based access control (RBAC).
  - `crud.py`: Contains functions for database operations (Create, Read, Update, Delete).
  - `audit.py`: Handles access logging and auditing functionalities.

- **Routers**: Organized endpoints for different functionalities.
  - `auth.py`: Defines login and registration APIs.
  - `patients.py`: APIs for patient-related operations, such as uploading and viewing reports.
  - `doctors.py`: Provides read-only access APIs for doctor-related data.
  - `ai.py`: Endpoints for AI report generation.

- **AI Module**: Responsible for machine learning functionalities.
  - `model_loader.py`: Loads trained machine learning models.
  - `feature_extractor.py`: Handles data preprocessing for AI inference.
  - `inference.py`: Contains the logic for local AI inference.

### 2. Frontend
The frontend is a web application that interacts with the backend APIs to provide a user interface for patients and doctors.

- **HTML Files**: Serve as the structure for different pages.
  - `index.html`: Landing page of the application.
  - `login.html`: User interface for login.
  - `patient_dashboard.html`: Dashboard for patients to view their information.
  - `doctor_dashboard.html`: Dashboard for doctors to access patient data.
  - `ai_report.html`: Displays AI-generated reports.

- **CSS**: Contains styles for the frontend application.
  - `styles.css`: Common styles used across the application.

- **JavaScript**: Manages client-side logic and API communication.
  - `auth.js`: Handles authentication and token management.
  - `patient.js`: Contains patient-side logic.
  - `doctor.js`: Contains doctor-side logic.
  - `api.js`: Manages API communication between the frontend and backend.

### 3. Storage
The application includes a storage component for managing encrypted reports.

- **Encrypted Reports**: A directory for storing encrypted report files securely.

### 4. Documentation
The project includes documentation to assist developers and users.

- **Architecture Document**: This document provides an overview of the architecture.
- **Security Document**: Contains notes on the security design of the application.

## Conclusion
The Ship Project is designed with a modular architecture that separates concerns between the backend and frontend, ensuring maintainability and scalability. Each component is responsible for specific functionalities, allowing for easier updates and enhancements in the future.