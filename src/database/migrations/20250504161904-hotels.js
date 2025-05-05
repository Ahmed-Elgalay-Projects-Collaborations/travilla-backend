'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('hotels', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      hotelName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      agencyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'agencies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pricePerNight: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      numberOfBeachRooms: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      numberOfPoolRooms: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      numberOfStandardRooms: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      mainPhoto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      photos: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
    }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('hotels');
  }
};
