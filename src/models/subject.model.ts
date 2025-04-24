import {
  Model,
  DataTypes,
  Optional,
  Sequelize,
  HasManyGetAssociationsMixin,
} from "sequelize";
import { SubjectTranslation } from "./subjecttranslation.model";
import { SubjectAttributes } from "../dtos/subject.dto";

export interface SubjectCreationAttributes
  extends Optional<SubjectAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Subject
  extends Model<SubjectAttributes, SubjectCreationAttributes>
  implements SubjectAttributes
{
  public id!: number;
  public exam_type!: string;
  public status!: string;
  public deleted_at!: {
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  } | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getTranslations!: HasManyGetAssociationsMixin<SubjectTranslation>;

  public static associate(models: any) {
    Subject.hasMany(models.SubjectTranslation, {
      foreignKey: "subject_id",
      as: "translations",
      onDelete: "CASCADE",
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
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
      },
      deleted_at: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: "subjects",
      modelName: "Subject",
      underscored: true,
      timestamps: true,
    }
  );

  return Subject;
};
