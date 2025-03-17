import { loginSelectors } from './utilities/login/login.selectors';
import {
  loginCredentials,
  submitLogin,
} from './utilities/utils/loginCredentials';

describe('Login Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should successfully login with valid credentials', () => {
    submitLogin(
      loginCredentials.CYPRESS_USER_TEST_EMAIL,
      loginCredentials.CYPRESS_USER_TEST_PASSWORD,
    );

    cy.url().should('include', '/dashboard');
  });

  it('Should show error when login with invalid credentials', () => {
    submitLogin(
      loginCredentials.CYPRESS_USER_TEST_EMAIL,
      loginCredentials.USER_TEST_WRONG_PASSWORD,
    );

    cy.get(loginSelectors.loginError).should('be.visible');

    cy.url().should('include', '/');
  });
});
