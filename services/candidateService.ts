
import { User } from '../types';

export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  city: string;
  subject: string;
  experience: string;
  degree: string;
  level: string;
  cvName: string;
  createdAt: string;
}

const STORAGE_KEY = 'schooljob_candidates_db';

export const candidateService = {
  // Récupérer tous les candidats (Base de données)
  getAll: (): CandidateProfile[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Sauvegarder un nouveau candidat
  save: (profile: Omit<CandidateProfile, 'id' | 'createdAt'>): CandidateProfile => {
    const candidates = candidateService.getAll();
    const newCandidate: CandidateProfile = {
      ...profile,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    candidates.push(newCandidate);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
    return newCandidate;
  },

  // Authentifier un candidat
  authenticate: (email: string, password: string): CandidateProfile | null => {
    const candidates = candidateService.getAll();
    return candidates.find(c => c.email === email && c.password === password) || null;
  },

  // Supprimer un profil (Gestion)
  delete: (id: string): void => {
    const candidates = candidateService.getAll();
    const filtered = candidates.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
