# QAA26-Grupo3

Repositorio del **Challenge Final de QA Automation** — Cohorte I 2026 · Xacademy

---

## Sobre el proyecto

Este trabajo final pone en práctica los conocimientos adquiridos durante el curso, aplicándolos sobre una aplicación web real de práctica: **Shady Meadows**, un sistema de reservas de un Bed & Breakfast.

[https://automationintesting.online/](https://automationintesting.online/)

La aplicación incluye un portal público para huéspedes y un panel de administración, lo que permitió cubrir distintos flujos y roles de usuario dentro de la suite de pruebas.

---

## Integrantes

| Nombre             | Email                       |
| ------------------ | --------------------------- |
| Dahyana Soledad    | dahygonz88@gmail.com        |
| Favio Palermo      | palermofavio99@gmail.com    |
| Laura Perovich     | lau.perovich@gmail.com      |
| Maria Belen Guzman | belen.belu.guzman@gmail.com |
| Nicolas Ponce      | nicoponce379@gmail.com      |
| Walter Belotti     | wbelotti69@gmail.com        |

---

## ¿Qué contiene este repositorio?

1. **Casos de prueba** documentados en [Google Sheets](https://docs.google.com/spreadsheets/d/1VFrXAC0BDaRGX0oVtppur6TZ1xJY5SrQST1z-HGqpaM/edit?usp=sharing)
2. **Reporte de bugs** en [tablero de Trello](https://trello.com/b/mcFdSOFM/grupo-3-challenge-qaa26)
3. **Suite de pruebas automatizadas** desarrollada con Cypress

---

## Requisitos previos

Antes de comenzar, asegurate de tener instalado:

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- [Git](https://git-scm.com/)

---

## Configuración inicial

Seguí estos pasos **solo la primera vez** que descargues el proyecto:

**1. Clonar el repositorio**

```bash
git clone https://github.com/LauPerovich/QAA26-Grupo3.git
```

**2. Entrar a la carpeta del proyecto**

```bash
cd QAA26-Grupo3
```

**3. Instalar las dependencias**

Este comando lee el archivo `package.json` e instala la versión exacta de Cypress configurada para el equipo:

```bash
npm install
```

---

## Cómo ejecutar las pruebas

Una vez completada la instalación, podés correr las pruebas de dos maneras:

**Modo interactivo (interfaz gráfica)**

Abre el panel de Cypress para seleccionar el navegador y ver las pruebas ejecutarse en tiempo real:

```bash
npx cypress open
```

**Modo headless (línea de comandos)**

Ejecuta todas las pruebas en segundo plano directamente desde la terminal:

```bash
npx cypress run
```

---

## Tecnologías utilizadas

- [Cypress](https://www.cypress.io/) — framework de testing end-to-end
- JavaScript — lenguaje base de la suite
- Fixtures — separación entre datos y lógica de prueba
