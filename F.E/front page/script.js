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
let burgerBtn = document.querySelector(".menu-btn");
let burgerMenu = document.querySelector(".Burger-menu");

let isBurgerOpen =false;

burgerBtn.onclick = function() {
    if ( !isBurgerOpen){
        burgerMenu.style.display = "block";
        burgerBtn.style.backgroundPosition =" center left 50px, center"
        isBurgerOpen = true;
    }
    else if(isBurgerOpen){
        burgerMenu.style.display = "none";
    burgerBtn.style.backgroundPosition ="center, center left 50px"
    isBurgerOpen = false;
}
}