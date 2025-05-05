const express = require('express');
const HotelController = require('../controllers/hotelController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/', upload.fields([{ name: 'photos', maxCount: 10 }]), HotelController.createHotel); // Create a hotel with photos
router.put('/:id', upload.fields([{ name: 'photos', maxCount: 10 }]), HotelController.updateHotel); // Update a hotel with photos
router.get('/', HotelController.getAllHotels); // Get all hotels with filtering/search
router.get('/:id', HotelController.getHotelById); // Get a specific hotel by ID
router.delete('/:id', HotelController.deleteHotel); // Delete a hotel by ID

module.exports = router;