const express = require('express');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const UserController = require('../controllers/userController');

const router = express.Router();

// Public routes
router.post('/login', UserController.login);

// Protected routes
router.get('/profile', authenticate, UserController.getProfile);

// Admin-only routes
router.get('/admin', authenticate, authorize(['admin']), UserController.adminDashboard);

// Agency-only routes
router.get('/agency', authenticate, authorize(['agency']), UserController.agencyDashboard);

module.exports = router;