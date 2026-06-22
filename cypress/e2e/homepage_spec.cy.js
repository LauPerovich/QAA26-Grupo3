describe('Home page', () => {
  it('loads successfully and shows the main heading', () => {
    // Cambia la URL a la que quieras probar
    cy.visit('https://example.cypress.io');
    // Verifica que el título de la página sea visible
    cy.contains('type').should('be.visible');
  });
});
