const authFormLogic = () => {
  const checkForm = document.querySelector('.js-form');
  checkForm.addEventListener('submit', checkValue);
  function checkValue(e) {
    e.preventDefault();
    const errorEmail = document.querySelector('.errorEmail');
    const errorPassword = document.querySelector('.errorPassword');

    errorEmail.textContent = '';
    errorPassword.textContent = '';

    const valueEmail = e.currentTarget.elements.email.value;
    if (!(valueEmail.includes('@') && valueEmail.includes('.'))) {
      errorEmail.textContent = 'Incorrect e-mail!';
      return;
    }

    if (valueEmail.length < 5) {
      errorEmail.textContent = 'Incorrect e-mail!';
      return;
    }

    const valuePassword = e.currentTarget.elements.password.value;

    if (valuePassword.length < 6) {
      errorPassword.textContent = 'Password must be more than 5 symbols!';
    }
    e.currentTarget.reset();

    if (
      valueEmail.includes('@') &&
      valueEmail.includes('.') &&
      valueEmail.length >= 5 &&
      valuePassword.length >= 6
    ) {
      errorEmail.textContent = '';
      errorPassword.textContent = '';
    }
  }
};

export default authFormLogic;
