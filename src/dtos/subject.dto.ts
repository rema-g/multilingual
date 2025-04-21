export interface SubjectAttributes {
  id: number;
  exam_type: string;
  status?: string;
  deleted_at?: {
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  } | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface SubjectTranslationAttributes {
  id: number;
  subject_id: number;
  language_code: string;
  name: string;
  description?: string;
  status?: string;
  deleted_at?: {
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  } | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface LoginDTO {
  email: string;
  password: string;
}