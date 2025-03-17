import { loginSelectors } from '../login/login.selectors';

export const loginCredentials = {
  USER_TEST_USERNAME: 'TestUser',
  CYPRESS_USER_TEST_EMAIL: Cypress.env('user_test_email'),
  CYPRESS_USER_TEST_PASSWORD: Cypress.env('user_test_password'),
  USER_TEST_WRONG_PASSWORD: 'Test1234$.',
  USER_TEST_WRONG_SHORT_PASSWORD: '1',
};

export const fillLoginForm = (email: string, password: string) => {
  cy.get(loginSelectors.loginEmailInput).should('be.visible').type(email);

  cy.get(loginSelectors.loginPasswordInput).should('be.visible').type(password);
};

export const submitLogin = (email: string, password: string) => {
  fillLoginForm(email, password);
  cy.get(loginSelectors.loginSubmitButton).should('be.enabled').click();
};

export const fillSignUpForm = (
  username: string,
  email: string,
  password: string,
) => {
  cy.get(loginSelectors.signUpUsernameInput)
    .should('be.visible')
    .type(username);
  cy.get(loginSelectors.signUpEmailInput).should('be.visible').type(email);
  cy.get(loginSelectors.signUpPasswordInput)
    .should('be.visible')
    .type(password);
};

export const submitSignUp = (
  username: string,
  email: string,
  password: string,
) => {
  fillSignUpForm(username, email, password);
  cy.get(loginSelectors.signUpSubmitButton).should('be.enabled').click();
};
