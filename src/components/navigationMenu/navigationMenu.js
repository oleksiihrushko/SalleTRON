import './navigationMenu.scss';
import navigationCard from './navigation.hbs';
import mobileNavigationCard from './mobileNavigation.hbs';
import api from '../../services/api.js';
import {
  paginationCategore,
  categoriesCount,
  checkForStartOfData,
} from '../categoryListItem/renderCategoryList';
import searchBarHbs from '../header/searchBar.hbs';

const navigationFilter = document.querySelector('.header__burgerMenu');
const categoryList = document.querySelector('.categoryList');
const spinner = document.querySelector('.spinner');

let categories = [];

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
    spinner.classList.add('spinner__show');

    if (e.target.nodeName !== 'LI') return;

    const activeCategory = navigationFilterList.querySelector(
      '.elementIsActive',
    );
    if (activeCategory) {
      activeCategory.classList.remove('elementIsActive');
      e.target.classList.add('elementIsActive');
    }
    e.target.classList.add('elementIsActive');
    categoryList.innerHTML = '';
    const res = api.getProductsByCategory(e.target.innerHTML);
    categoryList.innerHTML = searchBarHbs(res);
    spinner.classList.remove('spinner__show');
  });
});

//*================== reset

const navigationButtonRestore = document.querySelector('.buttonRestore');
navigationButtonRestore.addEventListener('click', e => {
  categoryList.innerHTML = '';
  const activeCategory = document.querySelector('.elementIsActive');
  activeCategory.classList.remove('elementIsActive');
  categoriesCount.count = 0;
  checkForStartOfData();
  paginationCategore(2);
});
