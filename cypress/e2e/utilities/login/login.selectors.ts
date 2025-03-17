import { cySelector } from '../utils';

const baseDescription = 'login';

const loginEmailInput = cySelector(`${baseDescription}-login-email-input`);
const loginPasswordInput = cySelector(
  `${baseDescription}-login-password-input`,
);
const loginSubmitButton = cySelector(`${baseDescription}-login-submit`);
const loginSignUpButton = cySelector(`${baseDescription}-login-sign-up-button`);
const loginError = cySelector(`${baseDescription}-error`);
export const loginSelectors = {
  loginEmailInput,
  loginPasswordInput,
  loginSubmitButton,
  loginSignUpButton,
  loginError,
};
