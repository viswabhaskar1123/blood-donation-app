const express = require('express');
const { getBloodStock } = require('../controllers/bloodController');

const router = express.Router();

router.get('/stock', getBloodStock);

module.exports = router;
