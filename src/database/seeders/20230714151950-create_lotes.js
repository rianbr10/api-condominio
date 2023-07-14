'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tb_lotes', [
        {
            id: 3,
            uuid: 'c0b0c0b0-c0b0-c0b0-c0b0-c0b0c0b0c0b0',
            nome: '0017',
            ativo: 1,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: 6,
            uuid: 'c0b0c0b0-c0b0-c0b0-c0b0-c0b0c0b0c0b1',
            nome: '0018',
            ativo: 1,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: 7,
            uuid: 'c0b0c0b0-c0b0-c0b0-c0b0-c0b0c0b0c0b2',
            nome: '0019',
            ativo: 1,
            created_at: new Date(),
            updated_at: new Date()
        }
        ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_lotes', null, {});
  }
};
