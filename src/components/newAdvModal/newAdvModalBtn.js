import './stylesForm.scss';
const checkForm = document.querySelector(".new-adv-modal-form");
const inputName = document.querySelector("new-adv-modal-form-name");
const inputDescriptions = document.querySelector(".new-adv-modal-form-product-descriptions");
const inputCategories = document.querySelector(".new-adv-modal-form-categories");
const inputPrice = document.querySelector(".new-adv-modal-form-cash");
const inputPhone = document.querySelector(".new-adv-modal-form-phone");
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
// console.log(submitBtn)

function checkValue (e) {
    e.preventDefault();
    const valueForm = e.currentTarget.elements;
    console.dir(valueForm)
    console.log(inputDescriptions.value)
    // console.log(inputName.value)
    console.log(inputCategories.value)
    console.log(inputPrice.value)
    console.log(inputPhone.value)

}