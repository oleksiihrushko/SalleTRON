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
    name : null,
    description : null,
    categories : null,
    price : null,
    phone : null,
    img1 : null,
    img2 : null,
    img3 : null,
    img4 : null,
    img5 : null,
    img6 : null, 
}

function checkValue (e) {
    e.preventDefault();
    const valueForm = e.currentTarget.elements;
    // console.dir(valueForm);
    // console.log(valueForm);
    submitBtn.name = inputName.value;
    submitBtn.description = inputDescriptions.value;
    submitBtn.categories = inputCategories.value;
    submitBtn.price = inputPrice.value;
    submitBtn.phone = inputPhone.value;
    submitBtn.img1 = img1.getAttribute("src");
    submitBtn.img2 = img2.getAttribute("src");
    submitBtn.img3 = img3.getAttribute("src");
    submitBtn.img4 = img4.getAttribute("src");
    submitBtn.img5 = img5.getAttribute("src");
    submitBtn.img6 = img6.getAttribute("src");
}
//console.log(submitBtn)

// addProduct(submitBtn) {
//     if (!this.isAuth()) return;

//     try {
//       axios.post(/products/${submitBtn.categories}.json?auth=${getToken()}, {
//         ...submitBtn
//       });
//     } catch (error) {
//       console.log(error);
//       return;
//     }
//   },
