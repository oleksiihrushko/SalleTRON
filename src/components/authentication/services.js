export const addToLocalStorage = (token, userID) => {
  localStorage.setItem(
    'user',
    JSON.stringify({
      token: token,
      id: userID,
    }),
  );
};

export const logErrors = error => {
  console.error(error);
  console.dir(error.response.data.error);
  console.error(error.response.data.error.message);

  
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

export const logOut = ()=>{
const clearLocalStorage = () => {
  // localStorage.removeItem('user');
  localStorage.setItem('user', '');
    hideMenue();

};
document
  .querySelector('.header__form-logout')
  .addEventListener('click', clearLocalStorage);
}