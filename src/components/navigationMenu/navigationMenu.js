import './navigationMenu.scss';
import navigationCard from './navigation.hbs';
import mobileNavigationCard from './mobileNavigation.hbs';
import api from '../../services/api.js';
import { paginationCategore, categoriesCount, checkForStartOfData } from '../categoryListItem/renderCategoryList';
import searchBarHbs from '../header/searchBar.hbs';
import {getCategoryListItem} from '../categoryListItem/categoryListItem'

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
      categoryList.innerHTML = searchBarHbs(res);
    });
  });

});

//*================== reset

// const createList = async () => {
//   const list = await api.getCategoriesList();
//   const result = list.slice(0, 2)
//   // console.log(result);
//   result.map(category => getCategoryListItem (category))
//   count = 0;
// }


const navigationButtonRestore = document.querySelector('.buttonRestore');
navigationButtonRestore.addEventListener('click', e => {
  categoryList.innerHTML = ""
  // console.log(e.target);
  // if (e.target.nodeName === 'BUTTON' && e.target.dataset.button === 'filterbutton') 
  categoriesCount.count = 0; 
  checkForStartOfData();
  paginationCategore(2);
  // createList();


  // api.getCategoriesList().then(data => {
  //   insert(data);
  //   categories = [...data];
})
// })