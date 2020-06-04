import './stylesForm.scss';


// function previewFile() {
//     // var preview = document.querySelector('img');


//     var file    = document.querySelector('input[type=file]').files[0];
//     var reader  = new FileReader();
  
//     reader.onloadend = function () {
//       preview.src = reader.result;
//     }
  
//     if (file) {
//       reader.readAsDataURL(file);
//     } else {
//       preview.src = "";
//     }
//   }

//   const file = document.querySelector('#idImg-1').files[0];
// //   console.dir(file)
// const reader = new FileReader();

// reader.onloadend = function () {
//     const imgText = reader.result;
// }
// if (file) {
//     reader.readAsDataURL(file);
// } else {
//     imgText.src = "";
// }
// console.log(imgText)

const input = document.querySelector("#idImg-1");
const importImg = document.querySelector(".import-img");
console.log(input);
input.onchange = function () {
  const file = input.files[0],
    reader = new FileReader();

  reader.onload = function () {
    const b64 = reader.result;
    importImg.src = b64;
    console.log(b64); //-> "R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs="
  };
  reader.readAsDataURL(file);
};

// const onAdvInit = () => {
//   if (window.innerWidth < 768) {
//     advMobile();
//     return;
//   }