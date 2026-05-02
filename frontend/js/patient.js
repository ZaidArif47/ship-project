// This file contains patient-side logic for the frontend.

document.addEventListener("DOMContentLoaded", function() {
    const patientForm = document.getElementById("patient-form");
    const patientReportContainer = document.getElementById("patient-reports");

    // Function to handle form submission for uploading patient reports
    patientForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const formData = new FormData(patientForm);
        
        try {
            const response = await fetch("/api/patients/upload", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                alert("Report uploaded successfully!");
                loadPatientReports();
            } else {
                alert("Error uploading report: " + result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while uploading the report.");
        }
    });

    // Function to load patient reports
    async function loadPatientReports() {
        try {
            const response = await fetch("/api/patients/reports");
            const reports = await response.json();
            patientReportContainer.innerHTML = "";
            reports.forEach(report => {
                const reportElement = document.createElement("div");
                reportElement.classList.add("report");
                reportElement.innerHTML = `
                    <h3>${report.title}</h3>
                    <p>${report.date}</p>
                    <a href="${report.link}" target="_blank">View Report</a>
                `;
                patientReportContainer.appendChild(reportElement);
            });
        } catch (error) {
            console.error("Error loading reports:", error);
        }
    }

    // Initial load of patient reports
    loadPatientReports();
});