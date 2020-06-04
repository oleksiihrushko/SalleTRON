import itemCard from '../categoryListItem/itemCard.hbs'

const products = [{
  categories: 'sport',
  description: 'lorem ipsum dolor',
  // images: [''],
  name: 'Product',
  price: 100,
}, {
  categories: 'sport',
  description: 'lorem ipsum dolor',
  //   images: [''],
  name: 'Product',
  price: 100,
}, {
  categories: 'sport',
  description: 'lorem ipsum dolor',
  //   images: [''],
  name: 'Product',
  price: 100,
}]

// ${itemCard(products)}

export function categoryListItemMarkup(products) {

  const markup = document.querySelector('.categoryList').append(itemCard(products));
  console.log(markup);
}
categoryListItemMarkup();

console.log('hello');
