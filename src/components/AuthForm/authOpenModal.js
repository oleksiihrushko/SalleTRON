import './stylesAuth.scss';
import openModal from './forOpenModal';
import authFormLogic from './authFormLogic';
import '../../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import { addButtonListeners , closeWindowOnLogin } from '../authentication/refs';

function showModal() {
  const instance = basicLightbox.create(
    `<div class="modalAuthForm">${openModal()}</div>`,
  );

  instance.show();
  authFormLogic();
  addButtonListeners();
  closeWindowOnLogin(instance)
  document
    .querySelector('.closeModalWindow')
    .addEventListener('click', instance.close);
}

const loginModal = document.querySelector('.header__form-login');
loginModal.addEventListener('click', showModal);
// console.log(registrationModal);

export default showModal;
