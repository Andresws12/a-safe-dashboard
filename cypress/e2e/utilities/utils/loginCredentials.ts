import { loginSelectors } from '../login/login.selectors';

export const loginCredentials = {
  CYPRESS_USER_TEST_EMAIL: Cypress.env('user_test_email'),
  CYPRESS_USER_TEST_PASSWORD: Cypress.env('user_test_password'),
  USER_TEST_WRONG_PASSWORD: 'Test1234$.',
};

export const fillLoginForm = (email: string, password: string) => {
  cy.get(loginSelectors.loginEmailInput).should('be.visible').type(email);

  cy.get(loginSelectors.loginPasswordInput).should('be.visible').type(password);
};

export const submitLogin = (email: string, password: string) => {
  fillLoginForm(email, password);
  cy.get(loginSelectors.loginSubmitButton).should('be.enabled').click();
};
