const express = require('express');
const AgencyController = require('../controllers/agencyController');

const router = express.Router();

router.post('/', AgencyController.createAgency); // Create an agency
router.get('/', AgencyController.getAllAgencies); // Get all agencies with filtering/search
router.get('/:id', AgencyController.getAgencyById); // Get a specific agency by ID
router.put('/:id', AgencyController.updateAgency); // Update an agency by ID
router.delete('/:id', AgencyController.deleteAgency); // Delete an agency by ID

module.exports = router;