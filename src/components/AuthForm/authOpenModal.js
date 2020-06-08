import './stylesAuth.scss';
import openModal from './forOpenModal';
import authFormLogic from './authFormLogic';
import '../../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';

// const closeModalBtn = document.querySelector(
//   'button[data-action="close-modal"]',
// );

const showModal = () => {
  const instance = basicLightbox.create(
    `<div>
      <div class="modal">${openModal()}</div>
    </div>`,
  );

  instance.show();
  authFormLogic();
};

// closeModalBtn.addEventListener('click', showModal);

export default showModal;