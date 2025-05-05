const Trip = require('../models/mysql/Trip');
const cloudinary = require('cloudinary');
const fs = require('fs');

class TripController {
  // Create a new trip
  static async createTrip(req, res) {
    const { agency_id, name, description, price, location, available_seats, start_date, end_date } = req.body;
    const files = req.files; // Assuming you're using a middleware like multer for file uploads

    try {
      // Upload photos to Cloudinary
      const uploadedPhotos = [];
      if (files && files.photos) {
        for (const file of files.photos) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: 'trips', // Optional: Specify a folder in Cloudinary
          });
          uploadedPhotos.push(result.secure_url);

          // delete the local file after uploading to Cloudinary
          fs.unlinkSync(file.path); // Remove the file from local storage
        }
      }

      const newTrip = await Trip.create({
        agency_id,
        name,
        description,
        price,
        location,
        available_seats,
        start_date,
        end_date,
        main_photo: uploadedPhotos[0] || null, // Use the first photo as the main photo
        photos: uploadedPhotos,
      });

      res.status(201).json({ message: 'Trip created successfully', trip: newTrip });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create trip', error: error.message });
    }
  }

  // Get all trips with filtering and searching
  static async getAllTrips(req, res) {
    const { agency_id, location, search, min_price, max_price } = req.query;

    try {
      const whereClause = {};

      // Add filters if provided
      if (agency_id) whereClause.agency_id = agency_id;
      if (location) whereClause.location = location;
      if (min_price) whereClause.price = { $gte: min_price };
      if (max_price) whereClause.price = { ...whereClause.price, $lte: max_price };

      // Add search functionality (e.g., search by trip name or description)
      if (search) {
        whereClause.$or = [
          { name: { $like: `%${search}%` } },
          { description: { $like: `%${search}%` } },
        ];
      }

      const trips = await Trip.findAll({ where: whereClause });
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch trips', error: error.message });
    }
  }

  // Get a specific trip by ID
  static async getTripById(req, res) {
    const { id } = req.params;

    try {
      const trip = await Trip.findByPk(id);

      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
      }

      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch trip', error: error.message });
    }
  }

  // Update a trip by ID
  static async updateTrip(req, res) {
    const { id } = req.params;
    const { name, description, price, location, available_seats, start_date, end_date } = req.body;
    const files = req.files;

    try {
      const trip = await Trip.findByPk(id);

      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
      }

      // Upload new photos to Cloudinary if provided
      const uploadedPhotos = trip.photos || [];
      if (files && files.photos) {
        for (const file of files.photos) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: 'trips',
          });
          uploadedPhotos.push(result.secure_url);

          fs.unlinkSync(file.path); // Remove the file from local storage
        }
      }

      trip.name = name || trip.name;
      trip.description = description || trip.description;
      trip.price = price || trip.price;
      trip.location = location || trip.location;
      trip.available_seats = available_seats || trip.available_seats;
      trip.start_date = start_date || trip.start_date;
      trip.end_date = end_date || trip.end_date;
      trip.photos = uploadedPhotos;
      trip.main_photo = uploadedPhotos[0] || trip.main_photo;

      await trip.save();

      res.status(200).json({ message: 'Trip updated successfully', trip });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update trip', error: error.message });
    }
  }

  // Delete a trip by ID
  static async deleteTrip(req, res) {
    const { id } = req.params;

    try {
      const trip = await Trip.findByPk(id);

      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
      }

      await trip.destroy();

      res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete trip', error: error.message });
    }
  }
}

module.exports = TripController;