import { loginWithGoogle, loginWithFB } from "./authServises";
import showModal from "../AuthForm/authOpenModal";

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
 }