import axios from 'axios';
import basketMarkup from './basket.hbs';

const refs = {
  basketModal: document.querySelector('.basket'),
  input: document.querySelector('input[name="itemById"]'),
  button: document.querySelector('.buyButton'),
  test: document.querySelector('.test'),
  total: document.querySelector('.basket__total'),
};

async function getProduct() {
  const response = await axios.get(
    `https://salletron.firebaseio.com/products/change/-M8zgqzxq0ZHiAo3xxzY.json`,
  );

  refs.button.insertAdjacentHTML('afterend', basketMarkup(response.data));

  refs.removeProduct = document.querySelector('.basket__itemDelete');
  refs.removeProduct.addEventListener('click', removeProduct);

  refs.productQuantity = document.querySelector('.item__quantity');
  refs.productIncrement = document.querySelector('.increment');
  refs.productDecrement = document.querySelector('.decrement');

  refs.productIncrement.addEventListener('click', changeQuantity);
  refs.productDecrement.addEventListener('click', changeQuantity);

  refs.total.textContent =
    Number(refs.total.textContent) + Number(response.data.price);
}

function removeProduct(e) {
  e.target.parentNode.remove();

  const productQuantity = e.target.parentNode.children[4];
  const productPrice = e.target.parentNode.children[2].textContent;

  refs.total.textContent =
    Number(refs.total.textContent) -
    Number(productPrice) * Number(productQuantity.textContent);
}

function changeQuantity(e) {
  const productQuantity = e.target.parentNode.children[4];
  const productPrice = e.target.parentNode.children[2].textContent;

  if (e.target.className === 'increment') {
    productQuantity.textContent = Number(productQuantity.textContent) + 1;
    refs.total.textContent =
      Number(refs.total.textContent) + Number(productPrice);
    return;
  } else if (
    e.target.className === 'decrement' &&
    Number(productQuantity.textContent) > 1
  ) {
    productQuantity.textContent = Number(productQuantity.textContent) - 1;
    refs.total.textContent =
      Number(refs.total.textContent) - Number(productPrice);
  }
}

refs.button.addEventListener('click', getProduct);
