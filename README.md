# 📚 Library Node.js Mini

Un proyecto práctico educativo desarrollado como parte del aprendizaje de **Node.js**, enfocado en la construcción de una **API RESTful completa** con conexión a **MongoDB**, manejo de **errores**, **seguridad**, **logs profesionales** y **buenas prácticas** para entornos de producción.

---

## 🚀 Objetivo del proyecto

El objetivo principal de este proyecto es poner en práctica los fundamentos de desarrollo backend con Node.js y Express, aplicando principios reales de arquitectura, seguridad y persistencia de datos.  
El proyecto simula un **mini sistema de gestión de libros**, ideal para aprender cómo crear, leer, actualizar y eliminar registros en una base de datos real.

---

## 🧠 Tecnologías utilizadas

| Tecnología | Uso principal |
|-------------|----------------|
| **Node.js** | Entorno de ejecución principal |
| **Express.js** | Framework para crear el servidor y las rutas REST |
| **MongoDB + Mongoose** | Base de datos NoSQL para persistencia de datos |
| **Dotenv** | Manejo de variables de entorno |
| **Helmet** | Protección ante ataques XSS y vulnerabilidades HTTP |
| **Express-Mongo-Sanitize** | Prevención de inyección NoSQL |
| **Rate-Limiter-Flexible** | Control de peticiones para prevenir flood y DDoS |
| **Cors** | Configuración de seguridad de origen cruzado |
| **Winston + Daily Rotate File** | Sistema de logging profesional con rotación diaria |
| **Nodemon** | Recarga automática en desarrollo |

---

## 🧩 Estructura del proyecto

library-nodejs-mini/
│
├── config/
│ ├── database.js # Conexión a MongoDB
│ ├── logger.js # Sistema de logs (Winston)
│
├── controllers/
│ └── booksController.js # Controladores de la API
│
├── middlewares/
│ ├── errorHandler.js # Manejador global de errores
│
├── models/
│ └── Book.js # Esquema de datos de MongoDB
│
├── routes/
│ └── booksRoutes.js # Definición de endpoints /api/books
│
├── .env # Variables de entorno
├── index.js # Punto de entrada principal
├── package.json
└── README.md

yaml
Copiar código

---

## ⚙️ Instalación y configuración

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/jthmarquez/library-nodejs-mini.git
cd library-nodejs-mini
2️⃣ Instalar dependencias
bash
Copiar código
npm install
3️⃣ Crear archivo .env
Crea un archivo .env en la raíz del proyecto con este contenido:

env
Copiar código
PORT=3000
MONGO_URI=mongodb://localhost:27017/librarydb
4️⃣ Iniciar MongoDB
Asegurate de tener MongoDB en ejecución localmente.
Podés usar MongoDB Compass o el servicio desde terminal:

bash
Copiar código
mongod
5️⃣ Ejecutar el servidor
Para desarrollo (con recarga automática):

bash
Copiar código
npm run dev
Para producción:

bash
Copiar código
npm start
📡 Endpoints disponibles
Método	Endpoint	Descripción
GET	/api/books	Lista todos los libros
GET	/api/books/:id	Muestra un libro por ID
POST	/api/books	Crea un nuevo libro
PUT	/api/books/:id	Actualiza un libro
DELETE	/api/books/:id	Elimina un libro

🔒 Seguridad implementada
✅ Helmet → Previene ataques comunes a cabeceras HTTP
✅ Express-Mongo-Sanitize → Evita inyección NoSQL
✅ Rate Limiting → Limita peticiones repetitivas
✅ CORS → Configura orígenes permitidos
✅ Error Handler centralizado → Captura errores globalmente
✅ Logs profesionales (Winston) → Registro con rotación diaria y timestamps

🧰 Buenas prácticas aplicadas
Separación por capas (config, controladores, modelos, rutas, middlewares)

Variables de entorno centralizadas con .env

Logs rotativos y con niveles (info, warn, error)

Validación y sanitización de datos

Manejo de errores uniforme

Código modular y documentado

🎓 Aprendizajes clave
Conectar y gestionar datos con MongoDB usando Mongoose

Configurar middlewares de seguridad en Express

Implementar logging profesional con Winston

Estructurar un backend escalable y mantenible

Manejar errores y excepciones de forma centralizada

Controlar flujo de peticiones con Rate Limiting

👨‍💻 Autor
Jonathan Márquez
Desarrollador en formación especializado en Back-End y Ciberseguridad.
📎 GitHub: jthmarquez
📎 LinkedIn: linkedin.com/in/jonathan-marquez-289127a1

🧩 Licencia
Este proyecto es de uso educativo y puede ser reutilizado libremente con fines de aprendizaje.
