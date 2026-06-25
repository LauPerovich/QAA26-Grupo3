describe("3.2-Validaciones del formulario de reserva", () => {
  it("should create a booking successfully", () => {
    cy.visit("https://automationintesting.online/");
    cy.request("GET", "https://automationintesting.online/").then(
      (response) => {
        expect(response.status).to.eq(200);
      },
    );

    cy.get(".nav-link").filter('[href*="/#rooms"]').click();
    cy.get(".btn.btn-primary").contains("Book now").click();
    cy.url().should("include", "/reservation");
    cy.get("#doReservation").click();
    cy.get(".btn.btn-primary").contains("Reserve Now").click();

    // Verificación de reserva no realizada
    cy.request({
      method: "POST",
      url: "https://automationintesting.online/api/booking",
      failOnStatusCode: false,
      body: {},
    }).then((response) => {
      expect(response.status).to.eq(400);
    });

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
        usuario.message,
      );
      cy.wait("@submitContact").then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.request.body).to.have.property(
          "name",
          usuario.name,
        );
        expect(interception.request.body).to.have.property(
          "email",
          usuario.email,
        );
        expect(interception.request.body).to.have.property(
          "phone",
          usuario.phone,
        );
        expect(interception.request.body).to.have.property(
          "subject",
          usuario.subject,
        );
        expect(interception.request.body).to.have.property(
          "description",
          usuario.message,
        );
      });
      cy.contains("Thanks for getting in touch Juan Perez!").should(
        "be.visible",
      );
    });
  });
});
