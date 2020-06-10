import apiService from '../../services/api';
import { getCategoryListItem } from './categoryListItem';

export const categoriesCount = { count: 0 };

const renderBtn = document.querySelector('.renderBtn');

export function paginationCategore(num) {
  apiService.getCategoriesList().then(data => {
    for (let i = categoriesCount.count; i < num + categoriesCount.count; i++) {
      if (data[i]) {
        getCategoryListItem(data[i]);
      }
      renderBtn.classList.remove('button--loading');
      checkForEndOfData(data, num, categoriesCount.count);
    }

    categoriesCount.count += num;
  });
}

paginationCategore(2);
renderBtn.addEventListener('click', paginationCategore1);

function paginationCategore1() {
  renderBtn.classList.add('button--loading');
  paginationCategore(2);
}

function checkForEndOfData(data, num, count) {
  if (data.length <= num + count) {
    renderBtn.disabled = true;
    renderBtn.classList.replace('button', 'button--inactive');
    renderBtn.querySelector('span').textContent = 'No more categories';
  }
}

export function checkForStartOfData() {
  renderBtn.disabled = false;
  renderBtn.classList.replace('button--inactive', 'button');
  renderBtn.querySelector('span').textContent = 'More categories';
}
