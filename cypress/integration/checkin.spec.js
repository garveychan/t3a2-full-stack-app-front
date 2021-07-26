describe('Check-in', () => {
    beforeEach(() => {
        cy.visit('/');
      });
  
    it('should authenticate with correct credentials', () => {
      cy.get('#email').type('fordprefect@example.com');
      cy.get('[data-cy="submit-button"]').click();
      cy.url().should('include', '/dashboard');
    });

  });