import {
  DataTypes,
  Model,
  Sequelize,
  Optional,
  BelongsToGetAssociationMixin,
} from "sequelize";
import { Subject } from "./subject.model";
import { SubjectTranslationAttributes } from "../dtos/subject.dto";

export interface SubjectTranslationCreationAttributes
  extends Optional<SubjectTranslationAttributes, "id"> {}

export class SubjectTranslation
  extends Model<
    SubjectTranslationAttributes,
    SubjectTranslationCreationAttributes
  >
  implements SubjectTranslationAttributes
{
  public id!: number;
  public subject_id!: number;
  public language_code!: string;
  public name!: string;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getSubject!: BelongsToGetAssociationMixin<Subject>;

  public static associate(models: any) {
    SubjectTranslation.belongsTo(models.Subject, {
      foreignKey: "subject_id",
      as: "subject",
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
      subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      language_code: {
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
      deleted_at: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "active",
      }      
    },
    {
      tableName: "subjectTranslations",
      underscored: true,
      timestamps: true,
      sequelize,
    }
  );

  return SubjectTranslation;
};

export type { SubjectTranslationAttributes };
