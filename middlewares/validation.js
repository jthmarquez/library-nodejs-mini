// middlewares/validation.js
// ============================================================
// 🧹 Middleware de validación y sanitización
// ------------------------------------------------------------
// Usa express-validator para validar y limpiar datos de entrada.
// Se aplica antes de que los controladores interactúen con la base.
// ============================================================

const { body, validationResult } = require('express-validator');

// 📘 Reglas de validación para libros
exports.validateBook = [
  body('title')
    .trim()
    .isLength({ min: 2 }).withMessage('El título debe tener al menos 2 caracteres')
    .escape(),

  body('author')
    .trim()
    .notEmpty().withMessage('El autor es obligatorio')
    .escape(),

  body('year')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('El año debe ser válido'),

  body('genre')
    .optional()
    .isString()
    .isIn(['Ficción', 'No Ficción', 'Educativo', 'Fantasía', 'Otro'])
    .withMessage('Género inválido'),

  // 📤 Resultado final: si hay errores, los devuelve al cliente.
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  }
];
