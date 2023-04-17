'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
	  await queryInterface.renameColumn('contracts', 'discription', 'description');
	},
 
	down: async (queryInterface, Sequelize) => {
	  await queryInterface.renameColumn('contracts', 'description', 'discription');
	}
 };