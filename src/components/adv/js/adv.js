import { advSlider } from './siema';
import { adChange } from './adChanger';
import apiServices from '../../../services/api';
import { renderServices, resizeService } from './services';
import '../adv.scss';

const onAdvInit = () => {
  if (window.innerWidth < 768) {
    resizeService.currentSize = resizeService.mobile;

    const data = apiServices.productsArr;

    renderServices.recordAllGoods(data);
    renderServices.renderMarkup(
      renderServices.getMobileTemplate(renderServices.mobileElemNum),
    );
    window.addEventListener('resize', resizeService.getDebouncedOnResize(data));
    advSlider();
    adChange();
    return;
  }

  if (window.innerWidth > 767 && window.innerWidth < 1200) {
    resizeService.currentSize = resizeService.tablet;

    const data = apiServices.productsArr;

    renderServices.recordAllGoods(data);
    renderServices.renderMarkup(
      renderServices.getTabletUpTemplate(renderServices.tabletElemNum),
    );
    window.addEventListener('resize', resizeService.getDebouncedOnResize(data));
    adChange();
    return;
  }

  resizeService.currentSize = resizeService.desktop;

  const data = apiServices.productsArr;

  renderServices.recordAllGoods(data);
  renderServices.renderMarkup(
    renderServices.getTabletUpTemplate(renderServices.desktopElemNum),
  );
  window.addEventListener('resize', resizeService.getDebouncedOnResize(data));
  adChange();
};

export default onAdvInit;
