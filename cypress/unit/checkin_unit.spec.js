describe('Check-in', () => {
    beforeEach(() => {
        cy.visit('/');
      });
  
    it('should show the check-in form', () => {
      cy.root().should('contain', 'Member Check-In');
    });

    it('should show the submit button', () => {
        cy.root().should('contain', 'Submit');
      });
  });