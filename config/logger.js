// ------------------------------------------------------------
// config/logger.js
// ------------------------------------------------------------
// Configura un sistema de logs profesional con Winston + rotación diaria.
// Crea automáticamente la carpeta /logs si no existe.
// ------------------------------------------------------------

const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file'); // plugin para rotar los archivos automáticamente
const { combine, timestamp, printf, colorize } = format;

// 📁 Aseguramos que la carpeta 'logs' exista
const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// 📄 Formato de salida de los logs
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

// 📦 Transporte de archivo con rotación diaria
const dailyRotateTransport = new transports.DailyRotateFile({
  filename: path.join(logDir, '%DATE%-server.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  handleExceptions: true,
});

// 🧰 Creación del logger
const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // 🔹 Consola (para desarrollo)
    new transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'HH:mm:ss' }),
        logFormat
      ),
      handleExceptions: true,
    }),
    // 🔹 Archivos rotativos (para producción)
    dailyRotateTransport,
  ],
  exitOnError: false,
});

// 🧩 Ejemplo:
// logger.info('Servidor iniciado correctamente');
// logger.warn('Advertencia: datos incompletos');
// logger.error('Error crítico en conexión con MongoDB');

module.exports = logger;
