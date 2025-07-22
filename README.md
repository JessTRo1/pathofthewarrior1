# Path of the Warrior

**Path of the Warrior** es una aplicación web Full Stack que combina tecnología moderna con valores clásicos de esfuerzo, disciplina y superación personal.

Desarrollada como proyecto final del curso Full Stack, incluye autenticación JWT, sistema de rutinas, ranking de usuarios y despliegue en cuatro entornos.

---

## Tecnologías utilizadas

### Frontend – React + Vite
- React 18
- Vite
- React Router DOM
- SCSS modular con metodología BEM
- Context API (`AuthContext`, `ThemeContext`, etc.)
- localStorage
- Hooks personalizados
- Efectos visuales: parallax, fade-in
- Fetch/axios

### Backend – Node.js + Express
- Express.js
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Bcrypt.js
- Dotenv
- Cors
- Nodemon
- Middleware para validación y autenticación

---

## Estructura del proyecto

pathofthewarrior1/
├── frontend/
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── assets/ → Imágenes, logos, etc.
│ │ ├── components/ → Componentes reutilizables (Navbar, Card, Button...)
│ │ ├── context/ → Contexto global (auth, darkMode…)
│ │ ├── hooks/ → Hooks personalizados (useAuth, useRutinas…)
│ │ ├── pages/ → Vistas principales (Login, Dashboard, Rutinas…)
│ │ ├── services/ → Funciones que hacen fetch a la API
│ │ ├── styles/ → Archivos SCSS + BEM
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── .env
│ ├── vite.config.js
│ └── package.json
│
└── backend/
├── controllers/ → Lógica de negocio (rutinas, usuarios, auth…)
├── middlewares/ → Autenticación, validación, control de errores
├── models/ → Modelos de Mongoose (User, Rutina, Comentario…)
├── routes/ → Rutas Express agrupadas por entidad
├── app.js → Configuración de middlewares y rutas
├── server.js → Entrada principal del servidor
├── .env
└── package.json

## Instalación del backend

cd backend
npm install
npm run dev

.env necesario

## Instalación del frontend

cd ../frontend
npm install
npm run dev

.env necesario
