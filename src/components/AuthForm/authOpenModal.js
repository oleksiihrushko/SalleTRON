import './stylesAuth.scss';
import openModal from './forOpenModal';

import * as basicLightbox from 'basiclightbox';
import '../../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import authFormLogic from './authFormLogic';

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