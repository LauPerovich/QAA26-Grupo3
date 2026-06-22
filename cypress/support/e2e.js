import "./commands";
import "./login";
import "./agregarHabitacion";

// Manejar excepciones no capturadas de la aplicación
Cypress.on("uncaught:exception", (err, runnable) => {
  // Ignorar errores específicos de React que no queremos que fallen el test
  if (err.message.includes("Minified React error #418")) {
    return false; // Previene que Cypress falle el test
  }
  // Permitir que otros errores fallen el test normalmente
  return true;
});
