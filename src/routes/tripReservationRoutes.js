const express = require('express');
const TripReservationController = require('../controllers/tripReservationController');

const router = express.Router();

router.post('/', TripReservationController.createReservation); // Create a reservation
router.get('/', TripReservationController.getAllReservations); // Get all reservations with filtering/search
router.get('/:id', TripReservationController.getReservationById); // Get a specific reservation by ID
router.put('/:id', TripReservationController.updateReservation); // Update a reservation by ID
router.delete('/:id', TripReservationController.deleteReservation); // Delete a reservation by ID

module.exports = router;