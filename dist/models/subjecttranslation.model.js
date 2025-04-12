"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSubjectTranslationModel = exports.SubjectTranslation = void 0;
const sequelize_1 = require("sequelize");
class SubjectTranslation extends sequelize_1.Model {
    static associate(models) {
        SubjectTranslation.belongsTo(models.Subject, {
            foreignKey: 'subjectId',
            as: 'subject',
        });
    }
}
exports.SubjectTranslation = SubjectTranslation;
const initSubjectTranslationModel = (sequelize) => {
    SubjectTranslation.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        subjectId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        languageCode: {
            type: sequelize_1.DataTypes.STRING(10),
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'SubjectTranslations',
        sequelize,
    });
    return SubjectTranslation;
};
exports.initSubjectTranslationModel = initSubjectTranslationModel;
