import './stylesForm.scss';


// function previewFile() {

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
// console.log(imgMarkup)
      
document.querySelector(".ul-img-lable").insertAdjacentHTML('beforeend',imgMarkup)
let img;      
//const input = document.querySelector("#idImg-1");
const listImg = document.querySelector(".ul-img-lable");
listImg.addEventListener("click", newLi);
function newLi (e) {
console.log(e.target.nodeName);
if (e.target.nodeName === "LABEL") {
  const labelID = e.target.dataset.labelid;
  img = document.querySelector(`.import-img-${labelID}`);
  const input= document.querySelector(`#idImg-${labelID}`);
  input.addEventListener("change", input222);
  function input222 () {
    const file = input.files[0],
    reader = new FileReader();
  
      reader.onload = function () {
        const b64 = reader.result;
        console.log(img);
        img.src = b64;
        console.log(b64);
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
      }
      input.removeEventListener("change", input222); 
  }
  // console.log(img);
  // const file = input.files[0],
  // reader = new FileReader();

  //   reader.onload = function () {
  //     const b64 = reader.result;
  //     console.log(img);
  //     img.src = b64;
  //     console.log(b64);
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   } else {
  //     preview.src = "";
  //   }
 // reader.readAsDataURL(file);
 }
}

// const input = document.querySelector(".off-text-input");
// // console.log(input);
// const rider = function () {
//   // const importImg = document.querySelector(".ul-img-lable");
// input.onchange = function () {
//     const file = input.files[0],
//     reader = new FileReader();

//       reader.onload = function () {
//         const b64 = reader.result;
//         console.log(img);
//         img.src = b64;
//         console.log(b64);
//       };
//     reader.readAsDataURL(file);
//   };
// }

// rider()
//       // input.onchange = function () {
      //   const file = input.files[0],
      //     reader = new FileReader();
      
      //   reader.onload = function () {
      //     const b64 = reader.result;
      //     importImg.src = b64;
      //     console.log(b64);
      //   };
      //   reader.readAsDataURL(file);
      // };
