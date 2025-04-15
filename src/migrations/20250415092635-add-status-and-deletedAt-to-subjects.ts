import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.addColumn('subjects', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'active',
    });

    await queryInterface.addColumn('subjects', 'deleted_at', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('subjects', 'status');
    await queryInterface.removeColumn('subjects', 'deleted_at');
  },
};
