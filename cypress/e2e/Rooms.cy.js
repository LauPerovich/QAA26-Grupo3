describe('Verificación de seccion Rooms en pagina principal', () => {
    it('Abrir pagina',()=>{
        cy.visit('https://automationintesting.online/')

        cy.request('GET', 'https://automationintesting.online/')
        .then((response) => {
          expect(response.status).to.eq(200)})
    })

      it('validación datos en pantalla',()=>{
        cy.visit('https://automationintesting.online/')
        cy.get('.nav-link').filter('[href*="/#rooms"]').click() 
        cy.get('a').contains('Book now').should('exist').should('be.visible')
        cy.get('h2').contains('Our Rooms').should('exist').should('be.visible')
      })


})