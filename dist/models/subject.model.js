"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSubjectModel = exports.Subject = void 0;
const sequelize_1 = require("sequelize");
class Subject extends sequelize_1.Model {
    static associate(models) {
        Subject.hasMany(models.SubjectTranslation, {
            foreignKey: 'subjectId',
            as: 'translations',
            onDelete: 'CASCADE',
        });
    }
}
exports.Subject = Subject;
const initSubjectModel = (sequelize) => {
    Subject.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        examType: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        createdAt: sequelize_1.DataTypes.DATE,
        updatedAt: sequelize_1.DataTypes.DATE,
    }, {
        sequelize,
        tableName: 'Subjects',
        modelName: 'Subject',
    });
    return Subject;
};
exports.initSubjectModel = initSubjectModel;
