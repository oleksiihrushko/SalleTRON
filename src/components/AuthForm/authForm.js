const getAuthForm = () => {
  return `    <form class="js-form">
      <input
        name="email"
        type="text"
        class="emailInput input"
        placeholder="E-mail"
        required
      />
      <p class="errorEmail error"></p>
      <input
        name="password"
        type="password"
        class="passwordInput input"
        placeholder="Password"
        required
      />
      <p class="errorPassword error"></p>
      <div class="buttons">
        <button class="login btn">Log in</button>
        <button class="registration btn">New account</button>
      </div>
    </form>`;
};

export default getAuthForm;