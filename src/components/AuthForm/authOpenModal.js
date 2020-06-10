import './stylesAuth.scss';
import openModal from './forOpenModal';
import authFormLogic from './authFormLogic';
import '../../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import { addButtonListeners } from '../authentication/refs';

function showModal() {
  const instance = basicLightbox.create(
    `<div>
      <div class="modal">${openModal()}</div>
    </div>`,
  );

  instance.show();
  authFormLogic();
  addButtonListeners(instance);

  document
    .querySelector('.closeModalWindow')
    .addEventListener('click', instance.close);
}

const loginModal = document.querySelector('.header__form-login');
loginModal.addEventListener('click', showModal);

export default showModal;
