import { SubjectRepository } from '../repositories/subject.repositories';
import { Subject } from '../models/subject.model';
import { SubjectTranslationAttributes } from '../models/subjecttranslation.model';

interface CreateSubjectInput {
  examType: string;
  translations?: SubjectTranslationAttributes[];
}

export const SubjectService = {
  getAllSubjects: () => {
    return SubjectRepository.findAll();
  },

  getSubjectById: (id: number) => {
    return SubjectRepository.findById(id);
  },

  createSubject: (data: CreateSubjectInput) => {
    return SubjectRepository.create(data);
  },

  updateSubject: async (id: number, data: Partial<CreateSubjectInput>) => {
    const subject = await SubjectRepository.findById(id);
    if (!subject) throw new Error('Subject not found');
    return await SubjectRepository.update(subject, data);
  },

  deleteSubject: async (id: number): Promise<boolean> => {
    const subject = await SubjectRepository.findById(id);
    if (!subject) return false;
    return await SubjectRepository.delete(subject);
  },

  getSubjects: async (filters: any) => {
    return await SubjectRepository.findAllWithFilters(filters);
  }  
};
