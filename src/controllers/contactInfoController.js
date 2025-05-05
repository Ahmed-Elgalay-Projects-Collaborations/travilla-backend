const ContactInfo = require('../models/mysql/ContactInfo');

class ContactInfoController {
  // Create a new contact info
  static async createContactInfo(req, res) {
    const { agency_id, name, role, phoneNumber, WhatsappNumber, email } = req.body;

    try {
      const newContactInfo = await ContactInfo.create({
        agency_id,
        name,
        role,
        phoneNumber,
        WhatsappNumber,
        email,
      });

      res.status(201).json({ message: 'Contact info created successfully', contactInfo: newContactInfo });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create contact info', error: error.message });
    }
  }

  // Get all contact info with optional filtering and searching
  static async getAllContactInfo(req, res) {
    const { agency_id, role, search } = req.query;

    try {
      const whereClause = {};

      // Add filters if provided
      if (agency_id) whereClause.agency_id = agency_id;
      if (role) whereClause.role = role;

      // Add search functionality (e.g., search by name or email)
      if (search) {
        whereClause.$or = [
          { name: { $like: `%${search}%` } },
          { email: { $like: `%${search}%` } },
        ];
      }

      const contactInfoList = await ContactInfo.findAll({ where: whereClause });
      res.status(200).json(contactInfoList);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch contact info', error: error.message });
    }
  }

  // Get a specific contact info by ID
  static async getContactInfoById(req, res) {
    const { id } = req.params;

    try {
      const contactInfo = await ContactInfo.findByPk(id);

      if (!contactInfo) {
        return res.status(404).json({ message: 'Contact info not found' });
      }

      res.status(200).json(contactInfo);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch contact info', error: error.message });
    }
  }

  // Update a contact info by ID
  static async updateContactInfo(req, res) {
    const { id } = req.params;
    const { name, role, phoneNumber, WhatsappNumber, email } = req.body;

    try {
      const contactInfo = await ContactInfo.findByPk(id);

      if (!contactInfo) {
        return res.status(404).json({ message: 'Contact info not found' });
      }

      contactInfo.name = name || contactInfo.name;
      contactInfo.role = role || contactInfo.role;
      contactInfo.phoneNumber = phoneNumber || contactInfo.phoneNumber;
      contactInfo.WhatsappNumber = WhatsappNumber || contactInfo.WhatsappNumber;
      contactInfo.email = email || contactInfo.email;

      await contactInfo.save();

      res.status(200).json({ message: 'Contact info updated successfully', contactInfo });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update contact info', error: error.message });
    }
  }

  // Delete a contact info by ID
  static async deleteContactInfo(req, res) {
    const { id } = req.params;

    try {
      const contactInfo = await ContactInfo.findByPk(id);

      if (!contactInfo) {
        return res.status(404).json({ message: 'Contact info not found' });
      }

      await contactInfo.destroy();

      res.status(200).json({ message: 'Contact info deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete contact info', error: error.message });
    }
  }
}

module.exports = ContactInfoController;