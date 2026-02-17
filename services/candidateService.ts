
import { supabase } from '../lib/supabase';

export interface CandidateProfile {
  id?: string;
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
  createdAt?: string;
}

export const candidateService = {
  // Récupérer tous les candidats depuis Supabase
  getAll: async (): Promise<CandidateProfile[]> => {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching candidates:', error);
      return [];
    }
    return data || [];
  },

  // Sauvegarder un nouveau candidat dans Supabase
  save: async (profile: Omit<CandidateProfile, 'id' | 'createdAt'>): Promise<CandidateProfile | null> => {
    const { data, error } = await supabase
      .from('candidates')
      .insert([profile])
      .select()
      .single();

    if (error) {
      console.error('Error saving candidate:', error);
      throw error;
    }
    return data;
  },

  // Authentifier un candidat via Supabase
  authenticate: async (email: string, password: string): Promise<CandidateProfile | null> => {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error) {
      console.error('Authentication error:', error);
      return null;
    }
    return data;
  },

  // Supprimer un profil
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('candidates')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting candidate:', error);
      throw error;
    }
  }
};
