import { submitForm, userLoginHandler } from './authServises';
import { loginWithGoogle, loginWithFB } from './loginWithSocials';

export function addButtonListeners() {
  const refs = {
    authForm: document.forms.authForm,

    login: document.querySelector('.login'),
    registration: document.querySelector('.registration'),

    googleBtn: document.querySelector('.googleBtn'),
    facebookBtn: document.querySelector('.facebookBtn'),
  };
  refs.googleBtn.addEventListener('click', loginWithGoogle);
  refs.facebookBtn.addEventListener('click', loginWithFB);

  refs.authForm.addEventListener('submit', submitForm);
  refs.authForm.addEventListener('input', userLoginHandler);
}


export const stateOfAuth = {
  isUserAuthenticated : false,
  instance: null,
}
// const checkStorage = localStorage.getItem('user');
// console.log(checkStorage);
// if (localStorage.getItem('user')) {
//   console.log(localStorage.getItem('user'));
// }


export function closeWindowOnLogin(instance) {
  stateOfAuth.instance = instance;
}

// export function closeWindowOnLogin(instance) {
//   console.log(instance);
//   const closeModal = () => instance.close();
//   // console.log(closeModal());
//   // console.log(token);
//   // if (checkStorage) {
//     // console.log(checkStorage);
//     // const    authForm = document.forms.authForm;

//     // authForm.addEventListener('submit', closeModal);
//     // closeModal();
//   // }
// }

// {
// import { submitForm, userLoginHandler } from './authServises';
// import { loginWithGoogle, loginWithFB } from './loginWithSocials';
// import { checkStorage } from './services';

// export function addButtonListeners(instance, token) {
//   const refs = {
//     authForm: document.forms.authForm,

//     login: document.querySelector('.login'),
//     registration: document.querySelector('.registration'),

//     googleBtn: document.querySelector('.googleBtn'),
//     facebookBtn: document.querySelector('.facebookBtn'),
//   };
//   refs.googleBtn.addEventListener('click', loginWithGoogle);
//   refs.facebookBtn.addEventListener('click', loginWithFB);

//   refs.authForm.addEventListener('submit', submitForm);
//   refs.authForm.addEventListener('input', userLoginHandler);

//   const checkStorage = localStorage.getItem('user');
//   console.log(checkStorage);

//   // const closeModal = () => instance.close();
//   // console.log(closeModal());
//   // console.log(token);
//   // if (checkStorage) {
//   // // console.log(checkStorage);

//   // }
//   //  (checkStorage) && refs.authForm.addEventListener('submit', closeModal);
// }

// // export const closeModalWin = (token)=>{
// //   console.log(token);

// // }
