import './navigationMenu.scss';
import navigationCard from './navigation.hbs';
import mobileNavigationCard from './mobileNavigation.hbs';
import api from '../../services/api.js';
import { paginationCategore } from '../categoryListItem/renderCategoryList';
import searchBarHbs from '../header/searchBar.hbs';

const navigationFilter = document.querySelector('.header__burgerMenu');
const categoryList = document.querySelector('.categoryList');

//=========== render list item
// let size = '';

let categories = [];
// window.addEventListener('resize', () => {
//   const insert = categoriesArr => {
//     let markup = '';
//     if (size === 'tablet' && window.matchMedia('(max-width: 767px)').matches) {
//       markup = mobileNavigationCard(categoriesArr);
//       navigationFilter.innerHTML = markup;
//       size = 'mobile';
//     } else if (
//       size === 'mobile' &&
//       !window.matchMedia('(max-width: 767px)').matches
//     ) {
//       markup = navigationCard(categoriesArr);
//       navigationFilter.innerHTML = markup;
//       size = 'tablet';
//     }
//   };
//   insert(categories);
// });

const insert = categoriesArr => {
  let markup = '';
  if (window.matchMedia('(max-width: 767px)').matches) {

    markup = mobileNavigationCard(categoriesArr);
  } else {

    markup = navigationCard(categoriesArr);
  }

  navigationFilter.innerHTML = markup;
};
api.getCategoriesList().then(data => {
  insert(data);
  categories = [...data];

  const navigationFilterList = document.querySelector('.navigationFilterList');
  navigationFilterList.addEventListener('click', e => {
    if (e.target.nodeName !== 'LI') return;
    categoryList.innerHTML = "";
    api.getProductsByCategory(e.target.innerHTML).then(res => {
      categoryList.insertAdjacentHTML('beforeend', searchBarHbs(res));
    });
  });

});

//*================== reset

const navigationButtonRestore = document.querySelector('.buttonRestore');
navigationButtonRestore.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') return;
  api.getCategoriesList().then(data => {
    insert(data);
    categories = [...data];
  categoryList.innerHTML = '';
  paginationCategore(2);
})
})