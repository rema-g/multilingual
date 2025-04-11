import {
  DataTypes,
  Model,
  Sequelize,
  Optional,
  BelongsToGetAssociationMixin,
} from 'sequelize';
import { Subject } from './subject.model'; // update path if needed

interface SubjectTranslationAttributes {
  id: number;
  subjectId: number;
  languageCode: string;
  name: string;
  description?: string;
}

interface SubjectTranslationCreationAttributes
  extends Optional<SubjectTranslationAttributes, 'id'> {}

export class SubjectTranslation
  extends Model<SubjectTranslationAttributes, SubjectTranslationCreationAttributes>
  implements SubjectTranslationAttributes
{
  public id!: number;
  public subjectId!: number;
  public languageCode!: string;
  public name!: string;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association
  public getSubject!: BelongsToGetAssociationMixin<Subject>;

  public static associate(models: any) {
    SubjectTranslation.belongsTo(models.Subject, {
      foreignKey: 'subjectId',
      as: 'subject',
    });
  }
}

export const initSubjectTranslationModel = (
  sequelize: Sequelize
): typeof SubjectTranslation => {
  SubjectTranslation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      languageCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'SubjectTranslations',
      sequelize,
    }
  );

  return SubjectTranslation;
};

export type {
  SubjectTranslationAttributes,
  SubjectTranslationCreationAttributes,
};
