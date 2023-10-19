const express = require('express');

const mainController = require('../controllers/mainController');
const router = express.Router();

const validations = require('../middlewares/validations')

router.get('/', mainController.index)
router.post('/', validations, mainController.processCreditCardData)

module.exports = router;