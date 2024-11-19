//slide show

const slider = document.getElementById('slider');
let currentIndex = 0;
const totalImages = document.querySelectorAll('.images img').length;

function moveSlider() {
    currentIndex++;
    slider.style.marginLeft = `-${currentIndex * 100}%`;

    if (currentIndex === totalImages - 1) {
        setTimeout(() => {
            slider.style.transition = 'none'; // Disable transition for instant jump
            slider.style.marginLeft = '0'; // Jump back to the real first image
            currentIndex = 0;
            setTimeout(() => {
                slider.style.transition = 'margin-left 1s ease-in-out'; // Re-enable smooth transition
            }, 20);
        }, 1000); // Wait for the last transition to finish
    }
}

setInterval(moveSlider, 3000);


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
