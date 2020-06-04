import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.css';
import Glide from '@glidejs/glide';

const glide = new Glide('.glide', {
  type: 'carousel',
  perView: 4,
  dots: '#dots',
  breakpoints: {
    1280: {
      perView: 2,
    },
    767: {
      perView: 1,
    },
  },
});

glide.mount();
