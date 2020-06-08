import './navigationMenu.scss';
import navigationCard from './navigation.hbs';
import mobileNavigationCard from './mobileNavigation.hbs';
import api from '../../services/api.js';

const navigationFilter = document.querySelector('.header__burgerMenu');

//*=========== render list item
let size = '';

let categories = [];
window.addEventListener('resize', () => {
  const insert = categoriesArr => {
    let markup = '';
    if (size === 'tablet' && window.matchMedia('(max-width: 767px)').matches) {
      markup = mobileNavigationCard(categoriesArr);
      navigationFilter.innerHTML = markup;
      size = 'mobile';
    } else if (
      size === 'mobile' &&
      !window.matchMedia('(max-width: 767px)').matches
    ) {
      markup = navigationCard(categoriesArr);
      navigationFilter.innerHTML = markup;
      size = 'tablet';
    }
  };
  insert(categories);
});

const insert = categoriesArr => {
  let markup = '';
  if (window.matchMedia('(max-width: 767px)').matches) {
    size = 'mobile';
    markup = mobileNavigationCard(categoriesArr);
  } else {
    size = 'tablet';
    markup = navigationCard(categoriesArr);
  }
  navigationFilter.insertAdjacentHTML('afterbegin', markup);
};
api.getCategoriesList().then(data => {
  insert(data);
  categories = [...data];
});

//*=============== openByCategory

// const navigationFilterList = document.querySelector('.navigationFilterList');
// navigationFilterList.addEventListener('click', (e) => {
//     if (e.target.nodeName !== "LI") return;
//! openCategory(e.target.value) ждём импорта от Жени
// });

//*================== reset

// const navigationButtonRestore = document.querySelector(."navigationButtonRestore");
// navigationButtonRestore.addEventListener("click", (e) => {
//   if (e.target.nodeName !== "BUTTON") return;
//   showAllProducts(e.target.value) //! ресет
