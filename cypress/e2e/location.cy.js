describe('Location: Datos de ubicación y Mapa', () => {
    beforeEach(() => {
    cy.visit('https://automationintesting.online/');
    });
    it('Validar dirección completa y Mapa interactivo', () => {
        cy.intercept('GET', '**/location').as('getLocation');

        cy.contains('.nav-link', 'Location').should('be.visible').click();
        cy.contains('.card-body', 'Contact Information').should('be.visible');

        cy.contains('.card-body', 'Address').should('contain.text', 'Shady Meadows B&B, Shadows valley, Newingtonfordburyshire, Dilbery, N1 1AA');
        cy.contains('.card-body', 'Phone').should('contain.text', '012345678901');
        cy.contains('.card-body', 'Email').should('contain.text', 'fake@fakeemail.com');
        cy.contains('Find us in the beautiful Newingtonfordburyshire countryside').should('be.visible');

        cy.get('.pigeon-overlays').should('be.visible');
        cy.get('.pigeon-click-block').should('be.visible').click({ force: true });

        cy.get('.pigeon-overlays').find('img, svg, div').its('length').should('be.greaterThan', 0);

        cy.wait('@getLocation').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);

        });
    });
});