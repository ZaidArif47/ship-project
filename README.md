# Ship Project

## Overview
The Ship Project is a FastAPI application designed to manage patient and doctor interactions, including AI-generated reports. It consists of a backend service that handles data processing and a frontend interface for user interactions.

## Project Structure
```
ship-project/
├── backend/
│   ├── app/                     # Main application code
│   ├── ai_module/               # AI-related functionalities
│   ├── storage/                 # Storage for encrypted reports
│   └── requirements.txt         # Backend dependencies
├── frontend/                    # Frontend application files
├── docs/                        # Documentation files
├── .env.example                 # Environment variables template
├── README.md                    # Project overview & setup
└── docker-compose.yml           # (Optional) Container setup
```

## Backend
The backend is built using FastAPI and includes the following components:
- **app/**: Contains the main application logic, including routes, models, and database interactions.
- **ai_module/**: Handles AI model loading, feature extraction, and inference.
- **storage/**: Directory for storing encrypted reports.
- **requirements.txt**: Lists all necessary Python packages for the backend.

## Frontend
The frontend is a web application that provides user interfaces for:
- Patient dashboard
- Doctor dashboard
- Login and authentication
- Viewing AI-generated reports

## Documentation
The `docs/` directory contains:
- **architecture.md**: An explanation of the application architecture.
- **security.md**: Notes on the security design and considerations.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd ship-project
   ```

2. Set up the backend:
   - Create a virtual environment and activate it.
   - Install dependencies:
     ```
     pip install -r backend/requirements.txt
     ```

3. Configure environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

4. Run the backend:
   ```
   uvicorn backend.app.main:app --reload
   ```

5. Open the frontend files in a web browser to access the application.

## Docker Setup (Optional)
To run the application using Docker, use the provided `docker-compose.yml` file. Make sure Docker is installed and running, then execute:
```
docker-compose up
```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.