describe('Contact: Formulario de Contacto', () => {
    beforeEach(() => {
        cy.visit('https://automationintesting.online/');
    });
    it('Envío de formulario con campos vacíos y validación de errores', () => {
        cy.intercept('POST', '**/message').as('submitContact');

        cy.contains(".nav-link", "Contact").should('be.visible').click();
        cy.contains(".card-body", "Send Us a Message").should('be.visible');
        cy.contains('button', 'Submit').should('be.visible').click();

        cy.wait('@submitContact').then((interception) => {
            expect(interception.response.statusCode).to.eq(400);

    });
        cy.contains('Message may not be blank').should('be.visible');
        cy.contains('Name may not be blank').should('be.visible');
        cy.contains('Email may not be blank').should('be.visible');
        cy.contains('Phone may not be blank').should('be.visible');
        cy.contains('Subject may not be blank').should('be.visible');

    });
    it('Envío de formulario con email sin @ y validación de alerta de error', () => {
        cy.intercept('POST', '**/message').as('submitContact');
        cy.fixture('dataFormulario').then((data) => {
            const usuario = data.usuarioEmailInvalido;

            cy.completarFormulario(
                usuario.name,
                usuario.email,
                usuario.phone,
                usuario.subject,
                usuario.message

            );
            cy.wait('@submitContact').then((interception) => {
                expect(interception.response.statusCode).to.eq(400);

            });
            cy.contains('must be a well-formed email address').should('be.visible');

        });
    });
    it('Envío de formulario con datos inválidos y validación de errores', () => {
        cy.intercept('POST', '**/message').as('submitContact');
        cy.fixture('dataFormulario').then((data) => {
            const usuario = data.usuarioCaracteresInvalidos;

            cy.completarFormulario(
                usuario.name,
                usuario.email,
                usuario.phone,
                usuario.subject,
                usuario.message

            );
            cy.wait('@submitContact').then((interception) => {
                expect(interception.response.statusCode).to.eq(400);

            });
            cy.contains('must be a valid name').should('be.visible');
            cy.contains('must be a valid phone number').should('be.visible');

        });
    });
    it('Envío del formulario con cantidad de caracteres invalidos y validación de errores', () => {
        cy.intercept('POST', '**/message').as('submitContact');
        cy.fixture('dataFormulario').then((data) => {
            const usuario = data.usCantidadCaracteresIncorrecto;

            cy.completarFormulario(
                usuario.name,
                usuario.email,
                usuario.phone,
                usuario.subject,
                usuario.message

            );
            cy.wait('@submitContact').then((interception) => {
                expect(interception.response.statusCode).to.eq(400);

            });
            cy.contains('Phone must be between 11 and 21 characters.').should('be.visible');
            cy.contains('Subject must be between 5 and 100 characters.').should('be.visible');
            cy.contains('Message must be between 20 and 2000 characters.').should('be.visible');

        });
    });
});