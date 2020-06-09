import './stylesForm.scss';

// import * as basicLightbox from 'basiclightbox';
  //=======================================
  // const onAdvInit = () => {
    //   if (window.innerWidth < 768) {
      //     advMobile();
      //     return;
      //   }
      //======================================
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

document.querySelector(".ul-img-lable").insertAdjacentHTML('beforeend',imgMarkup)
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
const placeholderOFF = () => {
    if (window.innerWidth > 768) {
        prodNameOff.setAttribute("placeholder", "");
        prodDescriptOff.setAttribute("placeholder", "");
        return;
      }
}
placeholderOFF();


