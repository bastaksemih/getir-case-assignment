const router = require('express').Router();
const recordController = require('../controllers/records');

router.post('/getFilteredRecords', recordController.getFilteredRecords);
module.exports = router;
