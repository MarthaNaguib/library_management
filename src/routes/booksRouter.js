// src/routes/booksRouter.js

const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.post('/', booksController.addBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);
router.get('/', booksController.getAllBooks);
router.get('/search', booksController.searchBooks);
router.post('/checkout', booksController.checkOutBook);
router.delete('/return/:bookId/:borrowerId', booksController.returnBook);
router.get('/borrowers/:borrowerId', booksController.getBorrowedBooksByBorrower);
router.get('/overdue', booksController.listOverdueBooks); 

module.exports = router;