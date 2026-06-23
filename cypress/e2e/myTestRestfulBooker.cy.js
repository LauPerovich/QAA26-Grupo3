// 3.1 Reserva exitosa como usuario invitado
// 1. Navegar a la página principal y verificar que se muestran habitaciones disponibles 2. Seleccionar una habitación y abrir el formulario de reserva
// 3. Completar el formulario con datos válidos (nombre, apellido, email, teléfono y fechas) 4. Confirmar la reserva y validar que el mensaje de éxito aparece en pantalla

// 3.2 Validaciones del formulario de reserva
// 1. Intentar enviar el formulario sin completar ningún campo
// 2. Verificar que aparecen los mensajes de error correspondientes
// 3. Verificar que no se realizó ninguna reserva
describe('3.2-Validaciones del formulario de reserva', () => {

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
            'size must be between 3 and 18',
            'size must be between 3 and 30',
            'must not be empty',
            'Lastname should not be blank',
            'size must be between 11 and 21',
            'Firstname should not be blank',
        ]

        expectedErrors.forEach((errorMsg) => {
            cy.get('li').contains(errorMsg).should('exist').should('be.visible')
        })

    })

})






// 3.3 Formulario de contacto
// 1. Completar el formulario de contacto con datos válidos
// 2. Enviar el mensaje y validar que se muestra la confirmación
