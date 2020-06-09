import './header.scss';
import apiServices from '../../services/api';

const hamburger = document.querySelector('.hamburger');
const burgerMenu = document.querySelector('.header__burgerMenu');
const filterBtn = document.querySelector('.buttonFilter');
const searchBar = document.querySelector('.header__search');
hamburger.addEventListener('click', toggleBurger);
filterBtn.addEventListener('click', toggleTabletFilter);
searchBar.addEventListener('input', searchData);
// searchBar.addEventListener('input', searchCategory);

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

function searchData(e) {
  const inputValue = e.currentTarget.value;

  apiServices.getProducts().then(data => {
    const productData = data.filter(product => console.log(product));
  });
}

// function searchCategory(e) {
//   apiServices.getProductsByCategory().then(res => console.log(res));
// }
