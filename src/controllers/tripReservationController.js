const TripReservation = require('../models/mysql/TripReservation');

class TripReservationController {
  // Create a new trip reservation
  static async createReservation(req, res) {
    const { user_id, trip_id, status, seats_reserved } = req.body;

    try {
      const newReservation = await TripReservation.create({
        user_id,
        trip_id,
        status,
        seats_reserved,
      });

      res.status(201).json({ message: 'Trip reservation created successfully', reservation: newReservation });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create trip reservation', error: error.message });
    }
  }

  // Get all trip reservations with filtering and searching
  static async getAllReservations(req, res) {
    const { user_id, trip_id, status, search } = req.query;

    try {
      const whereClause = {};

      // Add filters if provided
      if (user_id) whereClause.user_id = user_id;
      if (trip_id) whereClause.trip_id = trip_id;
      if (status) whereClause.status = status;

      // Add search functionality (e.g., search by trip name or user name)
      if (search) {
        whereClause.$or = [
          { '$Trip.name$': { $like: `%${search}%` } }, // Assuming Trip has a `name` field
          { '$User.name$': { $like: `%${search}%` } }, // Assuming User has a `name` field
        ];
      }

      const reservations = await TripReservation.findAll({
        where: whereClause,
        include: [
          { model: require('../models/mysql/Trip'), as: 'Trip' }, // Include Trip details
          { model: require('../models/mysql/User'), as: 'User' }, // Include User details
        ],
      });

      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch trip reservations', error: error.message });
    }
  }

  // Get a specific trip reservation by ID
  static async getReservationById(req, res) {
    const { id } = req.params;

    try {
      const reservation = await TripReservation.findByPk(id, {
        include: [
          { model: require('../models/mysql/Trip'), as: 'Trip' },
          { model: require('../models/mysql/User'), as: 'User' },
        ],
      });

      if (!reservation) {
        return res.status(404).json({ message: 'Trip reservation not found' });
      }

      res.status(200).json(reservation);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch trip reservation', error: error.message });
    }
  }

  // Update a trip reservation by ID
  static async updateReservation(req, res) {
    const { id } = req.params;
    const { status, seats_reserved } = req.body;

    try {
      const reservation = await TripReservation.findByPk(id);

      if (!reservation) {
        return res.status(404).json({ message: 'Trip reservation not found' });
      }

      reservation.status = status || reservation.status;
      reservation.seats_reserved = seats_reserved || reservation.seats_reserved;

      await reservation.save();

      res.status(200).json({ message: 'Trip reservation updated successfully', reservation });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update trip reservation', error: error.message });
    }
  }

  // Delete a trip reservation by ID
  static async deleteReservation(req, res) {
    const { id } = req.params;

    try {
      const reservation = await TripReservation.findByPk(id);

      if (!reservation) {
        return res.status(404).json({ message: 'Trip reservation not found' });
      }

      await reservation.destroy();

      res.status(200).json({ message: 'Trip reservation deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete trip reservation', error: error.message });
    }
  }
}

module.exports = TripReservationController;