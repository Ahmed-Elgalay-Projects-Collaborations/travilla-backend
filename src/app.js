require('dotenv').config();
require('./config/db.mongo');
const sequelize = require('./config/db.mysql');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Test MySQL connection
sequelize.authenticate()
  .then(() => console.log('✅ MySQL Connected'))
  .catch(err => console.error('❌ MySQL Connection Error:', err));

// Import routes
const userRoutes = require('./routes/userRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const agencyRoutes = require('./routes/agencyRoutes');
const tripRoutes = require('./routes/tripRoutes');
const hotelReservationRoutes = require('./routes/hotelReservationRoutes');
const tripReservationRoutes = require('./routes/tripReservationRoutes');
const contactInfoRoutes = require('./routes/contactInfoRoutes');
const adminLogRoutes = require('./routes/adminLogRoutes');

// Register routes
app.use('/api/users', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/agencies', agencyRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/hotel-reservations', hotelReservationRoutes);
app.use('/api/trip-reservations', tripReservationRoutes);
app.use('/api/contact-info', contactInfoRoutes);
app.use('/api/admin-logs', adminLogRoutes);

module.exports = app;