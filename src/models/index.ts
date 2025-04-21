import { Sequelize } from "sequelize";
import config from "../config/config";
import { initSubjectModel, Subject } from "./subject.model";
import {
  initSubjectTranslationModel,
  SubjectTranslation,
} from "./subjecttranslation.model";
import { initUserModel, User } from './user.model';

const dbConfig =config.database;;

const sequelize = new Sequelize(
  dbConfig.name!,
  dbConfig.username!,
  dbConfig.password!,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false,
  }
);

initSubjectModel(sequelize);
initSubjectTranslationModel(sequelize);
initUserModel(sequelize);

Subject.hasMany(SubjectTranslation, {
  foreignKey: "subject_id",
  as: "translations",
  onDelete: "CASCADE",
});

SubjectTranslation.belongsTo(Subject, {
  foreignKey: "subject_id",
  as: "subject",
});

const models = {
  sequelize,
  Sequelize,
  Subject,
  SubjectTranslation,
  User,
};

export { sequelize };
export { Subject, SubjectTranslation, User };
export default models;
