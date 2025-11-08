// config/database.js
// ------------------
// Este módulo encapsula la lógica de conexión a MongoDB usando Mongoose.
// Exportamos una función async `connectDB` que intenta conectar y
// lanza un error si no puede. También exportamos `closeDB` para cerrar
// la conexión correctamente (útil en shutdown gracioso o tests).

const mongoose = require('mongoose');
const logger = require('./logger'); // 🪵 Importamos el logger

// Opciones recomendadas para Mongoose (evitan warnings y usan drivers modernos)
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/librarydb';
  try {
    await mongoose.connect(uri, mongooseOptions);
    // Antes: console.log()
    logger.info(`✅ Conectado a MongoDB: ${uri}`);
  } catch (err) {
    // Antes: console.error()
    logger.error(`❌ Error al conectar a MongoDB: ${err.message}`);
    throw err; // importante: el caller debe manejar este error
  }
}

// Función para cerrar la conexión (útil para SIGINT/SIGTERM o tests)
async function closeDB() {
  try {
    await mongoose.connection.close();
    // Antes: console.log()
    logger.info('🔒 Conexión a MongoDB cerrada correctamente.');
  } catch (err) {
    // Antes: console.warn()
    logger.warn(`⚠️ Error cerrando la conexión a MongoDB: ${err.message}`);
  }
}

module.exports = { connectDB, closeDB };


//📘 Qué hace y por qué:
//- connectDB() intenta conectar y lanza el error si falla (para no levantar el server sin DB).
//- closeDB() cierra la conexión cuando la app termina (buenas prácticas en despliegues/tests).
