import { renderServices } from './services';

export const adChange = () => {
  setInterval(() => {
    const numElemOut =
      Math.ceil(Math.random() * renderServices.currentGoods.length) - 1;
    console.log('1 numOut', numElemOut);

    const numElemIn =
      Math.ceil(Math.random() * renderServices.allGoods.length) - 1;
    // console.log('2 numIn', numElemIn);

    // let numElemIn;
    // let isPair = true;
    // while (isPair) {
    //   numElemIn =
    //     Math.ceil(Math.random() * renderServices.allGoods.length) - 1;
    //   if (
    //     renderServices.currentGoods.find(
    //       item => item.id === renderServices.allGoods[numElemIn].id,
    //     ) === undefined
    //   ) {
    //     renderServices.elemIn = renderServices.allGoods[numElemIn];
    //     isPair = !isPair;
    //     // console.log(renderServices.elemIn.id);
    //     // console.log(renderServices.currentGoods);
    //     // console.log(isPair);
    //   }
    // }

    renderServices.currentGoods.splice(
      numElemOut,
      1,
      renderServices.allGoods[numElemIn],
    );
    // console.log(numElemOut);
    // console.dir(advList.children);
    const newAdElem = document.querySelector(`.elem${numElemOut}`);
    // console.log('3 newElem', newAdElem);
    const newAdElemImg = newAdElem.querySelector('.adv__adImg');
    const newAdElemName = newAdElem.querySelector('.adv__productName');
    const newAdElemPrice = newAdElem.querySelector('.adv__price');
    newAdElemImg.setAttribute('src', renderServices.allGoods[numElemIn][0]);
    newAdElemName.textContent = renderServices.allGoods[numElemIn].name;
    newAdElemPrice.textContent = renderServices.allGoods[numElemIn].price;
    console.log('4 currentGoods', renderServices.currentGoods);
    // console.log('3 all Length', renderServices.currentGoods.length);
    // console.log('4 current Length', renderServices.allGoods.length);
  }, 5000);
};
