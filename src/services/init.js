import apiServices from './api';
import onAdvInit from '../components/adv/js/adv';
import { paginationCategore } from '../components/categoryListItem/renderCategoryList';

const spinner = document.querySelector('.spinner');

window.onload = async function () {
  spinner.classList.add('spinner__show');
  await apiServices.getProducts();
  onAdvInit();
  paginationCategore(2);
};
