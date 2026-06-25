// 3. Automatizaciones de Pruebas.

// 3.1 Reserva exitosa como usuario invitado 
// 1. Navegar a la página principal y verificar que se muestran habitaciones disponibles
// 2. Seleccionar una habitación y abrir el formulario de reserva 
// 3. Completar el formulario con datos válidos (nombre, apellido, email, teléfono y fechas)
// 4. Confirmar la reserva y validar que el mensaje de éxito aparece en pantalla 
describe('Reserva usuario invitado', () => {
    it('should create a booking successfully', () => {

    cy.visit('https://automationintesting.online/')

    cy.get('input').first().type('2026-06-22')
    cy.get('input').last().type('2026-06-23')
    cy.contains('Check Availability').click()
    cy.contains('Book now').first().click()

    cy.url().should('include', '/reservation')
    cy.contains('button', 'Reserve Now').scrollIntoView().click()

    cy.get('input[name="firstname"]').type('Dahy')
    cy.get('input[name="lastname"]').type('Gonzalez')
    cy.get('input[name="email"]').type('dahyana@gmail.com')
    cy.get('input[name="phone"]').type('23456781934')

    cy.contains('button', 'Reserve Now').last().click()

    cy.contains('Booking Confirmed', { timeout: 30000 }).should('exist')

    });
});

// 3.2 Validaciones del formulario de reserva (Belu-caso negativo)
// 1. Intentar enviar el formulario sin completar ningún campo 
// 2. Verificar que aparecen los mensajes de error correspondientes 
// 3. Verificar que no se realizó ninguna reserva
describe('Validaciones del formulario de reserva', () => {

    it('should create a booking successfully', () => {
        cy.visit('https://automationintesting.online/')
        cy.request('GET', 'https://automationintesting.online/')
            .then((response) => {
                expect(response.status).to.eq(200)
            })

        cy.get('.nav-link').filter('[href*="/#rooms"]').click()
        cy.get('.btn.btn-primary').contains('Book now').click()
        cy.url().should('include', '/reservation')
        cy.get('#doReservation').click()
        cy.get('.btn.btn-primary').contains('Reserve Now').click()

        // Valida error 400, que es un POST por formulario vacio  
        cy.request({
            method: 'POST',
            url: 'https://automationintesting.online/api/booking',
            failOnStatusCode: false,
            body: {}
        }).then((response) => {
            expect(response.status).to.eq(400)
        })

    //Valida si alguno de los textos o msj de error son visibles o se muestran en pantalla
    const expectedErrors = [
        "size must be between 3 and 18",
        "size must be between 3 and 30",
        "must not be empty",
        "Lastname should not be blank",
        "size must be between 11 and 21",
        "Firstname should not be blank",
    ];

    expectedErrors.forEach((errorMsg) => {
        cy.get("li").contains(errorMsg).should("exist").should("be.visible");
        });
    });
});

// 3.3 Formulario de contacto (Favio)
// 1. Completar el formulario de contacto con datos válidos 
// 2. Enviar el mensaje y validar que se muestra la confirmación
describe("Formulario de contacto", () => {
    beforeEach(() => {
        cy.visit("https://automationintesting.online/");

    });
    it("Envío de formulario con datos válidos", () => {
        cy.intercept("POST", "**/message").as("submitContact");
        cy.fixture("dataFormulario").then((data) => {
            const usuario = data.usuarioCorrecto;

        cy.completarFormulario(
            usuario.name,
            usuario.email,
            usuario.phone,
            usuario.subject,
            usuario.message

        );
        cy.wait("@submitContact").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.request.body).to.have.property("name", usuario.name);
            expect(interception.request.body).to.have.property("email", usuario.email);
            expect(interception.request.body).to.have.property("phone", usuario.phone);
            expect(interception.request.body).to.have.property("subject", usuario.subject);
            expect(interception.request.body).to.have.property("description", usuario.message);

        });
        cy.contains("Thanks for getting in touch Juan Perez!").should("be.visible");

        });
    });
});