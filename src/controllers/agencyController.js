const Agency = require('../models/mysql/Agency');

class AgencyController {
  // Create a new agency
  static async createAgency(req, res) {
    const { agencyName, description, status, aboutUs } = req.body;

    try {
      const newAgency = await Agency.create({
        agencyName,
        description,
        status,
        aboutUs,
      });

      res.status(201).json({ message: 'Agency created successfully', agency: newAgency });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create agency', error: error.message });
    }
  }

  // Get all agencies with optional filtering
  static async getAllAgencies(req, res) {
    const { status, search } = req.query;

    try {
      const whereClause = {};

      // Add filters if provided
      if (status) whereClause.status = status;

      // Add search functionality (e.g., search by agency name or description)
      if (search) {
        whereClause.$or = [
          { agencyName: { $like: `%${search}%` } },
          { description: { $like: `%${search}%` } },
        ];
      }

      const agencies = await Agency.findAll({ where: whereClause });
      res.status(200).json(agencies);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch agencies', error: error.message });
    }
  }

  // Get a specific agency by ID
  static async getAgencyById(req, res) {
    const { id } = req.params;

    try {
      const agency = await Agency.findByPk(id);

      if (!agency) {
        return res.status(404).json({ message: 'Agency not found' });
      }

      res.status(200).json(agency);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch agency', error: error.message });
    }
  }

  // Update an agency by ID
  static async updateAgency(req, res) {
    const { id } = req.params;
    const { agencyName, description, status, aboutUs } = req.body;

    try {
      const agency = await Agency.findByPk(id);

      if (!agency) {
        return res.status(404).json({ message: 'Agency not found' });
      }

      agency.agencyName = agencyName || agency.agencyName;
      agency.description = description || agency.description;
      agency.status = status || agency.status;
      agency.aboutUs = aboutUs || agency.aboutUs;

      await agency.save();

      res.status(200).json({ message: 'Agency updated successfully', agency });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update agency', error: error.message });
    }
  }

  // Delete an agency by ID
  static async deleteAgency(req, res) {
    const { id } = req.params;

    try {
      const agency = await Agency.findByPk(id);

      if (!agency) {
        return res.status(404).json({ message: 'Agency not found' });
      }

      await agency.destroy();

      res.status(200).json({ message: 'Agency deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete agency', error: error.message });
    }
  }
}

module.exports = AgencyController;