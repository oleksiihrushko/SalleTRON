import './styles.scss';
import axios from 'axios';
import { addToLocalStorage, logErrors, hideMenue, logOut } from './services';
import { stateOfAuth } from './refs';
import apiServices from '../../services/api';

logOut();
hideMenue();
// =======================DATA=======================
// export const firebaseConfig = {
//   apiKey: 'AIzaSyDM4b8GRIsIe7_30Fx8kj3A7uV0dBkEs-o',
//   authDomain: 'salletronbase.firebaseapp.com',
//   databaseURL: 'https://salletronbase.firebaseio.com',
//   projectId: 'salletronbase',
//   storageBucket: 'salletronbase.appspot.com',
//   messagingSenderId: '555686357871',
//   appId: '1:555686357871:web:7845e33c12341a4949969a',
// };
export const firebaseConfig = {
  /////////////////// salletron2
  apiKey: 'AIzaSyAF75bnc1myWaxBxlXxIhwbzEq3lTQjjms',
  authDomain: 'salletronbase2.firebaseapp.com',
  databaseURL: 'https://salletronbase2.firebaseio.com',
  projectId: 'salletronbase2',
  storageBucket: 'salletronbase2.appspot.com',
  messagingSenderId: '361358250407',
  appId: '1:361358250407:web:bf32d6d4972f46156ee682',
};
//=======================user========================
const user = {
  email: '',
  password: '',
};
export const userLoginHandler = e => (user[e.target.name] = e.target.value);

const resetUserData = e => {
  user.email = '';
  user.password = '';
};
//===========/user==============

//===========API==============
const fetch = async action => {
  const errorPassword = document.querySelector('.errorPassword');
  const errorEmail = document.querySelector('.errorEmail');
  try {
    const result = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:${action}?key=${firebaseConfig.apiKey}`,
      { ...user, returnSecureToken: true },
    );

    if (result.status === 200) {
      console.log(result);
      stateOfAuth.instance.close();
      stateOfAuth.isUserAuthenticated = true;
      addToLocalStorage(token, userID);
    }

    const token = result.data.idToken;
    const userID = result.data.localId;

    hideMenue();
  } catch (error) {
    logErrors(error);
    switch (error.response.data.error.message) {
      case 'INVALID_PASSWORD':
        errorPassword.textContent = 'Wrong password';
        break;
      case 'EMAIL_NOT_FOUND':
        errorEmail.textContent = 'User not found';
        break;
      case 'EMAIL_EXISTS':
        errorEmail.textContent = 'User already exist';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorEmail.textContent =
          'Too many unsuccessful login attempts. Please try again later.';
        break;

      default:
        break;
    }
  }
};
//===========/API==============
const submitData = async () => {
  // fetch('signUp');
  const result = await apiServices.signUpUser(user);

  if (result.statusCheck.status === 200) {
    console.log(result);
    stateOfAuth.instance.close();
    stateOfAuth.isUserAuthenticated = true;
    // addToLocalStorage(token, userID);
  }
  resetUserData();
  hideMenue();
};
const checkData = async () => {
  // apiServices.signInUser(user)
  const result = await apiServices.signInUser(user);

  if (result.statusCheck.status === 200) {
    console.log(result);
    stateOfAuth.instance.close();
    stateOfAuth.isUserAuthenticated = true;
    // addToLocalStorage(token, userID);
  }
  // fetch('signInWithPassword');
  resetUserData();
  hideMenue();
};

export function submitForm(e) {
  e.preventDefault();
  switch (e.submitter.classList[0]) {
    case 'login':
      checkData();
      break;
    case 'registration':
      submitData();

      break;
  }
}

// ===============================================================
// console.log(localStorage.getItem('user'));
// const checkStorage = localStorage.getItem('user');
// console.log(checkStorage);
