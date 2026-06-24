// 3.1 Reserva exitosa como usuario invitado
// 1. Navegar a la página principal y verificar que se muestran habitaciones disponibles 2. Seleccionar una habitación y abrir el formulario de reserva
// 3. Completar el formulario con datos válidos (nombre, apellido, email, teléfono y fechas) 4. Confirmar la reserva y validar que el mensaje de éxito aparece en pantalla

// 3.2 Validaciones del formulario de reserva
// 1. Intentar enviar el formulario sin completar ningún campo
// 2. Verificar que aparecen los mensajes de error correspondientes
// 3. Verificar que no se realizó ninguna reserva

// 3.3 Formulario de contacto
// 1. Completar el formulario de contacto con datos válidos
// 2. Enviar el mensaje y validar que se muestra la confirmación
describe('Formulario de contacto', () => {
    beforeEach(() => {
        cy.visit('https://automationintesting.online/');
    });
    it('Envío de formulario con datos válidos', () => {
        cy.intercept('POST', '**/message').as('submitContact');
        cy.fixture('dataFormulario').then((data) => {
            const usuario = data.usuarioCorrecto;

            cy.completarFormulario(
                usuario.name,
                usuario.email,
                usuario.phone,
                usuario.subject,
                usuario.message

            );
            cy.wait('@submitContact').then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.request.body).to.have.property('name', usuario.name);
                expect(interception.request.body).to.have.property('email', usuario.email);
                expect(interception.request.body).to.have.property('phone', usuario.phone);
                expect(interception.request.body).to.have.property('subject', usuario.subject);
                expect(interception.request.body).to.have.property('description', usuario.message);

            });
        cy.contains('Thanks for getting in touch Juan Perez!').should('be.visible');

        });
    });
});