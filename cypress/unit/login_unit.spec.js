describe('Login', () => {
    beforeEach(() => {
      cy.visit('/login');
    });
  
    it('should show the sign-in form', () => {
      cy.root().should('contain', 'Member Login');
    });

    it('should show the sign-in button', () => {
        cy.root().should('contain', 'Sign in');
      });

    it('should show the forgot password link', () => {
        cy.root().should('contain', 'Forgot your password');
      });

  });