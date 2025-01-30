let loginBtn = document.getElementById("loginBtn")
let signupBtn = document.getElementById("signupBtn")
let nameField = document.getElementById("nameField")
let title = document.getElementById("title")
let inputField = document.getElementById("input-field")
let sexField = document.getElementById("sexField")
let dateField = document.getElementById("dateField")
 let contField = document.getElementById("contField")
 let submitBtn = document.getElementById("login-btn");

loginBtn.onclick = function(){
    console.log("Log In button clicked");
    
        nameField.style.display = 'none';
            dateField.style.display = 'none';
            sexField.style.display = 'none';
            contField.style.display = 'none';

            nameField.removeAttribute('required');
            dateField.removeAttribute('required');
            sexField.removeAttribute('required');
            contField.removeAttribute('required');
 submitBtn.innerText = "Log In";
    title.innerHTML = "Log In";
    signupBtn.classList.add("disable");
    loginBtn.classList.remove("disable");
}
signupBtn.onclick = function(){
    console.log("Sign Up button clicked");
    nameField.style.display = 'flex';
    dateField.style.display = 'flex';
    sexField.style.display = 'flex';
    contField.style.display = 'flex';
    title.innerHTML = "sign Up";
    signupBtn.classList.remove("disable");
    loginBtn.classList.add("disable");
    submitBtn.innerText = "Sign Up";
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
    console.log("Password field type:", typeof passwordField); // Should log "string"


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
    


    // Send data to the backend via a POST request
    if (submitBtn.innerText === "Log In") {
        // Log In process (send email and password)
        try {
            const response = await fetch('http://localhost:3600/patients/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: passwordField,     
                }),
            });

            const result = await response.json();
            console.log("Backend Response:", result);

            if (response.ok) {
                console.log('Login successful', result);

                console.log('Setting patient name:', result.name);
                console.log('Setting patient email:', result.email);

                window.location.href = `../Patients/patients.html?name=${encodeURIComponent(result.name)}&email=${encodeURIComponent(result.email)}`;

            } else {
                alert(result.error || 'Failed to log in');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Error logging in');
        }
    } else if (submitBtn.innerText === "Sign Up") {
        // Sign Up process
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

            window.location.href = `../Patients/patients.html?name=${encodeURIComponent(result.name)}&email=${encodeURIComponent(result.email)}`;
        } else {
            alert(result.error || 'Failed to register patient');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Error submitting form');
    }
}
};
