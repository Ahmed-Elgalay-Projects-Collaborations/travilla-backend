const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db.mysql');

class Hotel extends Model {}

Hotel.init(
  {
    hotelName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'agencies',
        key: 'id',
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pricePerNight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    numberOfBeachRooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numberOfPoolRooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numberOfStandardRooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mainPhoto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Hotel',
    tableName: 'hotels',
    underscored: true,
  }
);

module.exports = Hotel;