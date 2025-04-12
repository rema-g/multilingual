"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectTranslation = exports.Subject = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const subject_model_1 = require("./subject.model");
Object.defineProperty(exports, "Subject", { enumerable: true, get: function () { return subject_model_1.Subject; } });
const subjecttranslation_model_1 = require("./subjecttranslation.model");
Object.defineProperty(exports, "SubjectTranslation", { enumerable: true, get: function () { return subjecttranslation_model_1.SubjectTranslation; } });
const env = process.env.NODE_ENV || 'development';
const dbConfig = config_1.default[env];
const sequelize = new sequelize_1.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false,
});
exports.sequelize = sequelize;
(0, subject_model_1.initSubjectModel)(sequelize);
(0, subjecttranslation_model_1.initSubjectTranslationModel)(sequelize);
subject_model_1.Subject.hasMany(subjecttranslation_model_1.SubjectTranslation, {
    foreignKey: 'subjectId',
    as: 'translations',
    onDelete: 'CASCADE',
});
subjecttranslation_model_1.SubjectTranslation.belongsTo(subject_model_1.Subject, {
    foreignKey: 'subjectId',
    as: 'subject',
});
const models = {
    sequelize,
    Sequelize: sequelize_1.Sequelize,
    Subject: subject_model_1.Subject,
    SubjectTranslation: subjecttranslation_model_1.SubjectTranslation,
};
exports.default = models;
