// src/models/booksModel.js

const pool = require('../db');

async function checkOutBook(bookId, borrowerId, dueDate) {
    try {
        const query = `
            INSERT INTO borrowings (book_id, borrower_id, due_date)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [bookId, borrowerId, dueDate];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error checking out book: ${error.message}`);
    }
}

async function listOverdueBooks() {
    try {
        const query = `
            SELECT b.*
            FROM borrowings bor
            JOIN books b ON bor.book_id = b.id
            WHERE bor.due_date < CURRENT_TIMESTAMP
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw new Error(`Error listing overdue books: ${error.message}`);
    }
}


//

async function addBook(title, author, isbn, quantity, shelfLocation) {
    try {
        const query = `
            INSERT INTO books (title, author, isbn, available_quantity , shelf_location)
            VALUES ($1, $2, $3,$4,$5)
            RETURNING *
        `;
        const values = [title, author, isbn, quantity, shelfLocation];
        console.log('This is a log message.'+title);
        console.log('This is a log message.'+author);
        console.log('This is a log message.'+quantity);
        console.log('This is a log message.'+shelfLocation);
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error adding book: ${error.message}`);
    }}

async function updateBook(id, title, author, isbn, available_quantity, shelf_location) {
    try {
        const query = `
            UPDATE books
            SET title = $1, author = $2, isbn = $3, available_quantity = $4, shelf_location = $5
            WHERE id = $6
            RETURNING *
        `;
        const values = [title, author, isbn, available_quantity, shelf_location, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error updating book: ${error.message}`);
    }
}

async function deleteBook(id) {
    try {
        const query = `
            DELETE FROM books
            WHERE id = $1
            RETURNING *
        `;
        const values = [id];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            throw new Error(`Book with ID ${id} not found`);
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error deleting book: ${error.message}`);
    }

}

async function getAllBooks() {
    try {
        const query = `
            SELECT *
            FROM books
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw new Error(`Error listing books: ${error.message}`);
    }
}

async function searchBooks(query) {
    try {
        const searchText = `%${query}%`; 
        const sqlQuery = `
            SELECT *
            FROM books
            WHERE title ILIKE $1 OR author ILIKE $1 OR isbn ILIKE $1
        `;
        console.log("sqlQuery "+sqlQuery)
        console.log("searchText "+searchText)

        const result = await pool.query(sqlQuery, [searchText]);
        return result.rows;
    } catch (error) {
        throw new Error(`Error searching books: ${error.message}`);
    }}


async function returnBook(bookId, borrowerId) {
    try {
        const query = `
            DELETE FROM borrowings
            WHERE book_id = $1 AND borrower_id = $2
            RETURNING *
        `;
        const values = [bookId, borrowerId];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            throw new Error(`Book with ID ${bookId} borrowed by borrower with ID ${borrowerId} not found`);
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error returning book: ${error.message}`);
    }}

async function getBorrowedBooksByBorrower(borrowerId) {
    try {
        const query = `
            SELECT b.*
            FROM borrowings bor
            JOIN books b ON bor.book_id = b.id
            WHERE bor.borrower_id = $1
        `;
        const values = [borrowerId];
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        throw new Error(`Error fetching borrowed books by borrower: ${error.message}`);
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
