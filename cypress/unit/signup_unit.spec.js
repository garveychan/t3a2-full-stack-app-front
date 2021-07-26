describe('Signup', () => {
    beforeEach(() => {
      cy.visit('/signup');
    });
  
    it('should show the sign-up form', () => {
      cy.root().should('contain', 'Create your new account');
    });

    it('should show the sign-up button', () => {
        cy.root().should('contain', 'Sign up');
      });

  });