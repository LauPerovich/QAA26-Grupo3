describe('Booking - Reserva usuario invitado', () => {

  it('should create a booking successfully', () => {

    // generar sufijo único para evitar conflictos en el backend
    const _ts = Date.now()

    // 1. Abrir home
    cy.visit('https://automationintesting.online/')

    // 2. Fechas
    cy.get('input').first().type('2026-06-22')
    cy.get('input').last().type('2026-06-25')

    // 3. Check availability
    cy.contains('Check Availability').click()

    // 4. Scroll / rooms
    cy.contains('Our Rooms').should('be.visible')

    // 5. Elegir habitación y abrir la página de reserva
    cy.contains('Book now').first().click()

    cy.url({ timeout: 20000 }).should('include', '/reservation')

    cy.contains('Book This Room', { timeout: 20000 }).should('be.visible')

    // El formulario se muestra tras hacer clic en Reserve Now; no quedan logs de depuración.

    // 6. Mostrar el formulario de reserva
    cy.contains('button', 'Reserve Now', { timeout: 20000 })
      .scrollIntoView()
      .click()

    // 7. Completar el formulario
    cy.get('input[name="firstname"]', { timeout: 20000 })
      .should('be.visible')
      .type('Dahy')

    cy.get('input[name="lastname"]', { timeout: 20000 })
      .type('Gonzalez')

    cy.get('input[name="email"]', { timeout: 20000 })
      .type(`dahyana+${_ts}@example.com`)

    // phone length validation expects around 11 digits; asegurar 11 caracteres
    cy.get('input[name="phone"]', { timeout: 20000 })
      .type(`9${_ts.toString().slice(-10)}`)

    // interceptar la petición y devolver una respuesta simulada (happy path)
    cy.intercept('POST', '/api/booking', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          message: 'Booking created',
          bookingId: `bk_${_ts}`
        }
      })
    }).as('createBooking')

    // 8. Enviar reserva (clicar el botón de envío dentro del formulario)
    cy.contains('button', 'Reserve Now', { timeout: 20000 })
      .last()
      .click()

    // esperar la petición simulada
    cy.wait('@createBooking', { timeout: 30000 })

    // 9. Validación final (esperar más tiempo por la confirmación)
    cy.contains('Booking Confirmed', { timeout: 30000 })
      .should('be.visible')

  })

})