'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tb_lotes', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            uuid: {
                type: Sequelize.STRING,
                primaryKey: true,
            },
            nome: {
                type: Sequelize.STRING
            },
            ativo: {
                type: Sequelize.TINYINT
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tb_lotes');
    }
};