export interface SubjectAttributes {
  id: number;
  exam_type: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SubjectTranslationAttributes {
  id: number;
  subject_id: number;
  language_code: string;
  name: string;
  description?: string;
}
