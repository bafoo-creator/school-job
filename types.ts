
export type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'file' | 'checkbox';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // Pour les selects ou checkboxes
}

export interface JobOffer {
  id: string;
  title: string;
  school: string;
  city: string;
  level: 'Maternelle' | 'Primaire' | 'Collège' | 'Lycée';
  subject: string;
  date: string;
  type: 'CDI' | 'CDD' | 'Vacation' | 'Freelance';
  description: string;
  isNew: boolean;
  schoolLogo?: string;
  applicationForm?: FormField[];
}

export interface SearchFilters {
  subject: string;
  city: string;
  level: string;
}

export interface User {
  role: 'teacher' | 'school' | null;
  name: string;
}
