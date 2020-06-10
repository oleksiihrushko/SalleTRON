import axios from 'axios';
import basketMarkup from './basket.hbs';
import openItemModal from '../ItemModal/ItemModal';
import './basket.scss';

const refs = {
  basketModal: document.querySelector('.basketModal'),
  basket: document.querySelector('.basket'),
  input: document.querySelector('input[name="itemById"]'),
  button: document.querySelector('.buyButton'),
  show: document.querySelector('.show'),
  total: document.querySelector('.basket__total'),
  clear: document.querySelector('.basket__clear'),
  cart: document.querySelector('.buttonCart'),
};

async function getProduct(e) {
  // const response = await axios.get(
  //   `https://salletron.firebaseio.com/products/change/-M8zgqzxq0ZHiAo3xxzY.json`,
  // );

  if (e.target.className === 'modal__buyItem') {
    const parentRef = e.target.parentNode.parentNode;
    const itemImage = parentRef.children[0].children[0].children[0].currentSrc;
    const itemName = parentRef.children[1].children[1].textContent;
    const itemPrice = parentRef.children[1].children[3].textContent;
    let check = 0;

    refs.basket.children.forEach(element => {
      if (
        element.nodeName === 'DIV' &&
        element.children[1].textContent === itemName
      ) {
        element.children[2].children[1].textContent =
          Number(element.children[2].children[1].textContent) + 1;

        refs.total.textContent =
          Number(refs.total.textContent) + parseInt(itemPrice);
        check = 1;
        return;
      }
    });

    if (check === 1) return;

    const data = {
      itemName,
      itemImage,
      itemPrice,
    };

    refs.basket.insertAdjacentHTML('afterbegin', basketMarkup(data));

    refs.removeProduct = document.querySelector('.basket__itemDelete');
    refs.removeProduct.addEventListener('click', removeProduct);

    refs.productQuantity = document.querySelector('.item__quantity');
    refs.productIncrement = document.querySelector('.increment');
    refs.productDecrement = document.querySelector('.decrement');

    refs.productIncrement.addEventListener('click', changeQuantity);
    refs.productDecrement.addEventListener('click', changeQuantity);

    refs.total.textContent =
      Number(refs.total.textContent) + parseInt(data.itemPrice);
  }
}

function removeProduct(e) {
  e.target.parentNode.remove();

  const productQuantity =
    e.target.parentNode.children[2].children[1].textContent;
  const productPrice = parseInt(e.target.parentNode.children[3].textContent);
  refs.total.textContent =
    Number(refs.total.textContent) - productPrice * Number(productQuantity);

  if (refs.basket.children.length === 2) closeBasket();
}

function changeQuantity(e) {
  const productQuantity = e.target.parentNode.children[1];
  const productPrice = parseInt(
    e.target.parentNode.parentNode.children[3].textContent,
  );

  if (e.target.className === 'increment') {
    productQuantity.textContent = Number(productQuantity.textContent) + 1;
    refs.total.textContent = Number(refs.total.textContent) + productPrice;
    return;
  } else if (
    e.target.className === 'decrement' &&
    Number(productQuantity.textContent) > 1
  ) {
    productQuantity.textContent = Number(productQuantity.textContent) - 1;
    refs.total.textContent = Number(refs.total.textContent) - productPrice;
  }
}

function clearBasket() {
  while (refs.basket.firstChild.nodeName === 'DIV') {
    refs.basket.firstChild.remove();
  }
  refs.total.textContent = 0;
  closeBasket();
}

function openBasket() {
  if (refs.basket.children.length === 2) {
    alert('basket is empty');
    return;
  }
  refs.basket.parentElement.classList.add('basketModal-show');
  refs.basketModal.addEventListener('click', closeBasket);
  document.addEventListener('keydown', closeBasket);
}

function closeBasket(e) {
  if (
    refs.basket.children.length === 2 ||
    e.target === e.currentTarget ||
    e.code === 'Escape'
  ) {
    refs.basket.parentElement.classList.remove('basketModal-show');
    refs.basketModal.removeEventListener('click', closeBasket);
    document.removeEventListener('keydown', closeBasket);
  }
}

document.addEventListener('click', getProduct);
refs.cart.addEventListener('click', openBasket);

refs.clear.addEventListener('click', clearBasket);
