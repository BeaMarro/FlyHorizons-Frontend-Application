describe("RegisterPage - E2E Test", () => {
  it("successfully registers a new user and redirects to login", () => {
    // Intercept the POST /users request and stub a successful response
    cy.intercept("POST", "**/users", {
      statusCode: 201,
      body: {
        id: 123,
        full_name: "Test User",
        email: "testuser@example.com",
        account_type: 1
      },
    }).as("postUser");

    // Visit the register page
    cy.visit("https://flyhorizons.netlify.app/register");

    // Fill the form inputs
    cy.get('input[type="text"]').type("Test User"); // Full Name
    cy.get('input[type="email"]').type("testuser@example.com"); // Email
    cy.get('input[type="password"]').eq(0).type("TestPassword123"); // Password
    cy.get('input[type="password"]').eq(1).type("TestPassword123"); // Confirm Password

    // Click register button
    cy.contains("button", "Register").click();

    // Wait for the API call to complete
    cy.wait("@postUser");

    // Assert redirection to login page
    cy.url().should("include", "/login");
  });

  it("shows validation error if passwords do not match", () => {
    cy.visit("https://flyhorizons.netlify.app/register");

    cy.get('input[type="text"]').type("Test User");
    cy.get('input[type="email"]').type("testuser@example.com");
    cy.get('input[type="password"]').eq(0).type("password1");
    cy.get('input[type="password"]').eq(1).type("password2");

    cy.contains("button", "Register").click();

    cy.contains("Please ensure the password fields are matching").should("be.visible");
  });
});