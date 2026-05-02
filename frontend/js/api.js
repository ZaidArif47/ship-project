const API_BASE_URL = "http://localhost:8000/api"; // Base URL for the API

// Function to handle API requests
async function apiRequest(endpoint, method = "GET", data = null) {
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
}

// Example function to login
async function login(username, password) {
    return await apiRequest("/auth/login", "POST", { username, password });
}

// Example function to get patient reports
async function getPatientReports(patientId) {
    return await apiRequest(`/patients/${patientId}/reports`);
}

// Example function to get doctor data
async function getDoctorData(doctorId) {
    return await apiRequest(`/doctors/${doctorId}`);
}

// Example function to generate AI report
async function generateAIReport(data) {
    return await apiRequest("/ai/generate", "POST", data);
}