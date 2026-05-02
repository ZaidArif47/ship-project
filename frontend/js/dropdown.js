document.addEventListener('DOMContentLoaded', () => {
    const settingsBtn = document.querySelector('.settings-btn');
    const dropdown = document.querySelector('.settings-dropdown');

    if (settingsBtn && dropdown) {
        settingsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking anywhere else
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    // Optional: Logout simulation (replace with real auth later)
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
            localStorage.removeItem('username');
            window.location.href = 'login.html';
        });
    }
});