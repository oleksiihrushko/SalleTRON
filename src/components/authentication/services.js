import axios from 'axios';

// axios.defaults.baseURL = 'https://salletronbase.firebaseio.com'; /////saletron1
// axios.defaults.baseURL = 'https://salletronbase2.firebaseio.com'; /////saletron2
axios.defaults.baseURL = 'https://saletrontest.firebaseio.com';

export const addToLocalStorage = async (token, userID) => {
  const databaseResponseId = await axios.get('/users.json');
  const res = Object.entries(databaseResponseId.data);

  const result = res.find(user => user[1].id === userID);
  console.log(result);

  const userFavorites = await axios.get(`/users/${result[0]}/favorites.json`);

  localStorage.setItem(
    'user',
    JSON.stringify({
      token,
      id: userID,
      favorites: userFavorites.data,
    }),
  );

  // localStorage.setItem(
  //   'user',
  //   JSON.stringify({
  //     token: token,
  //     id: userID,
  //     favorites,
  //   }),
  // );
};

export const logErrors = error => {
  if (error) {
    console.error(error);
    console.dir(error.response.data.error);
    console.error(error.response.data.error.message);
  }
};

export function hideMenue() {
  const refs = {
    login: document.querySelector('.header__form-login'),
    logout: document.querySelector('.header__form-logout'),
  };
  const checkStorage = localStorage.getItem('user');

  checkStorage
    ? refs.login.classList.add('hide')
    : refs.login.classList.remove('hide');
  !checkStorage
    ? refs.logout.classList.add('hide')
    : refs.logout.classList.remove('hide');
}

export const logOut = () => {
  const clearLocalStorage = () => {
    localStorage.removeItem('user');
    // localStorage.setItem('user', '');
    hideMenue();
  };
  document
    .querySelector('.header__form-logout')
    .addEventListener('click', clearLocalStorage);
};
