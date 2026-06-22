Cypress.Commands.add(
  "agregarHabitacion",
  (roomName, type, access, price, details) => {
    cy.url().should("include", "/admin/rooms");
    cy.get('[data-testid="roomlisting"]').its("length").as("initialCount");
    cy.get('[data-testid="roomName"]').type(roomName);
    cy.get("#type").select(type);
    cy.get("#accessible").select(access);
    cy.get("#roomPrice").type(price);

    details.forEach((detailId) => {
      cy.get(`#${detailId}Checkbox`).check();
    });

    cy.get("#createRoom").click();

    cy.get("@initialCount").then((initialCount) => {
      cy.get('[data-testid="roomlisting"]').should(
        "have.length",
        initialCount + 1,
      );
    });
  },
);
