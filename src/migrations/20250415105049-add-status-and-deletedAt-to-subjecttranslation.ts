import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('subjectTranslations', 'status', {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    });

    await queryInterface.addColumn('subjectTranslations', 'deleted_at', {
      type: DataTypes.JSON,
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('subjectTranslations', 'status');
    await queryInterface.removeColumn('subjectTranslations', 'deleted_at');
  },
};
