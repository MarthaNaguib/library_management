// src/models/borrowersModel.js

const pool = require('../db');

async function registerBorrower(name, email, registered_date) {
    try {
        const query = `
            INSERT INTO borrowers (name, email, registered_date)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [name, email, registered_date];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error registering borrower: ${error.message}`);
    }}

async function updateBorrower(id, name, email) {
    try {
        const query = `
            UPDATE borrowers
            SET name = $1, email = $2
            WHERE id = $3
            RETURNING *
        `;
        const values = [name,email, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error updating borrower: ${error.message}`);
    }}

async function deleteBorrower(id) {
    try {
        const query = `
            DELETE FROM borrowers
            WHERE id = $1
            RETURNING *
        `;
        const values = [id];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            throw new Error(`Borrower with ID ${id} not found`);
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error deleting borrower: ${error.message}`);
    }}

async function getAllBorrowers() {
    try {
        const query = `
            SELECT *
            FROM borrowers
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw new Error(`Error listing borrowers: ${error.message}`);
    }}

module.exports = {
    registerBorrower,
    updateBorrower,
    deleteBorrower,
    getAllBorrowers
};
