const checkForm = document.querySelector('.js-form');
const errorEmail = document.querySelector('.errorEmail');
const errorPassword = document.querySelector('.errorPassword');

checkForm.addEventListener('submit', checkValue);

function checkValue(e) {
  e.preventDefault();
  const valueEmail = e.currentTarget.elements.email.value;
  // console.log(valueEmail);
  if (!(valueEmail.includes('@') && valueEmail.includes('.'))) {
    errorEmail.textContent = 'Incorrect e-mail!';
    return;
  }

  if (valueEmail.length < 5) {
    errorEmail.textContent = 'Incorrect e-mail!';
    return;
  }

  const valuePassword = e.currentTarget.elements.password.value;
  console.log(valuePassword);

  if (valuePassword.length < 6) {
    errorPassword.textContent = 'Your password must be more than 5 symbols!';
  }

  if (
    valueEmail.includes('@') &&
    valueEmail.includes('.') &&
    valueEmail.length >= 5 &&
    valuePassword.length >= 6
  ) {
    errorEmail.textContent = '';
    errorPassword.textContent = '';
  }
  e.currentTarget.reset();
}
