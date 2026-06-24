describe('Home - Check Availability', () => {

  it('debería mostrar habitaciones disponibles', () => {

    // 1. Ir a la página
    cy.visit('https://automationintesting.online/')

    // 2. Scroll a la sección
    cy.contains('Check Availability & Book Your Stay')
      .scrollIntoView()

    // 3. Fechas (hoy y +21 días)
    const today = new Date()

    const checkIn = new Date(today)
    const checkOut = new Date(today)
    checkOut.setDate(today.getDate() + 21)

    const formatDate = (date) => date.toISOString().split('T')[0]

    // 4. Completar inputs
    cy.get('input').first().clear().type(formatDate(checkIn))
    cy.get('input').last().clear().type(formatDate(checkOut))

    // 5. Buscar disponibilidad
    cy.contains('Check Availability').click()

    // 6. Verificar resultados
    cy.contains('Our Rooms').should('be.visible')
    cy.contains('Book now').should('be.visible')

  })

})