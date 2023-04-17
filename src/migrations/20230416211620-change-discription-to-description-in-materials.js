'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
	  await queryInterface.renameColumn('materials', 'discription', 'description');
	},
 
	down: async (queryInterface, Sequelize) => {
	  await queryInterface.renameColumn('materials', 'description', 'discription');
	}
 };