import dataAdmin from "../fixtures/dataAdmin.json";

describe("AutomationInTesting - Rol Administrador", () => {
  // Tests del modulo login
  describe("Login", () => {
    describe("Login exitoso", () => {
      it("Debe permitir login con credenciales válidas", () => {
        const { username, password } = dataAdmin.registroValidoAdmin;
        cy.login(username, password);
      });

      describe("Login para casos inválidos", () => {
        beforeEach(() => {
          cy.visit("https://automationintesting.online/");
          cy.get(".nav-link").contains("Admin").should("be.visible").click();
          cy.url().should("include", "/admin");
        });

        it("Login con contraseña incorrecta", () => {
          const { username } = dataAdmin.registroAlternativoAdmin;
          const { password: incorrectPassword } =
            dataAdmin.registroAlternativoAdmin;

          cy.get("#username").type(username);
          cy.get("#password").type(incorrectPassword);
          cy.get("#doLogin").click();
          cy.get(".alert-danger")
            .should("be.visible")
            .and("have.text", "Invalid credentials");
          cy.url().should("include", "/admin");
        });

        it("Login con campos vacíos", () => {
          cy.get("#doLogin").click();
          cy.get(".alert-danger")
            .should("be.visible")
            .and("have.text", "Invalid credentials");
          cy.url().should("include", "/admin");
        });
      });
    });
  });

  // Tests del módulo rooms
  describe("Rooms", () => {
    beforeEach(() => {
      const { username, password } = dataAdmin.registroValidoAdmin;
      cy.login(username, password);
    });

    it("Agregar habitación", () => {
      const { roomName, type, accessible, price, details } =
        dataAdmin.habitacionesValidas.habitacion1;
      cy.agregarHabitacion(roomName, type, accessible, price, details);
    });
  });
});
