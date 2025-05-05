const express = require('express');
const TripController = require('../controllers/tripController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/', upload.fields([{ name: 'photos', maxCount: 10 }]), TripController.createTrip); // Create a trip with photos
router.put('/:id', upload.fields([{ name: 'photos', maxCount: 10 }]), TripController.updateTrip); // Update a trip with photos
router.get('/', TripController.getAllTrips); // Get all trips with filtering/search
router.get('/:id', TripController.getTripById); // Get a specific trip by ID
router.delete('/:id', TripController.deleteTrip); // Delete a trip by ID

module.exports = router;