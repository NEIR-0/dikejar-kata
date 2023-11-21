"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const gamePlayers = [
      {
        PlayerId: 1,
        GameId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        PlayerId: 2,
        GameId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        PlayerId: 2,
        GameId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        PlayerId: 3,
        GameId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("GamePlayers", gamePlayers, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("GamePlayers", null, {});
  },
};
