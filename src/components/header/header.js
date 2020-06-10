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
// searchBar.addEventListener('input', searchData);

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
  e.stopPropagation();
  if (!e.currentTarget) return;
  if (e.currentTarget) {
    burgerMenu.classList.toggle('filterIsActiveForTablet');
  }
}
// ---------------------------------------------------------------------------
async function searchCategory(e) {
  let isFound = false;
  categoryList.innerHTML = '';
  const inputValue = e.target.value;
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

// ---------------------------------------------------------------------------
// searchBar.addEventListener(
//   'input',
//   lodash.debounce(e => {
//     const inputValue = e.target.value;
//     if (inputValue === '') return;
//     categoryList.innerHTML = '';

//     apiServices.getProducts().then(data => {
//       data.filter(product => {
//         if (
//           product.categories.toLowerCase().includes(inputValue.toLowerCase())
//         ) {
//           if (inputValue.length >= 3) {
//             categoryList.insertAdjacentHTML(
//               'beforeend',
//               searchBarHbs({ product }),
//             );
//             console.log(product);
//           }
//           return;
//         }
//       });
//     });
//   }, 1000),
// );

// ---------------------------------------------------------------------- Andrii
// let isFound = false;

// searchBar.addEventListener(
//   'input',
//   lodash.debounce(e => {
//     const inputValue = e.target.value;
//     // console.log(inputValue);
//     if (inputValue === '') return;

//     apiServices.getCategoriesList().then(data => {
//       data.forEach(category => {
//         if (category.toLowerCase().includes(inputValue.toLowerCase())) {
//           if (inputValue.length >= 3) {
//             apiServices
//               .getProductsByCategory(category)
//               .then(data => console.log(data));
//             isFound = true;
//           }
//           return;
//         }
//       });
//     });

//     if (!isFound) {
//       apiServices.getProducts().then(data => {
//         data.filter(product => {
//           if (
//             product.categories.toLowerCase().includes(inputValue.toLowerCase())
//           ) {
//             if (inputValue.length >= 3) {
//               categoryList.insertAdjacentHTML(
//                 'beforeend',
//                 searchBarHbs({ product }),
//               );
//               console.log(product);
//             }
//             return;
//           }
//         });
//       });
//     }
//   }, 500),
// );

// ---------------------------------------------------------------------------
// apiServices.getProducts().then(data => {
//   const productData = data.filter(product =>
//     product.name.toLowerCase().includes(inputValue.toLowerCase()),
//   );
//   console.log(productData);
// });
// ---------------------------------------------------------------------------

// function searchData(e) {
//   const inputValue = e.currentTarget.value;
//   if (inputValue === '') return;

//   apiServices.getCategoriesList().then(data => {
//     data.forEach(item => {
//       if (item.toLowerCase().includes(inputValue.toLowerCase())) {
//         if (inputValue.length >= 3) {
//           console.log('ok');
//         }
//         // else {
//         //   console.log('no result');
//         // }
//         return;
//       }
//     });
//   });
// }
