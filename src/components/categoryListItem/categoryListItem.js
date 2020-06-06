import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.css';
import Glide from '@glidejs/glide';
import {
  autoplay
} from '@glidejs/glide/dist/glide.modular.esm'

import apiServices from '../../services/api';
import {
  getItemMarkup,
  getLiMarkup
} from './categoryListItemMarkup';

import './categoryListItem.scss';

///////////////////////////////////////////////////////////////
const categoryList = document.querySelector('.categoryList');
categoryList.addEventListener('click', e => {
  if (e.target.nodeName === 'IMG' || e.target.nodeName === 'P') {
    console.log(e.target.dataset.id); // заменить консоль лог функцией
  }
});
////////////////////////////////////////////////////////////////

export async function getCategoryListItem(category) {
  const glide = new Glide('.glide', {
    type: 'carousel',
    perView: 4,
    dots: '#dots',
    autoplay: 6000,
    breakpoints: {
      1279: {
        gap: 26,
        perView: 2,
      },
      767: {
        perView: 1,
      },
    },
  });

  const categoryItems = await apiServices.getProductsByCategory(category);

  const itemMarkup = categoryItems.reduce((acc, item) => {
    acc += getItemMarkup(item);
    return acc;
  }, '');

  categoryList.insertAdjacentHTML(
    'afterbegin',
    getLiMarkup(category, itemMarkup, categoryItems),
  );

  glide.mount();

  const seeAllButton = document.querySelector('.category__btn-see-all');
  seeAllButton.addEventListener('click', showAllProducts);

  function showAllProducts() {
    const categoryContainer = document.querySelector('.replacableContainer');
    categoryContainer.innerHTML = innerMarkup(
      categoryItems,
      0,
      products.visible,
    );

    const loadMoreBtn = document.querySelector('.loadMoreBtn');
    loadMoreBtn.addEventListener('click', showMoreProducts);
    loadMoreBtn.classList.remove('hidden');

    endOfCategoryHandler(categoryItems, loadMoreBtn)

    function showMoreProducts() {
      loadMoreBtn.classList.add('button--loading');
      const addedProducts = innerMarkup(
        categoryItems,
        products.visible,
        products.visible + 12,
      );
      products.visible += 12;

      categoryContainer.insertAdjacentHTML('beforeend', addedProducts);
      loadMoreBtn.classList.remove('button--loading');
    }
  }
}

const products = {
  visible: 12,
};

function innerMarkup(categoryItems, start, end) {
  return `
    ${categoryItems.slice(start, end).reduce((acc, item) => {
      return (acc += getItemMarkup(item));
    }, '')}`;
}

function endOfCategoryHandler(categoryItems, loadMoreBtn) {
  if (products.visible >= categoryItems.length) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.classList.replace('button', 'button--inactive');
    loadMoreBtn.querySelector('span').textContent = 'No more here';
    return;
  }
}
