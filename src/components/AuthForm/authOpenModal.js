import './stylesAuth.scss';
import openModal from './forOpenModal';
import authFormLogic from './authFormLogic';
import '../../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import { addButtonListeners } from '../authentication/refs';

const showModal = () => {
  const instance = basicLightbox.create(
    `<div>
      <div class="modal">${openModal()}</div>
    </div>`,
  );

  instance.show();
  authFormLogic();
  addButtonListeners();
};

const loginModal = document.querySelector('.header__form-login');
const registrationModal = document.querySelector('.registration');
registrationModal.addEventListener('click', showModal);
loginModal.addEventListener('click', showModal);

const closeModalWindowBtn = document.querySelector('.closeModalWindow');
console.log(closeModalWindowBtn)

// const closeModalAuthForm = () => {
//   remove.instance.show();
// }

// closeModalWindowBtn.addEventListener('click', closeModalAuthForm);

export default showModal;
