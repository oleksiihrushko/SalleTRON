import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.css';
import Glide from '@glidejs/glide';

import apiServices from '../../services/api';
import markup from './categoryListItemMarkup';
import openItemModal from '../ItemModal/ItemModal';
import './categoryListItem.scss';

const categoryList = document.querySelector('.categoryList');

categoryList.addEventListener('click', e => {
  if (e.target.nodeName === 'IMG' || e.target.nodeName === 'P') {
    openItemModal(e.target.dataset.id);
  }
});

export async function getCategoryListItem(category) {
  try {
    const categoryItems = await apiServices.getProductsByCategory(category);

    const products = {
      visible: 12,
    };

    const itemMarkup = categoryItems.reduce((acc, item) => {
      acc += markup.getItemMarkup(item);
      return acc;
    }, '');

    categoryList.insertAdjacentHTML(
      'beforeend',
      markup.mainMarkup(category, itemMarkup, categoryItems),
    );
    const categoryContainer = document.querySelector(
      `[data-replace=${e.target.dataset.btnreplace}]`,
    );
    categoryContainer.innerHTML = markup.withSlider(
      category,
      itemMarkup,
      categoryItems,
    );
    getSlider();

    categoryContainer.addEventListener('click', seeAllProducts);

    function seeAllProducts(e) {
      if (e.target.dataset.btnseeall === `${category}`) {
        const categoryCont = document.querySelector(
          `[data-replace=${e.target.dataset.btnseeall}]`,
        );
        categoryCont.innerHTML = markup.withoutSlider(
          e.target.dataset.btnseeall,
        );

        const categoryContent = document.querySelector(
          `[data-content=${e.target.dataset.btnseeall}]`,
        );
        categoryContent.innerHTML = innerMarkup(
          categoryItems,
          0,
          products.visible,
        );

        const loadMoreBtn = document.querySelector(
          `[data-loadmore=${e.target.dataset.btnseeall}]`,
        );
        loadMoreBtn.addEventListener('click', loadMoreProducts);
        endOfCategoryHandler(categoryItems, loadMoreBtn, products);

        function loadMoreProducts() {
          loadMoreBtn.classList.add('button--loading');

          const addedProducts = innerMarkup(
            categoryItems,
            products.visible,
            products.visible + 12,
          );
          products.visible += 12;

          const categoryContent = document.querySelector(
            `[data-content=${e.target.dataset.btnseeall}]`,
          );
          categoryContent.insertAdjacentHTML('beforeend', addedProducts);
          loadMoreBtn.classList.remove('button--loading');
          endOfCategoryHandler(categoryItems, loadMoreBtn, products);
        }
      }

      if (e.target.dataset.btnseeless === `${category}`) {
        const categoryCont = document.querySelector(
          `[data-replace=${e.target.dataset.btnseeless}]`,
        );
        categoryCont.innerHTML = markup.withSlider(
          e.target.dataset.btnseeless,
          itemMarkup,
          categoryItems,
        );
        getSlider();
      }
    }
  } catch (error) {
    console.log(error);
    return;
  }
}

function getSlider() {
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

function innerMarkup(categoryItems, start, end) {
  return `
  ${categoryItems.slice(start, end).reduce((acc, item) => {
    return (acc += markup.getItemMarkup(item));
  }, '')}`;
}

function endOfCategoryHandler(categoryItems, loadMoreBtn, products) {
  if (products.visible >= categoryItems.length) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.classList.replace('button', 'button--inactive');
    loadMoreBtn.querySelector('span').textContent = 'No more here';
  }
}
