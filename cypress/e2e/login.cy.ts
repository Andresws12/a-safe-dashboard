import { loginSelectors } from './utilities/login/login.selectors';
import { loginCredentials } from './utilities/utils/loginCredentials';

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  it('Login', () => {
    cy.get(loginSelectors.loginEmailInput).type(
      loginCredentials.CYPRESS_USER_TEST_EMAIL,
    );
    cy.get(loginSelectors.loginPasswordInput).type(
      loginCredentials.CYPRESS_USER_TEST_PASSWORD,
    );
    cy.get(loginSelectors.loginSubmitButton).click();
    cy.url().should('include', '/dashboard');
  });
});
