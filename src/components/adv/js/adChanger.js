export const adChange = () => {
  setInterval(() => {
    const advList = document.querySelector('.adv__adList');
    const randomAd = Math.round(Math.random() * (advList.children.length - 1));
    const newAdElem = advList.children[randomAd];
    const newAdElemImg = newAdElem.querySelector('.adv__adImg');
    const newAdElemName = newAdElem.querySelector('.adv__productName');
    const newAdElemPrice = newAdElem.querySelector('.adv__productPrice');
    newAdElemImg.setAttribute('src', `./components/adv/hero img/2.jpg`);
    newAdElemName.textContent = `New Name`;
    newAdElemPrice.textContent = `999`;
  }, 5000);
};
