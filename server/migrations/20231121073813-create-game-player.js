"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("GamePlayers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      PlayerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Players",
          key: "id",
        },
      },
      GameId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Games",
          key: "id",
        },
      },
      isDefeated: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("GamePlayers");
  },
};
