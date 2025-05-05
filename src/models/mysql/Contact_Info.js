const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db.mysql');

class ContactInfo extends Model {}

ContactInfo.init(
  {
    agency_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'agencies',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    WhatsappNumber: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'ContactInfo',
    tableName: 'contact_info',
    underscored: true,
  }
);

module.exports = ContactInfo;