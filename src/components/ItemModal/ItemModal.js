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
    const glide = new Glide('.glideItemModal', {
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

    const favoriteBtn = document.querySelector('.modal__share-item-heart-cvg');
//     if (localStorage.getItem('user').favorites.includes(id)) {
//       favoriteBtn.innerHTML = `
//   <path d="M255,489.6l-35.7-35.7C86.7,336.6,0,257.55,0,160.65C0,81.6,61.2,20.4,140.25,20.4c43.35,0,86.7,20.4,114.75,53.55
//   C283.05,40.8,326.4,20.4,369.75,20.4C448.8,20.4,510,81.6,510,160.65c0,96.9-86.7,175.95-219.3,293.25L255,489.6z"/>
// `;
//     }

    const closeItemModalBtn = document.querySelector('.btnClose')
    closeItemModalBtn.addEventListener('click', () => instance.close());

    const backItemModalBtn = document.querySelector('.btnBack')
    backItemModalBtn.addEventListener('click', () => instance.close());

    favoriteBtn.addEventListener('click', (e) => {
//       if (!localStorage.getItem('user').favorites.includes(id)) {

//         // apiService.addUserFavorite(id);
//         localStorage.setItem('user', JSON.stringify({
//           favorites: [id],
//         }))
//         e.target.innerHTML = `
//       <path d="M255,489.6l-35.7-35.7C86.7,336.6,0,257.55,0,160.65C0,81.6,61.2,20.4,140.25,20.4c43.35,0,86.7,20.4,114.75,53.55
// 			C283.05,40.8,326.4,20.4,369.75,20.4C448.8,20.4,510,81.6,510,160.65c0,96.9-86.7,175.95-219.3,293.25L255,489.6z"/>
// `;
//         console.log(id);
//       } else {
//         localStorage.setItem('user', JSON.stringify({
//           favorites: [id],
//         }))

//       }

console.log(localStorage.getItem('user').favorites);
    })

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
