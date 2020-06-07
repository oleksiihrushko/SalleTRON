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
// [x] rerender at breakpoints
// [x] debounce
// [x] data on rerender at breakpoints
// [] random request
// [] item card
// [] beautify

import { advSlider } from './siema';
import { adChange } from './adChanger';
import apiServices from '../../../services/api';
import { renderServices, resizeService } from './services';
import '../adv.scss';

const onAdvInit = () => {
  if (window.innerWidth < 768) {
    resizeService.currentSize = resizeService.mobile;
    apiServices.getProducts().then(data => {
      renderServices.recordAllGoods(data);
      renderServices.renderMarkup(
        renderServices.getMobileTemplate(renderServices.mobileElemNum),
      );
      window.addEventListener(
        'resize',
        resizeService.getDebouncedOnResize(data),
      );
      advSlider();
      adChange();
    });
    return;
  }

  if (window.innerWidth > 767 && window.innerWidth < 1200) {
    resizeService.currentSize = resizeService.tablet;
    apiServices.getProducts().then(data => {
      renderServices.recordAllGoods(data);
      renderServices.renderMarkup(
        renderServices.getTabletUpTemplate(renderServices.tabletElemNum),
      );
      window.addEventListener(
        'resize',
        resizeService.getDebouncedOnResize(data),
      );
      adChange();
    });
    return;
  }

  // console.log(333);
  resizeService.currentSize = resizeService.desktop;
  apiServices.getProducts().then(data => {
    renderServices.recordAllGoods(data);
    renderServices.renderMarkup(
      renderServices.getTabletUpTemplate(renderServices.desktopElemNum),
    );
    window.addEventListener('resize', resizeService.getDebouncedOnResize(data));
    adChange();
  });
};

onAdvInit();
