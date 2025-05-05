const User = require('../models/mysql/User');

class UserController {
  // Login method
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await user.checkPassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = user.generateJWT();
      res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

    // Register method
    static async register(req, res) {
        const { name, email, password, role } = req.body;
    
        try {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
            }
    
            const newUser = await User.create({ name, email, password, role });
            const token = newUser.generateJWT();
            res.status(201).json({ token, user: { id: newUser.id, name: newUser.name, role: newUser.role } });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

  // Get profile method (for authenticated users)
  static async getProfile(req, res) {
    try {
      const user = req.user; // Populated by the `authenticate` middleware
      res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  // Admin-only method
  static async adminDashboard(req, res) {
    try {
      res.json({ message: 'Welcome to the admin dashboard!' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  // Agency-only method
  static async agencyDashboard(req, res) {
    try {
      res.json({ message: 'Welcome to the agency dashboard!' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  // getting all users with pagination
    static async getAllUsers(req, res) {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
    
        try {
        const users = await User.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        res.json(users);
        } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

  // Logout method
  static async logout(req, res) {
    try {
      // Invalidate the token by clearing it on the client side
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

}


module.exports = UserController;