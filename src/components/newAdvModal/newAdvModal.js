import './stylesForm.scss';
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
  <input type="file"name="name" class="off-text-input" id='idImg-${i}'>
  <label data-labelID="${i}" for="idImg-${i}" class="new-adv-modal-form-addimg${i}  new-adv-modal-form-addimg">
    <img class="import-img import-img-${i}" src="#" alt="" width="75" height="60">
  </label>
</li>`;

}

document.querySelector(".ul-img-lable").insertAdjacentHTML('beforeend',imgMarkup)
let img;      
const listImg = document.querySelector(".ul-img-lable");
listImg.addEventListener("click", newLi);
function newLi (e) {
// console.log(e.target.nodeName);
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
        // console.log(img);
        img.src = b64;
        // console.log(b64);
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

const onAdvInit = () => {
    if (window.innerWidth > 768) {
        const prodNameOff = document.querySelector(".new-adv-modal-form-name");
        prodNameOff.setAttribute("placeholder", "");

        const prodDescriptOff = document.querySelector(".new-adv-modal-form-product-descriptions");
        prodDescriptOff.setAttribute("placeholder", "");

        // const priceOff = document.querySelector(".new-adv-modal-form-cash");
        // priceOff.setAttribute("placeholder", "");

        // const phoneOff = document.querySelector(".new-adv-modal-form-phone");
        // phoneOff.setAttribute("placeholder", "");
        return;
      }
}
onAdvInit();
