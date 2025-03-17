import { cySelector } from '../utils';

const loginBaseDescription = 'login';
const signUpBaseDescription = 'sign-up';

const loginEmailInput = cySelector(`${loginBaseDescription}-email-input`);
const loginPasswordInput = cySelector(`${loginBaseDescription}-password-input`);
const loginSubmitButton = cySelector(`${loginBaseDescription}-submit`);
const loginSignUpButton = cySelector(`${loginBaseDescription}-sign-up-button`);
const loginError = cySelector(`${loginBaseDescription}-error`);

const signUpUsernameInput = cySelector(
  `${signUpBaseDescription}-username-input`,
);
const signUpEmailInput = cySelector(`${signUpBaseDescription}-email-input`);
const signUpPasswordInput = cySelector(
  `${signUpBaseDescription}-password-input`,
);
const signUpSubmitButton = cySelector(`${signUpBaseDescription}-submit`);
const signUpLoginButton = cySelector(`${signUpBaseDescription}-login-button`);
const signUpPasswordErrorInput = cySelector(
  `${signUpBaseDescription}-password-error`,
);

export const loginSelectors = {
  loginEmailInput,
  loginPasswordInput,
  loginSubmitButton,
  loginSignUpButton,
  loginError,
  signUpUsernameInput,
  signUpEmailInput,
  signUpPasswordInput,
  signUpSubmitButton,
  signUpLoginButton,
  signUpPasswordErrorInput,
};
