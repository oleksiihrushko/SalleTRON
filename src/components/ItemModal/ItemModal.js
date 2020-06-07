import './ItemModal.scss';

import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.css';
import Glide from '@glidejs/glide';
import ItemModalHbs from './ItemModal.hbs';
import tabletItemPictureMarkup from './tabletItemPictureMarkup.hbs'
import apiService from '../../services/api';


const modal = document.querySelector('.modal');
apiService.getProductById("-M8ziQASJcnc2-vQMKbE").then(data => {
  const glide = new Glide('.glide', {
    type: 'carousel',
    perView: 1,
    dots: '#dots',
  });
  modal.innerHTML = ItemModalHbs(data);

  glide.mount();
  const tabletItemPicture = document.querySelector('.tablet_picture');
  const sMarkup = `
  <div class="itemModal__MainImageWrapper">
      <img src="${data.images[0]}" alt="" class="itemModal__MainImage">
  </div> 
  `
  tabletItemPicture.insertAdjacentHTML("beforeend", sMarkup)
  tabletItemPicture.insertAdjacentHTML("beforeend", tabletItemPictureMarkup(data));
});



// modal.innerHTML = ItemModalHbs();

// const sliderContainer = document.querySelector('.sliderContainer');
// sliderContainer.innerHTML = getSlider();



// textObj = {
//   name: 'musicBox',
//   cost: '1200',
//   description: 'erfoehroe',
// }

// import * as basicLightbox from 'basiclightbox'
// import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

// export default function openModal(e) {
//   if (e.target.nodeName !== 'IMG') return;

// // ! копия с https://basiclightbox.electerious.com/
// // !     const instance = basicLightbox.create(`
// // !       <img src="assets/images/image.png" width="800" height="600">
// // !       `) 

//   const instance = basicLightbox.create(genereteMarkup(textObj))
//   instance.show()
// }

// const genereteMarkup = function (clickedObj) {
//   return itemCard(clickedObj)
// }

// const closeBtn = document.querySelector('[data-action="close-lightbox"]');

// closeBtn.addEventListener('click', closeModalHandler);
// window.addEventListener('keydown', closeModalHandler);

// function closeModalHandler(e) {
//   (e.code === 'Escape' || e.target === closeBtn) && instance.close();

//   window.removeEventListener('keydown', closeModalHandler);
//   closeBtn.removeEventListener('click', closeModalHandler);