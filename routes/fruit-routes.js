const express = require('express');
const { body } = require('express-validator');

const fruitController = require('../controllers/fruit-controller');

const router = new express.Router();

router.get('/get/all', fruitController.getAllFruits);
router.get('/get/:fruitId', fruitController.getFruitById);

router.post('/add', [
    body('name').not().isEmpty(),
    body('rating').not().isEmpty(),
    body('taste').not().isEmpty()
], fruitController.addFruit);

module.exports = router;