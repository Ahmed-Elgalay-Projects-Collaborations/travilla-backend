const express = require('express');
const HotelReservationController = require('../controllers/hotelReservationController');

const router = express.Router();

router.post('/', HotelReservationController.createReservation); // Create a reservation
router.get('/', HotelReservationController.getAllReservations); // Get all reservations with filtering/search
router.get('/:id', HotelReservationController.getReservationById); // Get a specific reservation by ID
router.put('/:id', HotelReservationController.updateReservation); // Update a reservation by ID
router.delete('/:id', HotelReservationController.deleteReservation); // Delete a reservation by ID

module.exports = router;