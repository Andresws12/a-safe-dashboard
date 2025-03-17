import { loginSelectors } from './utilities/login/login.selectors';
import { ROUTES } from './utilities/utils/common';
import {
  loginCredentials,
  submitLogin,
  submitSignUp,
} from './utilities/utils/loginCredentials';

describe('Authentication Functionality', () => {
  beforeEach(() => {
    cy.visit(ROUTES.HOME);
  });

  describe('Sign Up', () => {
    beforeEach(() => {
      cy.get(loginSelectors.loginSignUpButton).should('be.visible').click();
      cy.url().should('include', ROUTES.SIGN_UP);
    });

    it('should successfully sign up with valid credentials', () => {
      submitSignUp(
        loginCredentials.CYPRESS_USER_TEST_USERNAME,
        loginCredentials.CYPRESS_USER_TEST_EMAIL,
        loginCredentials.CYPRESS_USER_TEST_PASSWORD,
      );

      cy.url().should('include', ROUTES.HOME);
    });

    it('should show error when signing up with invalid credentials', () => {
      submitSignUp(
        loginCredentials.CYPRESS_USER_TEST_USERNAME,
        loginCredentials.CYPRESS_USER_TEST_EMAIL,
        loginCredentials.USER_TEST_WRONG_SHORT_PASSWORD,
      );

      cy.url().should('include', ROUTES.SIGN_UP);
    });
  });

  describe('Login', () => {
    it('should successfully login with valid credentials', () => {
      submitLogin(
        loginCredentials.CYPRESS_USER_TEST_EMAIL,
        loginCredentials.CYPRESS_USER_TEST_PASSWORD,
      );

      cy.url().should('include', ROUTES.DASHBOARD);
    });

    it('should show error when logging in with invalid credentials', () => {
      submitLogin(
        loginCredentials.CYPRESS_USER_TEST_EMAIL,
        loginCredentials.USER_TEST_WRONG_PASSWORD,
      );

      cy.get(loginSelectors.loginError).should('be.visible');
      cy.url().should('include', ROUTES.HOME);
    });
  });

  it('should navigate to sign up page', () => {
    cy.get(loginSelectors.loginSignUpButton).should('be.visible').click();
    cy.url().should('include', ROUTES.SIGN_UP);
  });
});
