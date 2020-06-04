import './header.scss';

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.burgerMenu');

const toggleBurger = e => {
  // e.preventDefault();
  if (!e.currentTarget) return;
  console.log(e.target.nodeName);
  if (e.currentTarget) {
    hamburger.classList.toggle('is-active');
    nav.classList.toggle('expanded');
  }
};

hamburger.addEventListener('click', toggleBurger);
