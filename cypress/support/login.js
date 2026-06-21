Cypress.Commands.add("login", (user, pass) => {
  cy.visit("https://automationintesting.online/");
  cy.get(".nav-link").contains("Admin").should("be.visible").click();
  cy.url().should("include", "/admin");
  cy.get("#username").should("be.visible").type(user);
  cy.get("#password").should("be.visible").type(pass);
  cy.get("#doLogin").should("be.visible").click();
  cy.url().should("include", "/admin/rooms");
});
