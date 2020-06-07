import refs from "./refs";

export const hideMenue = () => {
    const checkStorage = localStorage.getItem('user');
    checkStorage ? refs.login.classList.add('hide') : refs.login.classList.remove('hide');
    checkStorage ? refs.registration.classList.add('hide') : refs.registration.classList.remove('hide');
    !checkStorage ? refs.logOut.classList.add('hide'): refs.logOut.classList.remove('hide');
  
    refs.content.innerHTML = getHomePage();
  };

  export default hideMenue