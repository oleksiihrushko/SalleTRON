import './ItemModal.scss';

import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.css';
import Glide from '@glidejs/glide';
import ItemModalHbs from './ItemModal.hbs';
import tabletItemPictureMarkup from './tabletItemPictureMarkup.hbs';
import apiService from '../../services/api';
import * as basicLightbox from 'basiclightbox';

// apiService.signUpUser({
//   email:'master-321111@i.ua',
//   password:'111111'
// })

// apiService.signInUser({
//   email: 'master-321@i.ua',
//   password: '111111'
// })
const openItemModal = id => {
  apiService.getProductById(id).then(data => {
    const glide = new Glide('.glideItemModal', {
      type: 'carousel',
      perView: 1,
      dots: '#dots',
    });

    const instance = basicLightbox.create(
      `
    <div>${ItemModalHbs(data)}</div>
`, {
        closable: false,
      },
    );

    instance.show();
    // if (!JSON.parse(localStorage.getItem('user'))) {
    //   localStorage.setItem(
    //     'user',
    //     JSON.stringify({
    //       favorites: [],
    //     }),
    //   );
    // }


    const favoriteBtn = document.querySelector('.modal__share-item-heart-cvg');
    if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).favorites.includes(id)) {
      favoriteBtn.innerHTML = `
  <path d="M255,489.6l-35.7-35.7C86.7,336.6,0,257.55,0,160.65C0,81.6,61.2,20.4,140.25,20.4c43.35,0,86.7,20.4,114.75,53.55
  C283.05,40.8,326.4,20.4,369.75,20.4C448.8,20.4,510,81.6,510,160.65c0,96.9-86.7,175.95-219.3,293.25L255,489.6z"/>
`;
    }

    const closeItemModalBtn = document.querySelector('.btnClose');
    closeItemModalBtn.addEventListener('click', () => instance.close());

    const backItemModalBtn = document.querySelector('.btnBack');
    backItemModalBtn.addEventListener('click', () => instance.close());

    favoriteBtn.addEventListener('click', e => {
      if (JSON.parse(localStorage.getItem('user'))){

      if (!JSON.parse(localStorage.getItem('user')).favorites.includes(id)) {
        e.target.innerHTML = `
      <path d="M255,489.6l-35.7-35.7C86.7,336.6,0,257.55,0,160.65C0,81.6,61.2,20.4,140.25,20.4c43.35,0,86.7,20.4,114.75,53.55
			C283.05,40.8,326.4,20.4,369.75,20.4C448.8,20.4,510,81.6,510,160.65c0,96.9-86.7,175.95-219.3,293.25L255,489.6z"/>
`;
        apiService.addUserFavorite(id);
      } else {
        e.target.innerHTML = `
        <path
        d="m256 455.515625c-7.289062 0-14.316406-2.640625-19.792969-7.4375-20.683593-18.085937-40.625-35.082031-58.21875-50.074219l-.089843-.078125c-51.582032-43.957031-96.125-81.917969-127.117188-119.3125-34.644531-41.804687-50.78125-81.441406-50.78125-124.742187 0-42.070313 14.425781-80.882813 40.617188-109.292969 26.503906-28.746094 62.871093-44.578125 102.414062-44.578125 29.554688 0 56.621094 9.34375 80.445312 27.769531 12.023438 9.300781 22.921876 20.683594 32.523438 33.960938 9.605469-13.277344 20.5-24.660157 32.527344-33.960938 23.824218-18.425781 50.890625-27.769531 80.445312-27.769531 39.539063 0 75.910156 15.832031 102.414063 44.578125 26.191406 28.410156 40.613281 67.222656 40.613281 109.292969 0 43.300781-16.132812 82.9375-50.777344 124.738281-30.992187 37.398437-75.53125 75.355469-127.105468 119.308594-17.625 15.015625-37.597657 32.039062-58.328126 50.167969-5.472656 4.789062-12.503906 7.429687-19.789062 7.429687zm-112.96875-425.523437c-31.066406 0-59.605469 12.398437-80.367188 34.914062-21.070312 22.855469-32.675781 54.449219-32.675781 88.964844 0 36.417968 13.535157 68.988281 43.882813 105.605468 29.332031 35.394532 72.960937 72.574219 123.476562 115.625l.09375.078126c17.660156 15.050781 37.679688 32.113281 58.515625 50.332031 20.960938-18.253907 41.011719-35.34375 58.707031-50.417969 50.511719-43.050781 94.136719-80.222656 123.46875-115.617188 30.34375-36.617187 43.878907-69.1875 43.878907-105.605468 0-34.515625-11.605469-66.109375-32.675781-88.964844-20.757813-22.515625-49.300782-34.914062-80.363282-34.914062-22.757812 0-43.652344 7.234374-62.101562 21.5-16.441406 12.71875-27.894532 28.796874-34.609375 40.046874-3.453125 5.785157-9.53125 9.238282-16.261719 9.238282s-12.808594-3.453125-16.261719-9.238282c-6.710937-11.25-18.164062-27.328124-34.609375-40.046874-18.449218-14.265626-39.34375-21.5-62.097656-21.5zm0 0" />`;
        apiService.deleteUserFavorite(id);
      }
    } else {
      alert("please sign in")
    }
    });

    glide.mount();

    const tabletItemPicture = document.querySelector('.tablet_picture');
    const sMarkup = `
  <div class="itemModal__MainImageWrapper">
      <img src="${data.images[0]}" alt="" class="itemModal__MainImage">
  </div> 
  `;
    tabletItemPicture.insertAdjacentHTML('beforeend', sMarkup);
    tabletItemPicture.insertAdjacentHTML(
      'beforeend',
      tabletItemPictureMarkup(data),
    );
    const clickedPicture = document.querySelectorAll('.itemSliderPicture');
    const itemModal__MainImage = document.querySelector(
      '.itemModal__MainImage',
    );
    clickedPicture.forEach(picture => {
      picture.addEventListener('click', e => {
        itemModal__MainImage.setAttribute('src', e.target.getAttribute('src'));
      });
    });
  });
};
export default openItemModal;
