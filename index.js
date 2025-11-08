// index.js
// Punto de entrada: crea app Express, espera la conexión a MongoDB,
// arranca el server HTTP, inicializa Socket.IO y gestiona shutdown gracioso.

require('dotenv').config(); // carga variables desde .env (si existe)
const express = require('express');
const cors = require('cors');

// 🧩 Seguridad: Helmet, Mongo Sanitize, Rate Limit
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

// 🪵 Logger centralizado (Winston)
const logger = require('./config/logger');

const { connectDB, closeDB } = require('./config/database'); // nuestro módulo
const booksRoutes = require('./routes/books.routes');
const errorHandler = require('./middlewares/errorHandler');
const { init: initSockets } = require('./sockets');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// ---------------------------------------------
// 🔐 Configuración de seguridad
// ---------------------------------------------

// Helmet protege la app configurando encabezados HTTP seguros (XSS, clickjacking, etc.)
app.use(helmet());

// Sanitiza solo req.body, req.params y req.query sin romper Express 5
app.use((req, res, next) => {
  try {
    if (req.body && typeof req.body === 'object') mongoSanitize.sanitize(req.body);
    if (req.params && typeof req.params === 'object') mongoSanitize.sanitize(req.params);
    if (req.query && typeof req.query === 'object') {
      const cleanQuery = mongoSanitize.sanitize({ ...req.query });
      Object.assign(req.query, cleanQuery);
    }
  } catch (err) {
    // Antes: console.warn()
    logger.warn(`Error sanitizando request: ${err.message}`);
  }
  next();
});

// Limita la cantidad de peticiones por IP (previene ataques por fuerza bruta / flooding)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // ⏱️ Ventana de 15 minutos
  max: 100, // 🔢 Máximo de 100 peticiones por IP
  message: '⛔ Demasiadas solicitudes desde esta IP, intentá nuevamente más tarde.'
});
app.use(limiter);

// ---------------------------------------------
// Fin de la configuración de seguridad
// ---------------------------------------------

// Servir archivos estáticos
app.use(express.static('public'));

// Rutas de la API
app.use('/api/books', booksRoutes);

// Ruta raíz de comprobación (opcional)
app.get('/', (req, res) => {
  res.send('📚 API Library-NodeJS-Mini — Servidor levantado correctamente.');
});

// Middleware de manejo de errores (siempre al final)
app.use(errorHandler);

// ---------------------------------------------------
// STARTUP: conectar a Mongo y luego levantar servidor
// ---------------------------------------------------
(async function startServer() {
  try {
    // 1) Conectar a MongoDB y esperar a que esté listo
    await connectDB();

    // 2) Iniciar servidor HTTP solo después de que la DB esté disponible
    const server = app.listen(PORT, () => {
      // Antes: console.log()
      logger.info(`Servidor corriendo en: http://localhost:${PORT}`);
    });

    // 3) Inicializar Socket.IO pasándole el server HTTP
    const io = initSockets(server);

    // Exponer io globalmente o en app.locals si lo necesitás
    app.locals.io = io;

    // 4) Manejo de señales para shutdown gracioso
    const gracefulShutdown = async () => {
      logger.info('🔁 Iniciando shutdown gracioso...');
      server.close(async (err) => {
        if (err) {
          // Antes: console.error()
          logger.error(`Error cerrando servidor HTTP: ${err.message}`);
          process.exit(1);
        }
        // Cerramos la DB y salimos
        await closeDB();
        logger.info('✅ Servidor cerrado limpiamente.');
        process.exit(0);
      });
    };

    process.on('SIGINT', gracefulShutdown);   // Ctrl+C
    process.on('SIGTERM', gracefulShutdown);  // kill, despliegues
  } catch (err) {
    // Antes: console.error()
    logger.error(`No se pudo iniciar la aplicación por error de inicialización: ${err.message}`);
    process.exit(1);
  }
})();


//📘 Por qué esta estructura es mejor:
//- Si Mongo no está disponible, la app no arranca (evita errores en controladores).
//- Esperamos la conexión await connectDB() antes de app.listen().
//- Shutdown gracioso cierra la conexión a Mongo limpiamente (buenas prácticas en despliegue/test).
