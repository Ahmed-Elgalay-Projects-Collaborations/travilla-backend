const AdminLog = require('../models/mongo/AdminLog');

class AdminLogsController {
  // Create a new admin log
  static async createLog(req, res) {
    const { action, user_id, details } = req.body;

    try {
      const newLog = new AdminLog({
        action,
        user_id,
        details,
      });

      await newLog.save();
      res.status(201).json({ message: 'Admin log created successfully', log: newLog });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create admin log', error: error.message });
    }
  }

  // Get all admin logs
  static async getAllLogs(req, res) {
    try {
      const logs = await AdminLog.find().sort({ timestamp: -1 }); // Sort by latest logs
      res.status(200).json(logs);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch admin logs', error: error.message });
    }
  }

  // Get a specific admin log by ID
  static async getLogById(req, res) {
    const { id } = req.params;

    try {
      const log = await AdminLog.findById(id);
      if (!log) {
        return res.status(404).json({ message: 'Admin log not found' });
      }
      res.status(200).json(log);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch admin log', error: error.message });
    }
  }

  // Delete an admin log by ID
  static async deleteLog(req, res) {
    const { id } = req.params;

    try {
      const deletedLog = await AdminLog.findByIdAndDelete(id);
      if (!deletedLog) {
        return res.status(404).json({ message: 'Admin log not found' });
      }
      res.status(200).json({ message: 'Admin log deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete admin log', error: error.message });
    }
  }
}

module.exports = AdminLogsController;