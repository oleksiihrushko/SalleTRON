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
const registrationModal = document.querySelector('.header__form-register');

registrationModal.addEventListener('click', showModal);
loginModal.addEventListener('click', showModal);
// console.log(registrationModal);



export default showModal;
