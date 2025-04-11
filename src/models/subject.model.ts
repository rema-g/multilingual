import {
  Model,
  DataTypes,
  Optional,
  Sequelize,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import { SubjectTranslation } from './subjecttranslation.model'; // update path if needed

export interface SubjectAttributes {
  id: number;
  examType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SubjectCreationAttributes
  extends Optional<SubjectAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Subject
  extends Model<SubjectAttributes, SubjectCreationAttributes>
  implements SubjectAttributes
{
  public id!: number;
  public examType!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association: one-to-many
  public getTranslations!: HasManyGetAssociationsMixin<SubjectTranslation>;

  public static associate(models: any) {
    Subject.hasMany(models.SubjectTranslation, {
      foreignKey: 'subjectId',
      as: 'translations',
      onDelete: 'CASCADE',
    });
  }
}

export const initSubjectModel = (sequelize: Sequelize): typeof Subject => {
  Subject.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      examType: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'Subjects',
      modelName: 'Subject',
    }
  );

  return Subject;
};
