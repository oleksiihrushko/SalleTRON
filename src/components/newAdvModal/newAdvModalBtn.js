import './stylesForm.scss';
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
checkForm.addEventListener('submit', checkValue);

const submitBtn = {
    name : "",
    description : "",
    categories : "",
    price : "",
    phone : "",
    img1 : "",
    img2 : "",
    img3 : "",
    img4 : "",
    img5 : "",
    img6 : "", 
}
 //console.log(submitBtn)

function checkValue (e) {
    e.preventDefault();
    const valueForm = e.currentTarget.elements;
    console.dir(valueForm)
    console.log(inputName.value)
    console.log(inputDescriptions.value)
    console.log(inputCategories.value)
    console.log(inputPrice.value)
    console.log(inputPhone.value)
    console.log(img1.value)
    console.log(img2.value)
    console.log(img3.value)
    console.log(img4.value)
    console.log(img5.value)
    console.log(valueForm)

}