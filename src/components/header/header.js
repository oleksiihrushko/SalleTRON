import './header.scss';
import apiServices from '../../services/api';
import searchBarHbs from './searchBar.hbs';
import { paginationCategore } from '../categoryListItem/renderCategoryList';
import lodash from 'lodash';

const hamburger = document.querySelector('.hamburger');
const burgerMenu = document.querySelector('.header__burgerMenu');
const filterBtn = document.querySelector('.buttonFilter');
const searchBar = document.querySelector('.header__search');
const categoryList = document.querySelector('.categoryList');

hamburger.addEventListener('click', toggleBurger);
filterBtn.addEventListener('click', toggleTabletFilter);
searchBar.addEventListener('input', lodash.debounce(searchCategory, 500));
// ---------------------------------------------------------------------------
function toggleBurger(e) {
  e.preventDefault();
  e.stopPropagation();
  if (!e.currentTarget) return;
  if (e.currentTarget) {
    hamburger.classList.toggle('is-active');
    burgerMenu.classList.toggle('expanded');
  }
}
// ---------------------------------------------------------------------------
function toggleTabletFilter(e) {
  e.preventDefault();
  e.stopPropagation();
  if (!e.currentTarget) return;
  if (e.currentTarget) {
    burgerMenu.classList.toggle('filterIsActiveForTablet');
  }
}
// ---------------------------------------------------------------------------
async function searchCategory(e) {
  const inputValue = e.target.value;
  let isFound = false;
  categoryList.innerHTML = '';
  if (inputValue === '') {
    paginationCategore(2);
  }

  const getCategoryData = await apiServices.getCategoriesList();
  await getCategoryData.forEach(category => {
    if (
      category.toLowerCase().includes(inputValue.toLowerCase()) &&
      inputValue.length >= 3
    ) {
      apiServices.getProductsByCategory(category).then(res => {
        console.log(res);
        categoryList.insertAdjacentHTML('beforeend', searchBarHbs(res));
      });
      isFound = true;
      return;
    }
  });

  if (!isFound) {
    apiServices.getProducts().then(data => {
      if (inputValue.length >= 3) {
        const filteredProducts = data.filter(product =>
          product.name.toLowerCase().includes(inputValue.toLowerCase()),
        );
        categoryList.insertAdjacentHTML(
          'beforeend',
          searchBarHbs(filteredProducts),
        );
      }
      return;
    });
  }
}
