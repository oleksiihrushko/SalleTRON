import apiService from '../../services/api';
import {
  getCategoryListItem
} from './categoryListItem';

let count = 0;

const renderBtn = document.querySelector('.renderBtn')

function paginationCategore(num) {
  apiService.getCategoriesList().then(data => {
    for (let i = count; i < num + count; i++) {
      if (data[i]) {
        getCategoryListItem(data[i]);
      }
      renderBtn.classList.remove('button--loading');
      checkForEndOfData(data, num, count)
    }

    count += num;
  });
}

paginationCategore(2);
renderBtn.addEventListener('click', paginationCategore1);

function paginationCategore1() {
  renderBtn.classList.add('button--loading');
  paginationCategore(2);
}

function checkForEndOfData(data, num, count) {
  if (data.length <= (num + count)) {
    renderBtn.disabled = true;
    renderBtn.classList.replace('button', 'button--inactive');
    renderBtn.querySelector('span').textContent = 'No more categories';
  }
}
