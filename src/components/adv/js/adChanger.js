import { renderServices } from './services';

export const adChange = () => {
  setInterval(() => {
    const numElemOut =
      Math.ceil(Math.random() * renderServices.currentGoods.length) - 1;

    let numElemIn;
    let isPair = true;
    while (isPair) {
      numElemIn = Math.ceil(Math.random() * renderServices.allGoods.length) - 1;
      const isFound = renderServices.currentGoods.find(
        item => item.id === renderServices.allGoods[numElemIn].id,
      );
      if (isFound === undefined) {
        renderServices.elemIn = renderServices.allGoods[numElemIn];
        isPair = !isPair;
      }
    }

    renderServices.currentGoods.splice(
      numElemOut,
      1,
      renderServices.allGoods[numElemIn],
    );
    const newAdElem = document.querySelector(`.elem${numElemOut}`);
    const newAdElemImg = newAdElem.querySelector('.adv__adImg');
    const newAdElemName = newAdElem.querySelector('.adv__productName');
    const newAdElemPrice = newAdElem.querySelector('.adv__price');
    newAdElemImg.setAttribute(
      'src',
      renderServices.allGoods[numElemIn].images[0],
    );
    newAdElemName.textContent = renderServices.allGoods[numElemIn].name;
    newAdElemPrice.textContent = renderServices.allGoods[numElemIn].price;
  }, 10000);
};
