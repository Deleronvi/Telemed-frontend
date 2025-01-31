// Burger menu functionality
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

document.addEventListener('DOMContentLoaded', async function () {
    const patientId = localStorage.getItem('patientId');
console.log('Patient ID from localStorage:', patientId);

if (!patientId) {
    alert('You need to log in to view your profile.');
    window.location.href = '../login page/login.html';
    return;
}
    try {
        const response = await fetch(`http://localhost:3600/appointments?patientId=${patientId}`);
        
        if (!response.ok) {
            if (response.status === 401) {
                alert('Session expired. Please log in again.');
                localStorage.removeItem('patientId'); // Clear localStorage for security
                window.location.href = '../login page/login.html';
                return;
            } else {
                throw new Error('Failed to fetch data.');
            }
            console.log(await response.json());

        }

        const appointments = await response.json();

        // Render appointments on the page
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = ''; // Clear existing content

        appointments.forEach((appointment) => {
            const card = document.createElement('div');
            card.className = 'history-card';
            card.innerHTML = `
                <p>Doctor: ${appointment.doctor}</p>
                <p>Date: ${appointment.appointment_date}</p>
                <p>Time: ${appointment.appointment_time}</p>
                <p>Status: ${appointment.status || 'Pending'}</p>
            `;
            historyList.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading appointments page:', error);
        alert('An error occurred. Please try again later.');
    }
});


