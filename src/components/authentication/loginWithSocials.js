import firebase from 'firebase';
import { firebaseConfig } from './authServises';

//======Login with Google and FB===========================================
firebase.initializeApp(firebaseConfig);

export const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  signInLogic(provider);
};
export const loginWithFB = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  signInLogic(provider);
};

async function signInLogic(provider) {
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const token = result.credential.accessToken;
    const userID = result.user.uid;
    addToLocalStorage(token, userID);
    hideMenue();
  } catch (error) {
    logErrors(error);
  }
}



// export default loginWithGoogle loginWithFB

{
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
