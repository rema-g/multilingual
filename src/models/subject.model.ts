import {
  Model,
  DataTypes,
  Optional,
  Sequelize,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import { SubjectTranslation } from './subjecttranslation.model';
import { SubjectAttributes} from '../dtos/subject.dto'

export interface SubjectCreationAttributes
  extends Optional<SubjectAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class Subject
  extends Model<SubjectAttributes, SubjectCreationAttributes>
  implements SubjectAttributes
{
  public id!: number;
  public exam_type!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public getTranslations!: HasManyGetAssociationsMixin<SubjectTranslation>;

  public static associate(models: any) {
    Subject.hasMany(models.SubjectTranslation, {
      foreignKey: 'subject_id',
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
      exam_type: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'subjects',
      modelName: 'Subject',
      underscored: true,
      timestamps: true,
    }
  );

  return Subject;
};
