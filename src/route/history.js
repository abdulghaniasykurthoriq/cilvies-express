const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history');

router.post('/', historyController.createHistory);

router.get('/', historyController.retrieveAllHistory);

module.exports = router