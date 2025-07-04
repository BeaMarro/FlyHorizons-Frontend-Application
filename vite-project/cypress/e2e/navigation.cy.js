// Functional Test: Checks the functionality works as expected, therefore click the various navigation components and ensuring this takes you to the desired page, with the correct heading present.

describe('Navigation Bar', () => {
  beforeEach(() => {
    cy.visit('https://flyhorizons.netlify.app/');
  });

  it('navigates to Home page', () => {
    cy.get('nav').contains('Home').click();
    cy.url().should('include', '/');
    cy.contains('h1', 'FlyHorizons').should('be.visible'); // Page Heading
  });

  it('navigates to Flights page', () => {
    cy.get('nav').contains('Book a Flight').click();
    cy.url().should('include', '/search-flights');
    cy.contains('h1', 'Make a Booking').should('be.visible'); // Page Heading
  });

  it('navigates to Login page', () => {
    cy.get('nav').contains('My Account').click();
    cy.url().should('include', '/login');
  });
});