const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db.mysql');

class TripReservation extends Model {}

TripReservation.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'trips',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
    seats_reserved: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'TripReservation',
    tableName: 'trip_reservations',
    underscored: true,
  }
);

module.exports = TripReservation;