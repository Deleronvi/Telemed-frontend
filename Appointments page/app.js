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

document.addEventListener('DOMContentLoaded', async function () {
    const patientId = localStorage.getItem('patientId');

    if (!patientId) {
        alert('You need to log in to view your profile.');
        window.location.href = '../login/login.html';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3600/appointments?patientId=${patientId}`);
        const appointments = await response.json();

        if (response.ok) {
            const historyList = document.getElementById('history-list');
            historyList.innerHTML = ''; // Clear existing content

            appointments.forEach((appointment) => {
                const card = document.createElement('div');
                card.className = 'history-card';
                card.innerHTML = `
                    <p>Doctor: ${appointment.doctor}</p>
                    <p>Date: ${appointment.date}</p>
                    <p>Time: ${appointment.time}</p>
                    <p>Status: ${appointment.status || 'Pending'}</p>
                `;
                historyList.appendChild(card);
            });
        } else {
            alert(appointments.error || 'Failed to fetch appointments');
        }
    } catch (err) {
        console.error('Error fetching appointments:', err);
        alert('Error loading appointment history.');
    }
});
