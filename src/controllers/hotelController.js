const Hotel = require('../models/mysql/Hotel');

class HotelController {
  // Create a new hotel
  static async createHotel(req, res) {
    const { hotelName, description, agencyId, location, pricePerNight, numberOfBeachRooms, numberOfPoolRooms, numberOfStandardRooms } = req.body;
    const files = req.files; // Assuming you're using multer for file uploads

    try {
      // Upload photos to Cloudinary
      const uploadedPhotos = [];
      if (files && files.photos) {
        for (const file of files.photos) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: 'hotels', // Optional: Specify a folder in Cloudinary
          });
          uploadedPhotos.push(result.secure_url);

          // Delete the temporary file after uploading to Cloudinary
          fs.unlinkSync(file.path);
        }
      }

      const newHotel = await Hotel.create({
        hotelName,
        description,
        agencyId,
        location,
        pricePerNight,
        numberOfBeachRooms,
        numberOfPoolRooms,
        numberOfStandardRooms,
        mainPhoto: uploadedPhotos[0] || null, // Use the first photo as the main photo
        photos: uploadedPhotos,
      });

      res.status(201).json({ message: 'Hotel created successfully', hotel: newHotel });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create hotel', error: error.message });
    }
  }

  // Get all hotels with optional filtering and searching
  static async getAllHotels(req, res) {
    const { agencyId, location, min_price, max_price, search } = req.query;

    try {
      const whereClause = {};

      // Add filters if provided
      if (agencyId) whereClause.agencyId = agencyId;
      if (location) whereClause.location = location;
      if (min_price) whereClause.pricePerNight = { $gte: min_price };
      if (max_price) whereClause.pricePerNight = { ...whereClause.pricePerNight, $lte: max_price };

      // Add search functionality (e.g., search by hotel name or description)
      if (search) {
        whereClause.$or = [
          { hotelName: { $like: `%${search}%` } },
          { description: { $like: `%${search}%` } },
        ];
      }

      const hotels = await Hotel.findAll({ where: whereClause });
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch hotels', error: error.message });
    }
  }

  // Get a specific hotel by ID
  static async getHotelById(req, res) {
    const { id } = req.params;

    try {
      const hotel = await Hotel.findByPk(id);

      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }

      res.status(200).json(hotel);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch hotel', error: error.message });
    }
  }

  // Update a hotel by ID
  static async updateHotel(req, res) {
    const { id } = req.params;
    const { hotelName, description, location, pricePerNight, numberOfBeachRooms, numberOfPoolRooms, numberOfStandardRooms } = req.body;
    const files = req.files;

    try {
      const hotel = await Hotel.findByPk(id);

      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }

      // Upload new photos to Cloudinary if provided
      const uploadedPhotos = hotel.photos || [];
      if (files && files.photos) {
        for (const file of files.photos) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: 'hotels',
          });
          uploadedPhotos.push(result.secure_url);

          // Delete the temporary file after uploading to Cloudinary
          fs.unlinkSync(file.path);
        }
      }

      hotel.hotelName = hotelName || hotel.hotelName;
      hotel.description = description || hotel.description;
      hotel.location = location || hotel.location;
      hotel.pricePerNight = pricePerNight || hotel.pricePerNight;
      hotel.numberOfBeachRooms = numberOfBeachRooms || hotel.numberOfBeachRooms;
      hotel.numberOfPoolRooms = numberOfPoolRooms || hotel.numberOfPoolRooms;
      hotel.numberOfStandardRooms = numberOfStandardRooms || hotel.numberOfStandardRooms;
      hotel.photos = uploadedPhotos;
      hotel.mainPhoto = uploadedPhotos[0] || hotel.mainPhoto;

      await hotel.save();

      res.status(200).json({ message: 'Hotel updated successfully', hotel });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update hotel', error: error.message });
    }
  }

  // Delete a hotel by ID
  static async deleteHotel(req, res) {
    const { id } = req.params;

    try {
      const hotel = await Hotel.findByPk(id);

      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }

      await hotel.destroy();

      res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete hotel', error: error.message });
    }
  }
}

module.exports = HotelController;