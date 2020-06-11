import firebase from 'firebase';

// import { firebaseConfig } from './authServises';
import { logErrors, addToLocalStorage, hideMenue } from './services';
import axios from 'axios';
import { stateOfAuth } from './refs';
// import { firebaseConfig } from './authServises';

// axios.defaults.baseURL = 'https://salletronbase.firebaseio.com';
axios.defaults.baseURL = 'https://salletronbase2.firebaseio.com'; /////////////////// salletron2

//======Login with Google and FB===========================================
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

firebase.initializeApp(firebaseConfig);
// console.log(firebaseConfig);

export const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  signInLogic(provider);
};
export const loginWithFB = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  signInLogic(provider);
};

const setTOlocalStorage = (id, token, favorites = []) => {
  localStorage.setItem(
    'user',
    JSON.stringify({
      id,
      token,
      favorites,
    }),
  );
};

async function signInLogic(provider) {
  const userData = {
    id: '',
    email: '',
    createdAt: Date.now(),
    adv: [''],
    favorites: [''],
  };

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const token = result.user.xa;
    // console.log('result', result);

    userData.id = result.user.uid;
    userData.email = result.user.email;
    try {
      const getUsers = await axios.get('/users.json');
      // console.log('getUsers',getUsers);

      if (getUsers.data === null) {
        const createNewUser = await axios.post(
          // `https://salletronbase.firebaseio.com/users.json?auth=${token}`,
          `https://salletronbase2.firebaseio.com/users.json?auth=${token}`,
          { ...userData },
        );
        setTOlocalStorage(createNewUser.data.name, token);
        stateOfAuth.instance.close();
      }

      if (getUsers.data !== null) {
        const usersEntries = Object.entries(getUsers.data);
        const userExist = usersEntries.find(
          user => user[1].id === result.user.uid,
        );
        console.log('userExist76', userExist);

        if (userExist === undefined) {
          const createNewUser = await axios.post(
            // `https://salletronbase.firebaseio.com/users.json?auth=${token}`,
            `https://salletronbase2.firebaseio.com/users.json?auth=${token}`,
            { ...userData },
          );
          setTOlocalStorage(createNewUser.data.name, token);
          stateOfAuth.instance.close();
        }
        if (userExist !== undefined) {
          console.log('userExist', userExist);
          setTOlocalStorage(userExist[0], token, userExist[1].favorites);
          stateOfAuth.instance.close();
        }
      }
    } catch (error) {
      console.log(error);
    }
    hideMenue();
  } catch (error) {
    console.log('catch');

    logErrors(error);
  }
}
