describe("LoginPage - Failed Login Test", () => {
  beforeEach(() => {
    cy.visit("https://flyhorizons.netlify.app/login");

    // Stub the failed login response
    cy.intercept("POST", "**/login", {
      statusCode: 401,
      body: { message: "Invalid credentials" },
    }).as("postLoginFail");
  });

  it("stays on login page and shows error on failed login", () => {
    // Fill in invalid credentials
    cy.get('input[type="email"]').type("fail@example.com");
    cy.get('input[type="password"]').type("wrongpassword");

    // Attempt to login
    cy.contains("button", "Login").click();

    // Wait for the stubbed login request
    cy.wait("@postLoginFail");

    // Confirm URL remains the same (login failed)
    cy.url().should("include", "/login");

    // Check for the error alert
    cy.contains("Login failed. Please ensure that your email and password credentials are correct.")
      .should("be.visible");
  });
});