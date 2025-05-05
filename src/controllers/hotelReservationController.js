const HotelReservation = require('../models/mysql/HotelReservation');

class HotelReservationController {
  // Create a new hotel reservation
  static async createReservation(req, res) {
    const { user_id, hotel_id, status, start_date, end_date, room_type } = req.body;

    try {
      const newReservation = await HotelReservation.create({
        user_id,
        hotel_id,
        status,
        start_date,
        end_date,
        room_type,
      });

      res.status(201).json({ message: 'Hotel reservation created successfully', reservation: newReservation });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create hotel reservation', error: error.message });
    }
  }

  // Get all hotel reservations with filtering and searching
  static async getAllReservations(req, res) {
    const { user_id, hotel_id, status, search } = req.query;

    try {
      const whereClause = {};

      // Add filters if provided
      if (user_id) whereClause.user_id = user_id;
      if (hotel_id) whereClause.hotel_id = hotel_id;
      if (status) whereClause.status = status;

      // Add search functionality (e.g., search by hotel name or user name)
      if (search) {
        whereClause.$or = [
          { '$Hotel.name$': { $like: `%${search}%` } }, // Assuming Hotel has a `name` field
          { '$User.name$': { $like: `%${search}%` } }, // Assuming User has a `name` field
        ];
      }

      const reservations = await HotelReservation.findAll({
        where: whereClause,
        include: [
          { model: require('../models/mysql/Hotel'), as: 'Hotel' }, // Include Hotel details
          { model: require('../models/mysql/User'), as: 'User' },   // Include User details
        ],
      });

      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch hotel reservations', error: error.message });
    }
  }

  // Get a specific hotel reservation by ID
  static async getReservationById(req, res) {
    const { id } = req.params;

    try {
      const reservation = await HotelReservation.findByPk(id, {
        include: [
          { model: require('../models/mysql/Hotel'), as: 'Hotel' },
          { model: require('../models/mysql/User'), as: 'User' },
        ],
      });

      if (!reservation) {
        return res.status(404).json({ message: 'Hotel reservation not found' });
      }

      res.status(200).json(reservation);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch hotel reservation', error: error.message });
    }
  }

  // Update a hotel reservation by ID
  static async updateReservation(req, res) {
    const { id } = req.params;
    const { status, start_date, end_date, room_type } = req.body;

    try {
      const reservation = await HotelReservation.findByPk(id);

      if (!reservation) {
        return res.status(404).json({ message: 'Hotel reservation not found' });
      }

      reservation.status = status || reservation.status;
      reservation.start_date = start_date || reservation.start_date;
      reservation.end_date = end_date || reservation.end_date;
      reservation.room_type = room_type || reservation.room_type;

      await reservation.save();

      res.status(200).json({ message: 'Hotel reservation updated successfully', reservation });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update hotel reservation', error: error.message });
    }
  }

  // Delete a hotel reservation by ID
  static async deleteReservation(req, res) {
    const { id } = req.params;

    try {
      const reservation = await HotelReservation.findByPk(id);

      if (!reservation) {
        return res.status(404).json({ message: 'Hotel reservation not found' });
      }

      await reservation.destroy();

      res.status(200).json({ message: 'Hotel reservation deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete hotel reservation', error: error.message });
    }
  }
}

module.exports = HotelReservationController;