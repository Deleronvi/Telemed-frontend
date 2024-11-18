let signinBtn = document.getElementById("signinBtn")
let signupBtn = document.getElementById("signupBtn")
let nameField = document.getElementById("nameField")
let title = document.getElementById("title")
let inputField = document.getElementById("input-field")

signinBtn.onclick = function(){
    console.log("Sign In button clicked");
    nameField.style.maxHeight = "0";
    title.innerHTML = "sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
}
signupBtn.onclick = function(){
    console.log("Sign Up button clicked");
    nameField.style.maxHeight = "60px";
    title.innerHTML = "sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
}

// Form submission and validation
document.getElementById('registrationForm').onsubmit = function (event) {
    event.preventDefault(); // Prevent form submission for validation

    // Form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    
    // Validation checks
    if (!termsCheckbox.checked) {
        alert('You must agree to the Terms and Conditions.');
        return;
    }
    if (passwordField.value.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }
    if (passwordField.value !== confirmPasswordField.value) {
        alert('Passwords do not match.');
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
    }

    // Save data to localStorage if validation passes
    localStorage.setItem('patientName', name);
    localStorage.setItem('patientEmail', email);

    // Redirect to patient dashboard (patients.html)
    window.location.href = '../Patients/patients.html';
};
