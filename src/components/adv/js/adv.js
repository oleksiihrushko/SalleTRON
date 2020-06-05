//FIXME:
// [x] remove 'container' class from mainPage
// [x] Montserrat for cyrillic fonts
//
// TODO:
// Предназначен для отображения информации о товарах рекламного характера.
// Через определенный интервал времени содержимое одного из блоков обновляется в произвольном (случайном) порядке.
// Категории из которыx происходит выбор товаров тоже случайные.
//
// [x] mobile first make slider Siema
// [x] mobile first make markup
//      number of elements in slider 5
//
// [x] random element gets changed within some period of time
// [x] get api database
// [] rerender at breakpoints
// [] random
// [] beautify

import { advSlider } from './siema';
import {
  renderMarkup,
  mobileTemplate,
  tabletUpTemplate,
  getCurrentSize,
} from './services';
import { adChange } from './adChanger';
import '../adv.scss';
import apiServices from '../../../services/api';

const onAdvInit = () => {
  let currentSize = '';

  const onResize = data => {
    console.log('onres', currentSize);
    console.log(data);
    const newSize = getCurrentSize();
    console.log('new', newSize);
    if (currentSize === newSize) return;

    if (window.innerWidth < 768) {
      renderMarkup(mobileTemplate(data, 5));
      advSlider();
      currentSize = 'sizeMobile';
      return currentSize;
    }

    if (window.innerWidth > 767 && window.innerWidth < 1200) {
      renderMarkup(tabletUpTemplate(data, 3));
      currentSize = 'sizeTablet';
      return currentSize;
    }

    renderMarkup(tabletUpTemplate(data, 6));
    currentSize = 'sizeDesktop';
    return currentSize;
  };

  if (window.innerWidth < 768) {
    apiServices.getProducts().then(data => {
      let currentSize = 'sizeMobile';
      window.addEventListener('resize', () => onResize(data)); //FIXME:
      renderMarkup(mobileTemplate(data, 5));
      advSlider();
    });
    // adChange();
    return;
  }

  if (window.innerWidth > 767 && window.innerWidth < 1280) {
    apiServices.getProducts().then(data => {
      let currentSize = 'sizeTablet';
      window.addEventListener('resize', () => onResize(data)); //FIXME:
      renderMarkup(tabletUpTemplate(data, 3));
    });
    // adChange();
    return;
  }

  apiServices.getProducts().then(data => {
    let currentSize = 'sizeDesktop';
    window.addEventListener('resize', () => onResize(data)); //FIXME:
    renderMarkup(tabletUpTemplate(data, 6));
    // adChange();
  });
};

onAdvInit();
