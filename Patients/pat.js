
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


const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');
const email = urlParams.get('email');


console.log('Patient Name:', name);
console.log('Patient Email:', email);
// Display patient details in the profile section
if (name && email) {
    document.getElementById('welcome-patient-name').textContent = name;
    document.getElementById('profile-patient-name').textContent = name;
    document.getElementById('patient-email').textContent = email;
} else {
    document.getElementById('welcome-patient-name').textContent = "Guest";
    document.getElementById('profile-patient-name').textContent = "Guest";
    document.getElementById('patient-email').textContent = "Not logged in";
}



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

document.getElementById('cancel').addEventListener('click', function(event){
    event.preventDefault();
    alert("Are you sure you want to cancel ?");
})