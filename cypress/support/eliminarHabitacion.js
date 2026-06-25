Cypress.Commands.add("eliminarHabitacion", () => {
  cy.url().should("include", "/admin/rooms");
  cy.get('[data-testid="roomlisting"]').its("length").as("initialCount");

  cy.get(".roomDelete").first().click();

  cy.get("@initialCount").then((initialCount) => {
    cy.get('[data-testid="roomlisting"]').should(
      "have.length",
      initialCount - 1,
    );
  });
});
