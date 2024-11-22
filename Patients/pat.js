
//burger menu
const burgerBtn = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');

burgerBtn.addEventListener('click', (event) => {
    mobileMenu.classList.toggle('visible');
    event.stopPropagation();
});

document.addEventListener('click', (event) => {
    if (!burgerBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.remove('visible'); 
    }
});


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

document.getElementById('reschedule').addEventListener('click', function(event){
    event.preventDefault()
    alert("Do you want to reschedule ?");
    window.location.href = "../Appointments page/app.html";
});

