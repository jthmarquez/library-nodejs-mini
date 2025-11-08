// models/Book.js
// ============================================================
// 📘 MODELO DE LIBRO (Book)
// ------------------------------------------------------------
// Define la estructura del documento en MongoDB y sus validaciones
// para garantizar que los datos sean consistentes y seguros.
// ============================================================

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    minlength: [2, 'El título debe tener al menos 2 caracteres'],
    maxlength: [100, 'El título no puede superar los 100 caracteres']
  },
  author: {
    type: String,
    required: [true, 'El autor es obligatorio'],
    trim: true,
    minlength: [2, 'El autor debe tener al menos 2 caracteres']
  },
  year: {
    type: Number,
    min: [1000, 'El año debe ser válido'],
    max: [new Date().getFullYear(), 'El año no puede ser en el futuro']
  },
  genre: {
    type: String,
    enum: ['Ficción', 'No Ficción', 'Educativo', 'Fantasía', 'Otro'],
    default: 'Otro'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Exporta el modelo con nombre "Book"
module.exports = mongoose.model('Book', bookSchema);

// 💬 Explicación rápida:
// - trim: elimina espacios innecesarios.
// - required: evita documentos incompletos.
// - minlength / maxlength: fuerza longitudes seguras.
// - enum: restringe valores posibles.
// - Validaciones se ejecutan automáticamente al crear o actualizar.
