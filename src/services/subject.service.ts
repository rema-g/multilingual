import { SubjectRepository } from "../repositories/subject.repositories";
import { Subject } from "../models/subject.model";
import { SubjectTranslationAttributes } from "../models/subjecttranslation.model";
import { HttpError } from "../utils/HttpError";
import { SubjectErrors } from "../errors/message";
import models from "../models";

const subjectRepository = new SubjectRepository();

interface CreateSubjectInput {
  exam_type: string;
  translations?: SubjectTranslationAttributes[];
}

export class SubjectService {
  async getSubjectById(id: number): Promise<Subject | null> {
    return subjectRepository.findById(id);
  }

  async createSubject(data: CreateSubjectInput): Promise<Subject | null> {
    return subjectRepository.create(data);
  }

  async updateSubject(
    id: number,
    data: Partial<CreateSubjectInput>
  ): Promise<Subject | null> {
    const subject = await subjectRepository.findById(id);
    if (!subject) throw new HttpError(SubjectErrors.NOT_FOUND, 404);

    if (data.exam_type && data.exam_type !== subject.exam_type) {
      await subjectRepository.update(subject, { exam_type: data.exam_type });
    }

    if (data.translations && data.translations.length > 0) {
      for (const translation of data.translations) {
        const [existingTranslation, created] =
          await models.SubjectTranslation.findOrCreate({
            where: {
              subject_id: subject.id,
              language_code: translation.language_code,
            },
            defaults: {
              ...translation,
              subject_id: subject.id,
            },
          });

        if (!created) {
          await existingTranslation.update({
            name: translation.name,
            description: translation.description,
          });
        }
      }
    }

    return (await subjectRepository.findById(id)) as Subject;
  }

  async deleteSubject(id: number): Promise<boolean> {
    const subject = await subjectRepository.findById(id);
    if (!subject) throw new HttpError(SubjectErrors.NOT_FOUND, 404);
    return subjectRepository.delete(subject);
  }

  async getSubjects(filters: any): Promise<any> {
    return subjectRepository.findAllWithFilters(filters);
  }
}
