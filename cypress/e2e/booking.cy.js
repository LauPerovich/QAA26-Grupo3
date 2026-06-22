
describe('Booking - Reserva usuario invitado', () => {

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

  })

})