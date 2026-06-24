Cypress.Commands.add("completarFormulario", 
    (name, email, phone, subject, message) => {
        cy.contains(".nav-link", "Contact").should('be.visible').click();
        cy.contains(".card-body", "Send Us a Message").should('be.visible');
        
        cy.get('[data-testid="ContactName"]').type(name);
        cy.get('[data-testid="ContactEmail"]').type(email);
        cy.get('[data-testid="ContactPhone"]').type(phone);
        cy.get('[data-testid="ContactSubject"]').type(subject);
        cy.get('[data-testid="ContactDescription"]').type(message);
        cy.contains('button', 'Submit').should('be.visible').click();
    });