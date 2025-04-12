import models from '../models';
import { Op } from 'sequelize';
import {
  Subject,
  SubjectAttributes,
  SubjectCreationAttributes,
} from '../models/subject.model';
import { SubjectTranslationAttributes } from '../models/subjecttranslation.model';

interface SubjectWithTranslations extends SubjectCreationAttributes {
  translations?: SubjectTranslationAttributes[];
}

export class SubjectRepository {
  async findAll(): Promise<Subject[]> {
    return await models.Subject.findAll({
      include: [{ model: models.SubjectTranslation, as: 'translations' }],
    });
  }

  async findById(id: number): Promise<Subject | null> {
    return await models.Subject.findByPk(id, {
      include: [{ model: models.SubjectTranslation, as: 'translations' }],
    });
  }

  async create(data: SubjectWithTranslations): Promise<Subject> {
    return await models.Subject.create(data, {
      include: [{ model: models.SubjectTranslation, as: 'translations' }],
    });
  }

  async update(subject: Subject, data: Partial<SubjectAttributes>): Promise<Subject> {
    return await subject.update(data);
  }

  async delete(subject: Subject): Promise<boolean> {
    await subject.destroy();
    return true;
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
    order: 'ASC' | 'DESC';
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

    const { count, rows } = await models.Subject.findAndCountAll({
      where: search
        ? {
            examType: {
              [Op.like]: `%${search}%`,
            },
          }
        : undefined,
      include: [{ model: models.SubjectTranslation, as: 'translations' }],
      order: [[sortBy, order]],
      limit,
      offset,
    });

    return {
      data: rows,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        pageSize: limit,
      },
    };
  }
}
