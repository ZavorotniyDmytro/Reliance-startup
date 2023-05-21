'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
	  await queryInterface.renameColumn('resumes', 'name', 'title');
	},

	down: async (queryInterface, Sequelize) => {
	  await queryInterface.renameColumn('resumes', 'title', 'name');
	}
 };
