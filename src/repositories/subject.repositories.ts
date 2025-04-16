import models from "../models";
import { Op } from "sequelize";
import { Subject, SubjectCreationAttributes } from "../models/subject.model";
import { SubjectTranslationAttributes } from "../models/subjecttranslation.model";

interface SubjectWithTranslations extends SubjectCreationAttributes {
  translations?: SubjectTranslationAttributes[];
}

export class SubjectRepository {
  async findById(id: number): Promise<Subject | null> {
    const subject = await models.Subject.findByPk(id, {
      include: [{ model: models.SubjectTranslation, as: "translations" }],
    });
    return subject;
  }

  async create(data: SubjectWithTranslations): Promise<Subject | null> {
    const subject = models.Subject.create(data, {
      include: [{ model: models.SubjectTranslation, as: "translations" }],
    });
    return subject;
  }

  async update(
    subject: Subject,
    data: Partial<SubjectWithTranslations>
  ): Promise<Subject | null> {
    if (data.exam_type && data.exam_type !== subject.exam_type) {
      await subject.update({ exam_type: data.exam_type });
    }

    if (data.translations && data.translations.length > 0) {
      for (const translationData of data.translations) {
        const existingTranslation = await models.SubjectTranslation.findOne({
          where: {
            subject_id: subject.id,
            language_code: translationData.language_code,
          },
        });

        if (existingTranslation) {
          if (
            existingTranslation.name !== translationData.name ||
            existingTranslation.description !== translationData.description
          ) {
            await existingTranslation.update({
              name: translationData.name,
              description: translationData.description,
            });
          }
        } else {
          await models.SubjectTranslation.create({
            ...translationData,
            subject_id: subject.id,
          });
        }
      }
    }

    return this.findById(subject.id);
  }

async softDeleteSubject(subjectId: number): Promise<Subject | null> {
  const subject = await this.findById(subjectId);
  if (!subject) return null;

  const deletedAtPayload = {
    created_at: subject.created_at,
    updated_at: subject.updated_at,
    deleted_at: new Date(),
  };

  await subject.update({
    status: 'inactive',
    deleted_at: deletedAtPayload,
  });

  return subject;
}

async softDeleteTranslation(subject_id: number, language_code: string): Promise<SubjectTranslationAttributes  | null> {
  const translation = await models.SubjectTranslation.findOne({
    where: {
      subject_id,
      language_code,
    },
  });

  if (!translation) return null;
  const deletedAtPayload = {
    created_at: translation.createdAt,
    updated_at: translation.updatedAt,
    deleted_at: new Date(),
  };

  await translation.update({ status: "inactive",
    deleted_at: deletedAtPayload,
   });
  return translation;
}

  async findAllWithFilters({
    page,
    limit,
    search,
    sortBy,
    order,
  }: {
    page: number;
    limit: number;
    search: string;
    sortBy: string;
    order: "ASC" | "DESC";
  }): Promise<{
    data: Subject[];
    pagination: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      pageSize: number;
    };
  }> {
    const offset = (page - 1) * limit;

    const whereClause: any = {
      status: 'active',
    };

    if (search) {
      whereClause.exam_type = {
        [Op.like]: `%${search}%`,
      };
    }

    const { count, rows } = await models.Subject.findAndCountAll({
    where: whereClause,
    include: [{ model: models.SubjectTranslation, as: "translations" }],
    order: [[sortBy, order]],
    limit,
    offset,
  });

    const subject = {
      data: rows,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        pageSize: limit,
      },
    };
    return subject;
  }
}
