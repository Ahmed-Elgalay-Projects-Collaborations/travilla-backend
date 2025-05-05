const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db.mysql');

class HotelReservation extends Model {}

HotelReservation.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'hotels',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    room_type: {
      type: DataTypes.ENUM('beach', 'pool', 'standard'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'HotelReservation',
    tableName: 'hotel_reservations',
    underscored: true,
  }
);

module.exports = HotelReservation;