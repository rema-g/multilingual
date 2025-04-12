import { SubjectRepository } from '../repositories/subject.repositories';
import { Subject } from '../models/subject.model';
import { SubjectTranslationAttributes } from '../models/subjecttranslation.model';
import { HttpError } from '../utils/HttpError';
import { SubjectErrors } from '../errors/message';
const subjectRepository = new SubjectRepository();

interface CreateSubjectInput {
  examType: string;
  translations?: SubjectTranslationAttributes[];
}

export class SubjectService {

  async getSubjectById(id: number): Promise<Subject | null> {
    return subjectRepository.findById(id);
  }

  async createSubject(data: CreateSubjectInput): Promise<Subject> {
    return subjectRepository.create(data);
  }

  async updateSubject(id: number, data: Partial<CreateSubjectInput>): Promise<Subject> {
    const subject = await subjectRepository.findById(id);
    if (!subject) throw new HttpError(SubjectErrors.NOT_FOUND, 404);
    return subjectRepository.update(subject, data);
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