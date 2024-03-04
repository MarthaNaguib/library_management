// src/controllers/borrowersController.js

const borrowersModel = require('../models/borrowersModel');

async function registerBorrower(req, res) {
    try {
        const { name, email, registered_date } = req.body;
        const actualRegisteredDate = registered_date || new Date(); // Use the provided value or current timestamp

        const newBorrower = await borrowersModel.registerBorrower(name, email, actualRegisteredDate);
        res.status(201).json(newBorrower);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateBorrower(req, res) {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const updatedBorrower = await borrowersModel.updateBorrower(id, name, email);
        res.json(updatedBorrower);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteBorrower(req, res) {
    try {
        const { id } = req.params;
        await borrowersModel.deleteBorrower(id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllBorrowers(req, res) {
    try {
        const borrowers = await borrowersModel.getAllBorrowers();
        res.json(borrowers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    registerBorrower,
    updateBorrower,
    deleteBorrower,
    getAllBorrowers
};
