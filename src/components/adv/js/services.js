import { advSlider } from './siema';
import { debounce } from 'lodash';

export const renderServices = {
  allGoods: [],
  currentGoods: [],
  elemIn: {},
  mobileElemNum: 5,
  tabletElemNum: 3,
  desktopElemNum: 6,

  recordAllGoods(array) {
    this.allGoods = [...array];
  },

  checkElem(num) {
    // console.log('before check', this.currentGoods);
    // console.log('before check', num);

    if (this.currentGoods.length === 0) {
      let i = 0;
      // console.log(num);
      while (i < num) {
        let numElemIn = Math.ceil(Math.random() * this.allGoods.length) - 1;
        // console.log(this.allGoods);
        // console.log(random);
        // console.log(this.allGoods[random].categories);
        // console.log(this.currentGoods);
        if (
          this.currentGoods.find(
            item => item.categories === this.allGoods[numElemIn].categories,
          ) === undefined
        ) {
          this.currentGoods.push(this.allGoods[numElemIn]);
          i += 1;
          // console.log('i', i);
          // console.log('res', this.currentGoods);
        }
      }
      return this.currentGoods;
    }

    if (this.currentGoods.length === num) {
      // console.log('=', this.currentGoods);
      return this.currentGoods;
    }

    if (this.currentGoods.length < num) {
      this.currentGoods = [...this.currentGoods, ...this.allGoods].slice(
        0,
        num,
      );
      // console.log('<', this.currentGoods);
      return this.currentGoods;
    }

    if (this.currentGoods.length > num) {
      this.currentGoods = this.currentGoods.slice(0, num);
      // console.log('>', this.currentGoods);
      return this.currentGoods;
    }
  },

  getMobileTemplate(num) {
    const array = this.checkElem(num);
    console.log('elemInTemp', array);

    const markup1 = `<div class="adv__slider">
    <ul class="adv__adList siema">`;

    const makeMarkup2 = () => {
      const markup2 = array
        .map(
          (item, idx) => `<li class="adv__adItem elem${idx}">
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
  },

  getTabletUpTemplate(num) {
    // console.log('get', num);
    const array = this.checkElem(num);
    // console.log(array);

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
  },

  renderMarkup(markup) {
    const advBlockRef = document.querySelector('.advBlock');
    advBlockRef.innerHTML = markup;
  },
};

export const resizeService = {
  currentSize: '',
  newSize: '',
  mobile: 'sizeMobile',
  tablet: 'sizeTablet',
  desktop: 'sizeDesktop',

  getSize() {
    let size = '';
    switch (true) {
      case window.innerWidth < 768:
        size = this.mobile;
        break;

      case window.innerWidth > 767 && window.innerWidth < 1200:
        size = this.tablet;
        break;

      default:
        size = this.desktop;
    }

    return size;
  },

  onResize(data) {
    // console.log(111);
    const newSize = this.getSize();
    if (this.currentSize === newSize) return;

    if (window.innerWidth < 768) {
      // console.log('< 768');
      renderServices.renderMarkup(
        renderServices.getMobileTemplate(renderServices.mobileElemNum),
      );
      advSlider();
      this.currentSize = this.mobile;
      return this.currentSize;
    }

    if (window.innerWidth > 767 && window.innerWidth < 1200) {
      // console.log('< 1200');
      renderServices.renderMarkup(
        renderServices.getTabletUpTemplate(renderServices.tabletElemNum),
      );
      this.currentSize = this.tablet;
      return this.currentSize;
    }

    // console.log('> 1200');
    renderServices.renderMarkup(
      renderServices.getTabletUpTemplate(renderServices.desktopElemNum),
    );
    this.currentSize = this.desktop;
    return this.currentSize;
  },

  getDebouncedOnResize(data) {
    const debouncedOnResize = debounce(this.onResize.bind(this), 500);
    return () => debouncedOnResize(data);
  },
};
