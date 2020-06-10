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
