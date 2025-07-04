// Smoke Test: Checks that the Deployed Frontend is reachable, and contains all of the most important components. 

describe('FlyHorizons Frontend', () => {
  it('loads homepage with navbar, buttons, and titles', () => {
    cy.visit('https://flyhorizons.netlify.app/')
    
    // Check that the navbar is visible
    cy.get('nav').should('be.visible')
    
    // Check the navbar contains certain links by their text
    cy.get('nav').within(() => {
      cy.contains('a', 'Home').should('exist')
      cy.contains('a', 'Book a Flight').should('exist')
      cy.contains('a', 'My Account').should('exist')
    })

    // Check for a button with a given text
    cy.contains('button', 'Book a Flight').should('be.visible')

    // Check the website main title
    cy.get('h1').should('contain.text', 'FlyHorizons')

    // Check the website subtitle
    cy.get('h2').should('contain.text', 'Adventure Awaits, Take Off with Us!')
  })
})