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
  console.error(error.code);
  console.error(error.message);
  console.error(error.email);
  console.error(error.credential);
};

export function hideMenue() {
  const refs = {
    register: document.querySelector('.header__form-register'),
    login: document.querySelector('.header__form-login'),
    logout: document.querySelector('.header__form-logout'),
  };
  const checkStorage = localStorage.getItem('user');

  checkStorage
    ? refs.login.classList.add('hide')
    : refs.login.classList.remove('hide');
  checkStorage
    ? refs.register.classList.add('hide')
    : refs.register.classList.remove('hide');
  !checkStorage
    ? refs.logout.classList.add('hide')
    : refs.logout.classList.remove('hide');

  // refs.content.innerHTML = getHomePage();
}

export const logOut = ()=>{
const clearLocalStorage = () => {
  // localStorage.removeItem('user');
  localStorage.setItem('user', '');
//   refs.content.innerHTML = getHomePage();  //написать функцию которая будет возвращять mainpage

};
document
  .querySelector('.header__form-logout')
  .addEventListener('click', clearLocalStorage);
}