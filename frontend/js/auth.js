const apiUrl = 'http://localhost:8000'; // Base URL for the API

// Function to handle user login (username + password)
async function login(username, password) {
    const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.detail || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.access_token); // Store the token in local storage
    localStorage.setItem('username', username); // Store username for role checking
}

// Function to handle user registration (username + email + password)
async function register(username, email, password) {
    const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.detail || 'Registration failed');
    }

    return await response.json();
}

// Attach form handlers when present on the page
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errEl = document.getElementById('error-message');
            try {
                await login(username, password);
                window.location.href = 'index.html';
            } catch (err) {
                if (errEl) errEl.textContent = err.message;
            }
        });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errEl = document.getElementById('error-message');
            try {
                await register(username, email, password);
                window.location.href = 'login.html';
            } catch (err) {
                if (errEl) errEl.textContent = err.message;
            }
        });
    }
});

// Function to check if the user is authenticated
function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}

// Function to logout the user
function logout() {
    localStorage.removeItem('token'); // Remove the token from local storage
}

// Function to get the token
function getToken() {
    return localStorage.getItem('token');
}