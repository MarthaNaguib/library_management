// src/controllers/booksController.js

const booksModel = require('../models/booksModel');

async function addBook(req, res) {
    try {
        const { title, author, isbn, available_quantity, shelf_location } = req.body;
        console.log('This is a log message.'+title);
        console.log('This is a log message.'+author);
        console.log('This is a log message.'+available_quantity);
        console.log('This is a log message.'+shelf_location);
        const newBook = await booksModel.addBook(title, author, isbn, available_quantity, shelf_location);


        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateBook(req, res) {
    try {
        const { id } = req.params;
        const { title, author, isbn, available_quantity, shelf_location } = req.body;
        const updatedBook = await booksModel.updateBook(id, title, author, isbn, available_quantity, shelf_location);
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteBook(req, res) {
    try {
        const { id } = req.params;
        await booksModel.deleteBook(id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllBooks(req, res) {
    try {
        const books = await booksModel.getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function searchBooks(req, res) {
    try {
        const { query } = req.query;
        console.log("query "+query);
        const books = await booksModel.searchBooks(query);
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function returnBook(req, res) {
    try {
        const { bookId, borrowerId } = req.params;
        await booksModel.returnBook(bookId, borrowerId);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getBorrowedBooksByBorrower(req, res) {
    try {
        const { borrowerId } = req.params;
        const borrowedBooks = await booksModel.getBorrowedBooksByBorrower(borrowerId);
        res.json(borrowedBooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function checkOutBook(req, res) {
    try {
        const { bookId, borrowerId, due_date } = req.body;
        console.log(due_date);
        const checkedOutBook = await booksModel.checkOutBook(bookId, borrowerId, due_date);
        res.status(201).json(checkedOutBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function listOverdueBooks(req, res) {
    try {
        const overdueBooks = await booksModel.listOverdueBooks();
        res.json(overdueBooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addBook,
    updateBook,
    deleteBook,
    getAllBooks,
    searchBooks,
    checkOutBook,
    returnBook,
    getBorrowedBooksByBorrower,
    listOverdueBooks
};