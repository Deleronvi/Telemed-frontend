
//burger menu
const burgerBtn = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const upcomingAppointments = [];
const appointmentHistory = [];

const patientId = localStorage.getItem('patientId');

if (!patientId) {
    console.warn("Patient ID not found in localStorage.");
} else {
    console.log("Patient ID:", patientId);
    fetchAppointments(patientId);
}



console.log('Patient ID from localStorage on patient page:', patientId);

burgerBtn.addEventListener('click', (event) => {
    mobileMenu.classList.toggle('visible');
    event.stopPropagation();
});

document.addEventListener('click', (event) => {
    if (!burgerBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.remove('visible'); 
    }
});

const appointmentsList = document.getElementById('appointments-list');
const noUpcoming = document.getElementById('no-upcoming');

if (upcomingAppointments.length === 0) {
    noUpcoming.style.display = 'block';
} else {
    noUpcoming.style.display = 'none';
    upcomingAppointments.forEach(appointment => {
        const appointmentCard = document.createElement('div');
        appointmentCard.className = 'appointment-card';
        appointmentCard.innerHTML = `
            <p>Doctor: ${appointment.doctor}</p>
            <p>Date: ${appointment.date}</p>
            <p>Time: ${appointment.time}</p>
            <a href="../Appointments page/app.html" style="text-decoration: none;">
                <button class="reschedule-btn">Reschedule</button>
            </a>
            <button class="cancel-btn">Cancel</button>
        `;
        appointmentsList.appendChild(appointmentCard);
    });
}

// Appointment History Section
const historyList = document.getElementById('history-list');
const noHistory = document.getElementById('no-history');

if (appointmentHistory.length === 0) {
    noHistory.style.display = 'block';
} else {
    noHistory.style.display = 'none';
    appointmentHistory.forEach(history => {
        const historyCard = document.createElement('div');
        historyCard.className = 'history-card';
        historyCard.innerHTML = `
            <p>Doctor: ${history.doctor}</p>
            <p>Date: ${history.date}</p>
            <p>Status: ${history.status}</p>
        `;
        historyList.appendChild(historyCard);
    }); }

    async function fetchAppointments(patientId) {
        try {
            const response = await fetch(`http://localhost:3600/patients/appointments/${patientId}`, {
                method: 'GET',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json',
                     
                }
            });
            const result = await response.json();
    
            if (response.ok) {
                console.log('Appointments:', result.appointments);
                displayAppointments(result.appointments);
            } else {
                console.error('Error fetching appointments:', result.error);
                document.getElementById('appointments-list').innerText = 'Failed to load appointments.';
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('appointments-list').innerText = 'An error occurred.';
        }
    }

    function displayAppointments(appointments) {
        const appointmentsList = document.getElementById('appointments-list');
        appointmentsList.innerHTML = ''; // Clear existing content
    
        if (appointments.length === 0) {
            appointmentsList.innerHTML = '<p>No upcoming appointments found.</p>';
            return;
        }
    
        appointments.forEach(appointment => {
            const card = document.createElement('div');
            card.className = 'appointment-card';
    
            card.innerHTML = `
                <p>Doctor: Dr. ${appointment.doctor_first_name} ${appointment.doctor_last_name}</p>
                <p>Date: ${appointment.appointment_date}</p>
                <p>Time: ${appointment.appointment_time}</p>
                <a href="../Appointments page/app.html" style="text-decoration: none;">
                    <button id="reschedule" class="reschedule-btn">Reschedule</button>
                </a>
                <button id="cancel" class="cancel-btn">Cancel</button>
            `;
    
            appointmentsList.appendChild(card);
        });
    }
    
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