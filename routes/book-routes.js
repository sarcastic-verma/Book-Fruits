const express = require('express');
const { body } = require('express-validator');

const bookController = require('../controllers/book-controller');
const router = new express.Router();

router.get('/get/all', bookController.getAllBooks);
router.get('/get/:bookId', bookController.getBookById);

router.post('/add', [
    body('name').not().isEmpty(),
    body('author').not().isEmpty(),
    body('numberOfReaders').not().isEmpty(),
], bookController.addBook);

module.exports = router;