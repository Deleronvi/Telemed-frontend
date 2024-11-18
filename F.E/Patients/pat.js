// Retrieve data from localStorage
const name = localStorage.getItem('patientName');
const email = localStorage.getItem('patientEmail');

// Display patient details in the profile section
if (name && email) {
    document.getElementById('patient-name').textContent = name;
    document.getElementById('patient-email').textContent = email;
} else {
    document.getElementById('patient-name').textContent = "Guest";
    document.getElementById('patient-email').textContent = "Not logged in";
}

// Add functionality for the logout button
document.getElementById('logout-btn').addEventListener('click', function() {
    // Clear localStorage on logout
    localStorage.removeItem('patientName');
    localStorage.removeItem('patientEmail');
    // Redirect to login page
    window.location.href = '../login page/login.html'; 
});
