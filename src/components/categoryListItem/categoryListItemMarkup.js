const markup = {
  getItemMarkup(product) {
    return `
                <li class="category__list-item glide__slide">
                    <div class='category__list-item-img-wrapper'>
                        <img class = "category__list-item-img"
                        src = "${product.images[0]}"
                        alt = "item" data-id=${product.id}>
                    </div>
                    <div class="category__list-item-info">
                        <p class = "category__list-item-name"
                        data-id=${product.id}>
                            ${product.name}
                        </p>
                        <p class = "category__list-item-price" data-id=${product.id}>
                            ${product.price}
                            <span class="category__list-item-price-suffix">&#8372;</span>
                        </p>
                    </div>
                </li>
  `;
  },

  mainMarkup(category) {
    return `
    <div class = "category container">
      <div class='replacableContainer' data-replace=${category}></div> 
    </div>
    `;
  },

  withoutSlider(category) {
    return `
          <h3 class='category__name'>${capitalize(`${category}`)}</h3>
          <button class="category__btn category__btn-see-less" data-btnseeless=${category}>See less</button>
          <div class='category__content' data-content=${category}></div>
          <button class='button loadMoreBtn' data-loadmore=${category} id='call-to-action'>
              <span class='loadMoreBtnText'>Click for magic</span>
          </button>
    `;
  },

  withSlider(category, itemMarkup, categoryItems) {
    return `
        <h3 class='category__name'>${capitalize(`${category}`)}</h3>
        <button class="category__btn category__btn-see-all" data-btnseeall=${category}>See all</button>
        <div class="glide" data-glide=${category}>
          <div data-glide-el="track" class="glide__track">
              <div class="category__list glide__slides" data-category=${category}>
              ${itemMarkup}
              </div>
          </div>
          <div class="glide__arrows" data-glide-el="controls">
              <button button class = "glide__arrow glide__arrow--left prev" data-glide-dir="<">
                  <svg class="svg-arrow" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background: new 0 0 477.175 477.175;" xml:space="preserve"> 
                      <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225 c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
                  </svg>
              </button>
              <button button class = "glide__arrow glide__arrow--right next" data-glide-dir=">">
                  <svg class="svg-arrow" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background: new 0 0 477.175 477.175;" xml:space="preserve">
                      <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z" />
                  </svg>
              </button>
          </div>
          <div class="glide__bullets" data-glide-el="controls[nav]">
              ${categoryItems
        .map(
          (item, idx) =>
            `<button class="glide__bullet"data-glide-dir="=${idx}"></button>`,
        )
        .join('')}
          </div> 
        </div>
  
  `;
  },
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default markup;
