import './stylesAuth.scss';
import '../../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import openModal from './forOpenModal';
import authFormLogic from './authFormLogic';
import * as basicLightbox from 'basiclightbox';
import { addButtonListeners } from '../authentication/refs';

const showModal = () => {
  const instance = basicLightbox.create(
    <div>
      <div class="modal">${openModal()}</div>
    </div>,
  );
  instance.show();
  authFormLogic();
  addButtonListeners();
};

const loginModal = document.querySelector('.login-btn');
const registrationModal = document.querySelector('.form__register-btn');
registrationModal.addEventListener('click', showModal);
loginModal.addEventListener('click', showModal);

export default showModal;
