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

    const games = [
      {
        title: "Game 1",
        language: "id",
        status: "waiting",
        GameMasterId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Game 2",
        language: "id",
        status: "playing",
        GameMasterId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Game 3",
        language: "id",
        status: "ended",
        GameMasterId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Games", games, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Games", null, {});
  },
};
