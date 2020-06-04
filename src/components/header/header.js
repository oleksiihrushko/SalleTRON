import './header.scss';

const hamburger = document.querySelector('.hamburger');

const toggleBurger = e => {
  if (!e.currentTarget) return;
  console.log(e.target.nodeName);
  if (e.currentTarget) {
    hamburger.classList.toggle('is-active');
  }
};

hamburger.addEventListener('click', toggleBurger);
