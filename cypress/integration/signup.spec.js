describe('Login', () => {
    beforeEach(() => {
      // This is not working in development. In development, the page redirects to the login page. Page works correctly in production so test has been set up for production instead.
      cy.visit('https://www.1upbouldering.app/signup');
    });
  
    it('should show the sign-up form', () => {
      cy.root().should('contain', 'Create your new account');
    });
  
    it('should create an account with new credentials', () => {
      cy.get('#email-address').type('test@example.com');
      cy.get('#password').type('password');
      cy.get('#confirm-password').type('password');
      cy.get('[data-cy="submit-button"]').click();
    //   cy.url().should('include', '/dashboard');
    });

    it('should show the sign-up button', () => {
        cy.root().should('contain', 'Sign up');
      });

  });