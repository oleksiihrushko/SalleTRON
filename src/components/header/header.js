import './header.scss';
import apiServices from '../../services/api';

const hamburger = document.querySelector('.hamburger');
const burgerMenu = document.querySelector('.header__burgerMenu');
const filterBtn = document.querySelector('.buttonFilter');
hamburger.addEventListener('click', toggleBurger);
filterBtn.addEventListener('click', toggleTabletFilter);

function toggleBurger(e) {
  e.preventDefault();
  e.stopPropagation();
  if (!e.currentTarget) return;
  if (e.currentTarget) {
    hamburger.classList.toggle('is-active');
    burgerMenu.classList.toggle('expanded');
  }
}

function toggleTabletFilter(e) {
  e.preventDefault();
  if (!e.currentTarget) return;
  if (e.currentTarget) {
    burgerMenu.classList.toggle('filterIsActiveForTablet');
  }
}
