// routes/books.routes.js
// =======================================================================
// 📚 RUTAS DE LIBROS (Books Routes)
// =======================================================================
// Este archivo define los endpoints REST que permiten interactuar con los
// libros almacenados en MongoDB. Cada ruta se conecta con una función del
// controlador (BooksController) que implementa la lógica del CRUD.
//
// Estructura REST usada:
//   GET    /api/books        → Obtener todos los libros
//   GET    /api/books/:id    → Obtener un libro por ID
//   POST   /api/books        → Crear un nuevo libro
//   PUT    /api/books/:id    → Actualizar un libro existente
//   DELETE /api/books/:id    → Eliminar un libro
//
// Nota: Asegurarse de que el nombre del archivo del controlador coincida
// exactamente en mayúsculas/minúsculas con el que se requiere aquí.
// =======================================================================
const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const { validateBook } = require('../middlewares/validation');

// Endpoints
router.get('/', booksController.getBooks);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.addBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;


//📘 Explicación:
//express.Router() crea un mini-router que luego se “enchufa” al servidor principal (index.js).
//Cada ruta define el método HTTP y la función del controlador que debe ejecutarse.
// - validateBook se ejecuta ANTES del controlador.
// - Si hay errores, la petición no llega al controlador.
// - Protege la base y mantiene consistencia de datos.