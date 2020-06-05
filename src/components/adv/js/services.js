import { advSlider } from './siema';

export const mobileTemplate = (array, numAd) => {
  array.length = numAd;
  const markup1 = `<div class="adv__slider">
      <ul class="adv__adList siema">`;

  const makeMarkup2 = () => {
    const markup2 = array
      .map(
        item => `<li class="adv__adItem">
      <img
      class="adv__adImg"
      src="${item.images[0]}"
      alt="${item.description}"
      />
      <div class="adv__productDiscription">
        <p class="adv__productName">${item.name}</p>
        <div class="adv__productPrice">
          <p class="adv__currency">uah</p>
          <p class="adv__price">${item.price}</p>
        </div>
      </div>
      <button class="adv__buyBtn">Buy</button>
          </li>`,
      )
      .join('');
    return markup2;
  };

  const markup3 = `
      </ul>
      <div class="adv__siemaNav">
          <button class="adv__siemaBtn adv__siemaBtn--active"
          data-btnnumber="0"></button>
          <button class="adv__siemaBtn" data-btnnumber="1"></button>
          <button class="adv__siemaBtn" data-btnnumber="2"></button>
          <button class="adv__siemaBtn" data-btnnumber="3"></button>
          <button class="adv__siemaBtn" data-btnnumber="4"></button>
       </div>
    </div>`;

  return markup1 + makeMarkup2() + markup3;
};

export const tabletUpTemplate = (array, numAd) => {
  array.length = numAd;
  const markup1 = `<ul class="adv__adList adv__adList--grid">
      <li class="adv__adItem adv__adItem--grid1">
        <img
          class="adv__adImg"
          src="${array[0].images[0]}"
          alt="${array[0].description}"
        />
        <div class="adv__productDiscription">
          <p class="adv__productName">${array[0].name}</p>
          <div class="adv__productPrice">
            <p class="adv__currency">uah</p>
            <p class="adv__price">${array[0].price}</p>
          </div>
          <button class="adv__buyBtn">Buy</button>
        </div>
      </li>`;

  const shortArr = array.slice(1, array.length);
  const makeMarkup2 = () => {
    const markup2 = shortArr
      .map(
        (item, idx) => ` <li class="adv__adItem adv__adItem--grid${idx + 2}">
  <img
    class="adv__adImg"
    src="${item.images[0]}"
    alt="${item.description}"
  />
  <div class="adv__productDiscription">
    <p class="adv__productName">
    ${item.name}
    </p>
    <div class="adv__productPrice">
      <p class="adv__currency">uah</p>
      <p class="adv__price">${item.price}</p>
    </div>
  </div>
</li>`,
      )
      .join('');
    return markup2;
  };
  const markup3 = `</ul>`;
  return markup1 + makeMarkup2() + markup3;
};

export const renderMarkup = markup => {
  const advBlockRef = document.querySelector('.advBlock');
  advBlockRef.innerHTML = markup;
};

export const getCurrentSize = () => {
  let currentSize = '';

  switch (true) {
    case window.innerWidth < 768:
      currentSize = 'sizeMobile';
      break;

    case window.innerWidth > 767 && window.innerWidth < 1200:
      currentSize = 'sizeTablet';
      break;

    default:
      currentSize = 'sizeDesktop';
  }

  return currentSize;
};
