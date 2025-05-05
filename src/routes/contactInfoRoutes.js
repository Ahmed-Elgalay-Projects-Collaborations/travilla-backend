const express = require('express');
const ContactInfoController = require('../controllers/contactInfoController');

const router = express.Router();

router.post('/', ContactInfoController.createContactInfo); // Create a contact info
router.get('/', ContactInfoController.getAllContactInfo); // Get all contact info with filtering/search
router.get('/:id', ContactInfoController.getContactInfoById); // Get a specific contact info by ID
router.put('/:id', ContactInfoController.updateContactInfo); // Update a contact info by ID
router.delete('/:id', ContactInfoController.deleteContactInfo); // Delete a contact info by ID

module.exports = router;