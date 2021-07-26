describe('Check-in', () => {
    beforeEach(() => {
        // This is not working in development. In development, the page redirects to the login page. Page works correctly in production so test has been set up for production instead.
        cy.visit('https://www.1upbouldering.app/');
      });
  
    it('should show the check-in form', () => {
      cy.root().should('contain', 'Member Check-In');
    });
  
    it('should authenticate with correct credentials', () => {
      cy.get('#email').type('fordprefect@example.com');
      cy.get('[data-cy="submit-button"]').click();
      cy.url().should('include', '/dashboard');
    });

    it('should show the submit button', () => {
        cy.root().should('contain', 'Submit');
      });
  });