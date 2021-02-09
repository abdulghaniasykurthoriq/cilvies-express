const express = require("express");
const router = express.Router();
const totalHistoryController = require('../controllers/totalHistory');


router.get('/', totalHistoryController.retrieveAllHistory);

router.get('/:id', totalHistoryController.retrieveById);

router.post('/', totalHistoryController.createTotalHistory)

router.put('/:id', totalHistoryController.updateAllHistory);

module.exports = router