const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db.mysql');

class Trip extends Model {}

Trip.init(
  {
    agency_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'agencies',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    available_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    main_photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Trip',
    tableName: 'trips',
    underscored: true,
  }
);

module.exports = Trip;