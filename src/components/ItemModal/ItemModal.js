import './ItemModal.scss';

import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.css';
import Glide from '@glidejs/glide';
import ItemModalHbs from './ItemModal.hbs';
import tabletItemPictureMarkup from './tabletItemPictureMarkup.hbs'
import apiService from '../../services/api';
import * as basicLightbox from 'basiclightbox'


// const modal = document.querySelector('.modal');
const openItemModal = (id) => {

  apiService.getProductById(id).then(data => {
    const glide = new Glide('.glide', {
      type: 'carousel',
      perView: 1,
      dots: '#dots',
    });
    // modal.innerHTML = ItemModalHbs(data);

    const instance = basicLightbox.create(`
    <div>${ItemModalHbs(data)}</div>
`, {
      closable: false
    })

    instance.show()
    const closeItemModalBtn = document.querySelector('.btnClose')
    closeItemModalBtn.addEventListener('click', () => instance.close());



    glide.mount();
    const tabletItemPicture = document.querySelector('.tablet_picture');
    const sMarkup = `
  <div class="itemModal__MainImageWrapper">
      <img src="${data.images[0]}" alt="" class="itemModal__MainImage">
  </div> 
  `
    tabletItemPicture.insertAdjacentHTML("beforeend", sMarkup)
    tabletItemPicture.insertAdjacentHTML("beforeend", tabletItemPictureMarkup(data));
    const clickedPicture = document.querySelectorAll('.itemSliderPicture');
    const itemModal__MainImage = document.querySelector('.itemModal__MainImage')
    clickedPicture.forEach(picture => {
      picture.addEventListener("click", (e) => {
        itemModal__MainImage.setAttribute("src", e.target.getAttribute("src"));
      })
    })
  });
}
export default openItemModal;
