import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.css';
import Glide from '@glidejs/glide';

import apiServices from '../../services/api';
import { getItemMarkup, getLiMarkup } from './categoryListItemMarkup';
import openItemModal from '../ItemModal/ItemModal';

import './categoryListItem.scss';

const categoryList = document.querySelector('.categoryList');

categoryList.addEventListener('click', e => {
  if (e.target.nodeName === 'IMG' || e.target.nodeName === 'P') {
    openItemModal(e.target.dataset.id);
  }
});

export async function getCategoryListItem(category) {
  const categoryItems = await apiServices.getProductsByCategory(category);

  const products = {
    visible: 12,
  };

  const itemMarkup = categoryItems.reduce((acc, item) => {
    acc += getItemMarkup(item);
    return acc;
  }, '');

  const categoryItem = document.createElement('div');
  categoryList.append(categoryItem);

  function getSlider() {
    categoryItem.innerHTML = getLiMarkup(category, itemMarkup, categoryItems);

    const sliders = document.querySelectorAll('.glide');

    for (let i = 0; i < sliders.length; i += 1) {
      const glide = new Glide(sliders[i], {
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
            gap: 30,
            perView: 1,
          },
        },
      });
      glide.mount();
    }
  }

  getSlider();

  const seeAllButton = document.querySelector(`[data-btnReplace=${category}]`);
  seeAllButton.addEventListener('click', seeAllProducts);

  function seeAllProducts(e) {
    const categoryContainer = document.querySelector(
      `[data-replace=${e.target.dataset.btnreplace}]`, 
    );

    categoryContainer.innerHTML = innerMarkup(
      categoryItems,
      0,
      products.visible,
    );

    const loadMoreBtn = document.querySelector(
      `[data-loadmore=${e.target.dataset.btnreplace}]`,
    );
    loadMoreBtn.addEventListener('click', loadMoreProducts);
    loadMoreBtn.classList.remove('hidden');

    endOfCategoryHandler(categoryItems, loadMoreBtn, products);

    function loadMoreProducts() {
      loadMoreBtn.classList.add('button--loading');
      const addedProducts = innerMarkup(
        categoryItems,
        products.visible,
        products.visible + 12,
      );
      products.visible += 12;

      categoryContainer.insertAdjacentHTML('beforeend', addedProducts);
      loadMoreBtn.classList.remove('button--loading');
      endOfCategoryHandler(categoryItems, loadMoreBtn, products);
    }

    const seeAllButton = document.querySelector(
      `[data-btnReplace=${category}]`,
    );
    seeAllButton.textContent = 'See less';
    seeAllButton.addEventListener('click', seeLessProducts);

    function seeLessProducts() {
      loadMoreBtn.classList.add('hidden');
      getSlider();
      const seeAllButton = document.querySelector(
        `[data-btnReplace=${category}]`,
      );
      seeAllButton.textContent = 'See all';
      seeAllButton.addEventListener('click', seeAllProducts);
      seeAllButton.removeEventListener('click', seeLessProducts);
    }
  }
}

function innerMarkup(categoryItems, start, end) {
  return `
  ${categoryItems.slice(start, end).reduce((acc, item) => {
    return (acc += getItemMarkup(item));
  }, '')}`;
}

function endOfCategoryHandler(categoryItems, loadMoreBtn, products) {
  if (products.visible >= categoryItems.length) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.classList.replace('button', 'button--inactive');
    loadMoreBtn.querySelector('span').textContent = 'No more here';
  }
}
