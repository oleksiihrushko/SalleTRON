import axios from 'axios';
import firebase from 'firebase';
import hideMenue from './services';
import refs from './refs';

//===========user==============
const user = {
  email: '',
  password: '',
};
const userLoginHandler = e => user[e.target.name] = e.target.value;
const resetUserData = e => {
  e.currentTarget.reset();
  user.email = '';
  user.password = '';
};
//===========/user==============

//===========API==============
const firebaseConfig = {
  apiKey: 'AIzaSyDM4b8GRIsIe7_30Fx8kj3A7uV0dBkEs-o',
  authDomain: 'salletronbase.firebaseapp.com',
  databaseURL: 'https://salletronbase.firebaseio.com',
  projectId: 'salletronbase',
  storageBucket: 'salletronbase.appspot.com',
  messagingSenderId: '555686357871',
  appId: '1:555686357871:web:7845e33c12341a4949969a',
};

// const fetchSignUp = ()=> {
//   const result = await axios.post(
//     `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
//     { ...user, returnSecureToken: true });
// }
// const fetchSignin = ()=>{
//   const result = await axios.post(
//     `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
//     { ...user, returnSecureToken: true },
//   );
// }

const addToLocalStorage = (token, userID)=>{
  localStorage.setItem(
    'user',
    JSON.stringify({
      token: token,
      id: userID,
    }),
  );
}
const logErrors =(error)=>{
  console.error(error);
  console.error(error.code);
  console.error(error.message);
  console.error(error.email);
  console.error(error.credential);
}

const authWithEmailAndPassword = async () => {  
  try {
    // fetchSignUp()
    const result = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
      { ...user, returnSecureToken: true });
      const token = result.data.idToken;
      const userID = result.data.localId;
    addToLocalStorage(token, userID)
    hideMenue();
    //  (response.status === 200 ) && alert('Registration successfully completed');
  } 
  catch (error) {
    logErrors(error)
  }
};
const signInWithPassword = async () => {
  try {
    // fetchSignin()
    const result = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
      { ...user, returnSecureToken: true },
    );
    addToLocalStorage(token, userID)
    hideMenue();
  } 
  catch (error) {
    logErrors(error)
  }
};
//===========/API==============

//======Login/signUp with data===========================================

const getDataFromInput = () =>  document.forms.authForm.addEventListener('input', userLoginHandler);

const submitData = e => {
  e.preventDefault();
  authWithEmailAndPassword();
  resetUserData(e);
};
const checkData = e => {
  e.preventDefault();
  signInWithPassword();
  resetUserData(e);
};
console.log(refs.login);
console.log(refs.gooogle);

export const userLogin = () => {
  getDataFromInput();

  refs.login.addEventListener('submit', checkData);
  // authForm.addEventListener('submit', checkData);
};
export const userSignUP = () => {
  getDataFromInput();
  authForm.addEventListener('submit', submitData);
};

//======Login with Google and FB===========================================
firebase.initializeApp(firebaseConfig);

const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  signInLogic(provider)
};
const loginWithFB = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  signInLogic(provider)
};

async function signInLogic(provider) {
  try {
    const result = await firebase.auth().signInWithPopup(provider)
    const token = result.credential.accessToken;
    const userID = result.user.uid;
    addToLocalStorage(token, userID)
    hideMenue();
  } catch (error) {
    logErrors(error)
  }
}

// refs.gooogle.addEventListener('click', loginWithGoogle);  // продумать снимать слушал=тели или нет. если да то в самом колбеке
// refs.facebook.addEventListener('click', loginWithFB);

{
// function signInLogic(provider) {
//   firebase.auth().signInWithPopup(provider)
//     .then((result)=> {
//       const token = result.credential.accessToken;
//       const userID = result.user.uid;
//       addToLocalStorage()
//       hideMenue();
//     })
//     .catch(error => {
//       logErrors(error)
//     });
// }

// console.log(FB);

// FB.getLoginStatus(function(response) {
//   statusChangeCallback(response);
// });

// {
//   status: 'connected',
//   authResponse: {
//       accessToken: '...',
//       expiresIn:'...',
//       signedRequest:'...',
//       userID:'...'
//   }
// }

// status сообщает о состоянии входа человека в приложение. Состояние может принимать одно из следующих значений:
// connected — человек выполнил вход на Facebook и в ваше приложение.
// not_authorized — человек выполнил вход на Facebook, но не вошел в приложение.
// unknown — человек не вошел на Facebook, поэтому неизвестно, выполнен ли вход в приложение, либо FB.logout() был вызван раньше и поэтому не может подключиться к Facebook.
// authResponse будет добавлен, если статус — connected и состоит из следующих элементов:
// accessToken — содержит маркер доступа для пользователя приложения.
// expiresIn — указывает UNIX-время, когда срок действия маркера истечет и его нужно будет обновить.
// signedRequest — параметр подписи, содержащий сведения о пользователе приложения.
// userID — указывает ID пользователя приложения.
// Когда состояние входа определено, можно выбрать один из следующих вариантов:
// Если человек вошел на Facebook и в приложение, предоставьте ему возможность работать с приложением как зарегистрированному пользователю.
// Если человек не вошел в приложение или на Facebook, предложите ему диалог «Вход» с элементом FB.login() или покажите кнопку «Вход».
}