// src/routes/borrowersRouter.js

const express = require('express');
const router = express.Router();
const borrowersController = require('../controllers/borrowersController');

router.post('/', borrowersController.registerBorrower);
router.put('/:id', borrowersController.updateBorrower);
router.delete('/:id', borrowersController.deleteBorrower);
router.get('/', borrowersController.getAllBorrowers);

module.exports = router;
