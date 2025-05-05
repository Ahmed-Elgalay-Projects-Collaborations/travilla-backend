const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db.mysql');

class Agency extends Model {}

Agency.init(
  {
    agencyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'inactive',
    },
    aboutUs: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Agency',
    tableName: 'agencies',
    underscored: true,
  }
);

module.exports = Agency;