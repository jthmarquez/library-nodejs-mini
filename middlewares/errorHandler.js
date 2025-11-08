// middlewares/errorHandler.js
const logger = require('../config/logger'); // 🪵 Importamos el logger

function errorHandler(err, req, res, next) {
  // Antes: console.error()
  logger.error(err.stack || err.message);

  res.status(500).json({
    message: 'Error interno del servidor',
    details: err.message
  });
}

module.exports = errorHandler;


//📘 Explicación:
//- Este middleware captura cualquier error en controladores o rutas.
//- En vez de console.error, usa logger.error para registrar el error en archivo y consola.
//- Se coloca siempre al final de todas las rutas en el archivo principal.
