// ============================================================================
// 🎯 CONTROLADOR DE LIBROS (BooksController)
// ============================================================================
// Este controlador maneja todas las operaciones CRUD (crear, leer, actualizar,
// eliminar) sobre los libros, pero ahora en una base de datos MongoDB.
//
// En lugar de usar archivos JSON, se usa el modelo Book definido con Mongoose.
// ============================================================================

const Book = require('../models/Book'); // Importamos el modelo

// ----------------------------------------------------
// 🟢 Obtener todos los libros
// ----------------------------------------------------
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find(); // Busca todos los documentos
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los libros', error });
  }
};

// ----------------------------------------------------
// 🔵 Crear un nuevo libro
// ----------------------------------------------------
exports.addBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body); // Crea un nuevo documento
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el libro', error });
  }
};

// ----------------------------------------------------
// 🟡 Obtener un libro por ID
// ----------------------------------------------------
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el libro', error });
  }
};

// ----------------------------------------------------
// 🟠 Actualizar un libro
// ----------------------------------------------------
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Devuelve el documento actualizado
    );
    if (!updatedBook)
      return res.status(404).json({ message: 'Libro no encontrado' });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el libro', error });
  }
};

// ----------------------------------------------------
// 🔴 Eliminar un libro
// ----------------------------------------------------
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: 'Libro no encontrado' });
    res.status(200).json({ message: 'Libro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el libro', error });
  }
};
