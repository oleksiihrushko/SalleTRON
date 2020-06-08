import './siema.min.js';

export const advSlider = () => {
  const siemaControlRef = document.querySelector('.adv__siemaNav');

  const advSiema = new Siema({
    selector: '.adv__adList.siema',
    duration: 200,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    multipleDrag: true,
    threshold: 20,
    loop: true,
    rtl: false,
    onInit: () => {},
    onChange: () => {
      const siemaBtnActiveRef = siemaControlRef.querySelector(
        '.adv__siemaBtn--active',
      );
      const siemaBtnRef = siemaControlRef.querySelectorAll('.adv__siemaBtn');
      siemaBtnActiveRef.classList.remove('adv__siemaBtn--active');
      siemaBtnRef[advSiema.currentSlide].classList.add('adv__siemaBtn--active');
    },
  });

  const sliderFlip = e => {
    if (e.target.nodeName !== 'BUTTON') return;
    const btnNum = Number(e.target.dataset.btnnumber);
    advSiema.goTo(btnNum);
  };

  siemaControlRef.addEventListener('click', sliderFlip);
};
