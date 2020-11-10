// Selecting the navbar's component
const navbar = document.querySelector('#navbar-m');
const toggler = navbar.querySelector('.toggler');
const navLinks = navbar.querySelector('.nav-links');

toggler.addEventListener('click',(e) => {

    let {checked} = toggler;

    checked ? openNav() : closeNav();
});


const openNav = () => {
    navbar.style.width = 'auto';
    navLinks.style.opacity = 1;
}

const closeNav = () => {
    navbar.style.width = 0;
    navLinks.style.opacity = 0;
}

// console.log(checked);

