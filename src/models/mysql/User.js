const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db.mysql');
const bcrypt = require('bcrypt');

class User extends Model {
  // Method to check password
  async checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  // Method to generate JWT
  generateJWT() {
    const jwt = require('jsonwebtoken');
    return jwt.sign(
      { id: this.id, role: this.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user', 'agency'),
      allowNull: false,
      defaultValue: 'user',
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

module.exports = User;