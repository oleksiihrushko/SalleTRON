import getAuthForm from './authForm';
import authFormLogic from './authFormLogic';

const openModal = () => {
  return `        <div class="modalWindow">
          <p class="textGoogle text">
            For authorization you can use the Google or Facebook Account:
          </p>
          <div class="buttonsAuth">
            <button class="googleBtn authBtn" id='google'>
              <img
                src="./img/google.svg"
                alt="google"
                class="googleSvg"
              />
              <span class="spanAuth">Google</span>
            </button>
            <button class="facebookBtn authBtn" id='facebook'>
              <img
                src="./img/facebook.svg"
                alt="facebook"
                class="facebookSvg"
              />
              <span class="spanAuth">Facebook</span>
            </button>
          </div>
          <p class="textAuth text">Or enter with e-mail and password:</p>
          ${getAuthForm()}
        </div>;`;
};

container.innerHTML = openModal();
authFormLogic();
export default openModal;
