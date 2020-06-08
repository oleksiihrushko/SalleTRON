import './styles.scss';
import axios from 'axios';
import { addToLocalStorage, logErrors, hideMenue, logOut } from './services';

logOut();
hideMenue();
// =======================DATA=======================
export const firebaseConfig = {
  apiKey: 'AIzaSyDM4b8GRIsIe7_30Fx8kj3A7uV0dBkEs-o',
  authDomain: 'salletronbase.firebaseapp.com',
  databaseURL: 'https://salletronbase.firebaseio.com',
  projectId: 'salletronbase',
  storageBucket: 'salletronbase.appspot.com',
  messagingSenderId: '555686357871',
  appId: '1:555686357871:web:7845e33c12341a4949969a',
};
//=======================user========================
const user = {
  email: '',
  password: '',
};
export const userLoginHandler = e => (user[e.target.name] = e.target.value);

const resetUserData = e => {
  // e.currentTarget.reset(); /// возможно ресетит у алины тоже
  user.email = '';
  user.password = '';
};
//===========/user==============

//===========API==============
const fetch = async (action)=>{
    try {
      const result = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${action}?key=${firebaseConfig.apiKey}`,
        { ...user, returnSecureToken: true },
      );
      const token = result.data.idToken;
      const userID = result.data.localId;
      addToLocalStorage(token, userID);
      hideMenue();
      } catch (error) {
      logErrors(error);
    }
  };
//===========/API==============

export const getDataFromInput = () => {
  console.log(111);
  let count = 0;
  document.forms.authForm.addEventListener('input', userLoginHandler);
  document.forms.authForm.addEventListener('click', qwe => {
    count += 1;

    console.log('qwee', count);
  });
};

const submitData = e => {
  // e.preventDefault();
  fetch('signUp')
  resetUserData(e);
};
const checkData = e => {
  // e.preventDefault();
  fetch('signInWithPassword')
  resetUserData(e);
};

const userLogin = () => {
  getDataFromInput();
  authForm.addEventListener('submit', checkData);
};
const userSignUP = () => {
  getDataFromInput();
  authForm.addEventListener('submit', submitData);
};

export function submitForm(e) {
  e.preventDefault();
  switch (e.submitter.classList[0]) {
    case 'login':
      console.log('login presed');
      userLogin();
      break;
    case 'registration':
      console.log('registration presed');
      userSignUP();
      break;
  }
}


// ===============================================================

// const authWithEmailAndPassword = async () => {
//   try {
//     const result = await axios.post(
//       `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
//       { ...user, returnSecureToken: true },
//     );
//     const token = result.data.idToken;
//     const userID = result.data.localId;
//     addToLocalStorage(token, userID);
//     hideMenue();
//     //  (response.status === 200 ) && alert('Registration successfully completed');
//   } catch (error) {
//     logErrors(error);
//   }
// };
// const signInWithPassword = async () => {
//   try {
//     const result = await axios.post(
//       `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
//       { ...user, returnSecureToken: true },
//     );
//     const token = result.data.idToken;
//     const userID = result.data.localId;
//     addToLocalStorage(token, userID);
//     hideMenue();
//   } catch (error) {
//     logErrors(error);
//   }
// };