let loginBtn = document.getElementById("loginBtn")
let signupBtn = document.getElementById("signupBtn")
let nameField = document.getElementById("nameField")
let title = document.getElementById("title")
let inputField = document.getElementById("input-field")
let sexField = document.getElementById("sexField")
let dateField = document.getElementById("dateField")
 let contField = document.getElementById("contField")

loginBtn.onclick = function(){
    console.log("Log In button clicked");
    nameField.style.height= "0";
    dateField.style.height= "0";
    sexField.style.height= "0";
    contField.style.height= "0";
    title.innerHTML = "Log In";
    signupBtn.classList.add("disable");
    loginBtn.classList.remove("disable");
}
signupBtn.onclick = function(){
    console.log("Sign Up button clicked");
    nameField.style.height = "60px";
    dateField.style.height = "60px";
    sexField.style.height = "60px";
    contField.style.height = "60px";
    title.innerHTML = "sign Up";
    signupBtn.classList.remove("disable");
    loginBtn.classList.add("disable");
}

// Form submission and validation
document.getElementById('registrationForm').onsubmit = async function (event) {
    event.preventDefault(); 

    // Form data
    const fullName = document.getElementById('full_name').value;
    const [firstName, lastName] = fullName.split(' ');
    const email = document.getElementById('email').value;
    const passwordField = document.getElementById('password').value;
    console.log("Password being sent:", passwordField);

    const confirmPasswordField = document.getElementById('confirmPassword').value;
    const termsCheckbox = document.getElementById('terms');
    const phone = document.getElementById('phone').value;
    const dateOfBirth = document.getElementById('date_of_birth').value;
    const gender = document.getElementById('sex').value;

    // Validation checks
    if (!termsCheckbox.checked) {
        alert('You must agree to the Terms and Conditions.');
        return;
    }
    if (passwordField.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }
    if (passwordField !== confirmPasswordField) {
        alert('Passwords do not match.');
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
    }

    // Save data to localStorage if validation passes
    localStorage.setItem('patientName', full_name);
    localStorage.setItem('patientEmail', email);

    // Send data to the backend via a POST request
    try {
        const response = await fetch('http://localhost:3600/patients/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: passwordField,
                phone: phone,
                date_of_birth: dateOfBirth,
                gender: gender,
            }),
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Patient registered successfully', result);
            // Redirect to the patient's profile or dashboard page
            window.location.href = '../Patients/patients.html';
        } else {
            alert(result.error || 'Failed to register patient');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Error submitting form');
    }
    
};

