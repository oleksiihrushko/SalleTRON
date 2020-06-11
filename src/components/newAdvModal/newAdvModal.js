import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import apiServices from '../../services/api';
import './stylesForm.scss';

const btnOpenModel = document.querySelector(".header__advertise");
btnOpenModel.addEventListener("click", newOpenModel);
function newOpenModel () {
  
const instance = basicLightbox.create(
  `<button class=new-adv-modal-close-btn></button>
  <div class="new-adv-modal-div">
  <form form action="#" class="new-adv-modal-form" method="post">

        <h2 class="modal-form-title">Create new advertisement</h2> 

        <p class="new-adv-modal-form-name-p">Product Name</p>

        <input
          class="new-adv-modal-form-name"
          type="text"
          name="name"
          required
          placeholder="Product Name"
          minlength="2"
        />
        
        <ul class="ul-img-lable">
          <li><p class="new-adv-modal-form-addimg-p">Photo</p></li>
        </ul>
        
        <p class="new-adv-modal-form-product-descriptions-p">Product description</p>

        <input
        class="new-adv-modal-form-product-descriptions"
        type="text"
        name="name"
        required
        placeholder="Product description"
        minlength="2"
        />

        <p class="new-adv-modal-form-categories-p">Category</p>

        <select name="form-categories" class="new-adv-modal-form-categories">
          <option>electronics</option>
          <option>property</option>
          <option>transport</option>
          <option>job</option>
          <option>services</option>
          <option>sport</option>
          <option>free</option>
          <option>change</option>
        </select>

        <p class="new-adv-modal-form-cash-p">Price</p>

        <input
        class="new-adv-modal-form-cash"
        type="text"
        name="name"
        required
        placeholder="0.00 UAH"
        minlength="1"
        />
         
        <p class="new-adv-modal-form-phone-p">Phone</p>

        <input
          class="new-adv-modal-form-phone"
          type="tel"
          name="phone"
          required
          placeholder="Phone"
          minlength="8"
        />
  
        <div class="new-adv-modal-form-btn-div">
        <button
        class="new-adv-modal-form-btn  buttonHover"
        type="submit"
        >
        Submit
        </button>
        </div>  
  </form>
</div>`
)

instance.show()
let imgMarkup = '';
for (let i = 1; i < 7; i += 1 ) {
imgMarkup += `
<li>
  <input type="file"name="name" class="off-text-input" id="idImg-${i}" data-id="${i}">
  <label data-labelID="${i}" for="idImg-${i}" class="new-adv-modal-form-addimg${i}  new-adv-modal-form-addimg new-adv-modal-form-diseibl-img">
    <img class="import-img import-img-${i}" src="#" alt="" width="75" height="60">
  </label>
</li>`;

}
// console.log(document.querySelector(".ul-img-lable"))
document.querySelector(".ul-img-lable").insertAdjacentHTML('beforeend',imgMarkup);
let img;      
const listImg = document.querySelector(".ul-img-lable");
listImg.addEventListener("click", newLi);
function newLi (e) {
if (e.target.nodeName === "LABEL") {
  const labelID = e.target.dataset.labelid;
  img = document.querySelector(`.import-img-${labelID}`);
  const input= document.querySelector(`#idImg-${labelID}`);
  input.addEventListener("change", nextInput);
  function nextInput () {
    const file = input.files[0],
    reader = new FileReader();
      reader.onload = function () {
        const b64 = reader.result;
        img.src = b64;
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
      }
      input.removeEventListener("change", nextInput); 
  }
 }
}

const prodNameOff = document.querySelector(".new-adv-modal-form-name");
const prodDescriptOff = document.querySelector(".new-adv-modal-form-product-descriptions");
const prodPhoneOff = document.querySelector(".new-adv-modal-form-phone");
const placeholderOFF = () => {
    if (window.innerWidth > 768) {
        prodNameOff.setAttribute("placeholder", "");
        prodDescriptOff.setAttribute("placeholder", "");
        prodPhoneOff.setAttribute("placeholder", "");
        return;
      }
}

placeholderOFF();
let downImgNumber = {number : 0};
const detectImg = (e) => {
downImgNumber = Number(e.target.dataset.id);
if (Number(e.target.dataset.id) === listImg.children.length - 1) return; 
listImg.children[downImgNumber + 1].children[1].classList.remove("new-adv-modal-form-diseibl-img");
listImg.children[downImgNumber + 1].children[1].classList.add("new-adv-modal-form-addimg-plus");
}
listImg.addEventListener("change", detectImg);


const checkForm = document.querySelector(".new-adv-modal-form");
const inputName = document.querySelector(".new-adv-modal-form-name");
const inputDescriptions = document.querySelector(".new-adv-modal-form-product-descriptions");
const inputCategories = document.querySelector(".new-adv-modal-form-categories");
const inputPrice = document.querySelector(".new-adv-modal-form-cash");
const inputPhone = document.querySelector(".new-adv-modal-form-phone");
const img1 = document.querySelector(".import-img-1");
const img2 = document.querySelector(".import-img-2");
const img3 = document.querySelector(".import-img-3");
const img4 = document.querySelector(".import-img-4");
const img5 = document.querySelector(".import-img-5");
const img6 = document.querySelector(".import-img-6");
// submitBtnAdv.addEventListener('click',checkValue);
checkForm.addEventListener('submit', checkValue);
// console.log(checkForm)

const submitBtn = {
  // name : null,
  // description : null,
  // categories : null,
  // price : null,
  // phone : null,
  // img1 : null,
  // img2 : null,
  // img3 : null,
  // img4 : null,
  // img5 : null,
  // img6 : null, 
  categories: '',
  description: '',
  images: [],
  name: '',
  price: 0,
}
// console.log(submitBtn);
function checkValue (e) {
  e.preventDefault();
  const valueForm = e.currentTarget.elements;
  submitBtn.name = inputName.value;
  submitBtn.description = inputDescriptions.value;
  submitBtn.categories = inputCategories.value;
  submitBtn.price = inputPrice.value;
  // submitBtn.phone = inputPhone.value;
  submitBtn.images = [img1.getAttribute("src"), img2.getAttribute("src"), img3.getAttribute("src"),
  img4.getAttribute("src"), img5.getAttribute("src"), img6.getAttribute("src")];
  // submitBtn.img2 = [img1.getAttribute("src")];
  // submitBtn.img3 = img3.getAttribute("src");
  // submitBtn.img4 = img4.getAttribute("src");
  // submitBtn.img5 = img5.getAttribute("src");
  // submitBtn.img6 = img6.getAttribute("src");
  apiServices.addProduct(submitBtn);
  // console.log(e.currentTarget)
  e.currentTarget.reset();
  closeModalHandler(e);
}

const submitBtnAdv = document.querySelector(".new-adv-modal-form-btn")
submitBtnAdv.addEventListener('click', closeModalHandler);
const closeBtn = document.querySelector('.new-adv-modal-close-btn');
closeBtn.addEventListener('click', closeModalHandler);
window.addEventListener('keydown', closeModalHandler);

function closeModalHandler(e) {
  (e.code === 'Escape' || e.target === closeBtn || (e.target === submitBtnAdv && 
    inputName.validity.valid === true && inputDescriptions.validity.valid === true
    && inputPrice.validity.valid === true && inputPhone.validity.valid === true)) && instance.close();
  // (e.target === submitBtnAdv && submitBtnAdv ===)

}
// inputName.validity.valid === true
// inputDescriptions.validity.valid === true
// inputPrice.validity.valid === true
// inputPhone.validity.valid === true
}

// function  checkValueValid()  {
//   inputV1 = document.querySelector(".new-adv-modal-form-name");
//   inputV2 = document.querySelector(".new-adv-modal-form-product-descriptions");
//   inputV3 = document.querySelector(".new-adv-modal-form-cash");
//   inputV4 = document.querySelector(".new-adv-modal-form-phone");
//   if(inputV1 === (inputV1.e)
 

// }
// console.log(111)