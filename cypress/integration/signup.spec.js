describe('Signup', () => {
    beforeEach(() => {
      cy.visit('/signup');
    });
  
    it('should create an account with new credentials', () => {
      cy.get('#email-address').type('test@example.com');
      cy.get('#password').type('password');
      cy.get('#confirm-password').type('password');
      cy.get('[data-cy="submit-button"]').click();
      cy.url().should('include', '/dashboard');
    });

  });