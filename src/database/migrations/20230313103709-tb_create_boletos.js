'use strict';
const {DataTypes} = require("sequelize");
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tb_boletos', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            uuid: {
                type: Sequelize.STRING,
                primaryKey: true,
            },
            nome_sacado: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            id_lote: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'tb_lotes',
                    key: 'id'
                }
            },
            valor: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true,
            },
            linha_digitavel: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            ativo: {
                type: Sequelize.TINYINT,
                allowNull: true,
            },
            page_number_pdf: {
                type: Sequelize.INTEGER,
                allowNull: true,
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
        await queryInterface.dropTable('tb_boletos');
    }
};