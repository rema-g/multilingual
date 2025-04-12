import { SubjectRepository } from '../repositories/subject.repositories';
import { Subject } from '../models/subject.model';
import { SubjectTranslationAttributes } from '../models/subjecttranslation.model';

interface CreateSubjectInput {
  examType: string;
  translations?: SubjectTranslationAttributes[];
}

export class SubjectService {
  async getAllSubjects(): Promise<Subject[]> {
    return SubjectRepository.findAll();
  }

  async getSubjectById(id: number): Promise<Subject | null> {
    return SubjectRepository.findById(id);
  }

  async createSubject(data: CreateSubjectInput): Promise<Subject> {
    return SubjectRepository.create(data);
  }

  async updateSubject(id: number, data: Partial<CreateSubjectInput>): Promise<Subject> {
    const subject = await SubjectRepository.findById(id);
    if (!subject) throw new Error('Subject not found');
    return SubjectRepository.update(subject, data);
  }

  async deleteSubject(id: number): Promise<boolean> {
    const subject = await SubjectRepository.findById(id);
    if (!subject) return false;
    return SubjectRepository.delete(subject);
  }

  async getSubjects(filters: any): Promise<any> {
    return SubjectRepository.findAllWithFilters(filters);
  }
}