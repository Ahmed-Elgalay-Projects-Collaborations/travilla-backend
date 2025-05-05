const express = require('express');
const AdminLogsController = require('../controllers/adminLogsController');

const router = express.Router();

router.post('/', AdminLogsController.createLog); // Create a new log
router.get('/', AdminLogsController.getAllLogs); // Get all logs
router.get('/:id', AdminLogsController.getLogById); // Get a specific log by ID
router.delete('/:id', AdminLogsController.deleteLog); // Delete a log by ID

module.exports = router;