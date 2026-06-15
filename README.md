# QAA26-Grupo3

Repositorio del Challenge Final de QA Automation - Cohorte I de 2026 de Xacademy

Este proyecto contiene la suite de pruebas automatizadas utilizando **Cypress**. A continuación, se detallan los pasos necesarios para clonar el repositorio, configurar el entorno local y comenzar a colaborar de forma organizada.

---

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu computadora:

- **Node.js** (Versión LTS recomendada)
- **Git**

---

## 📥 Configuración Inicial (Primeros Pasos)

Sigue estos pasos únicamente la primera vez que descargues el proyecto:

1. **Clonar el repositorio**
   Abre tu terminal en la carpeta donde quieras guardar el proyecto y ejecuta:

   ```bash
   git clone https://github.com/LauPerovich/QAA26-Grupo3.git
   ```

2. **Entrar a la carpeta del proyecto**

   ```bash
   cd QAA26-Grupo3
   ```

3. **Instalar las dependencias**
   Este comando leerá el archivo `package.json` e instalará la versión exacta de Cypress configurada para el equipo:
   ```bash
   npm install
   ```

---

## 🛠️ Cómo Ejecutar Cypress

Una vez completada la instalación, puedes correr las pruebas de dos maneras:

- **Modo Interactivo (Interfaz Gráfica):**
  Para abrir el panel de Cypress, seleccionar el navegador y ver las pruebas ejecutarse visualmente:

  ```bash
  npx cypress open
  ```

- **Modo Headless (Línea de Comandos):**
  Para ejecutar todas las pruebas en segundo plano directamente en la terminal:
  ```bash
  npx cypress run
  ```
