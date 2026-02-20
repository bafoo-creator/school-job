
import { createClient } from '@supabase/supabase-js';

// Récupération des variables d'environnement injectées par Vite
const supabaseUrl = process.env.SUPABASE_URL || 'https://sbalkgonkfdltbekpiap.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;

/**
 * On n'initialise le client que si les identifiants sont présents.
 * Cela évite l'erreur "supabaseUrl is required" au chargement.
 */
export const supabase = (supabaseUrl && supabaseKey && supabaseUrl !== '') 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

if (!supabase) {
  console.warn(
    "Identifiants Supabase manquants. " +
    "Veuillez configurer SUPABASE_URL et SUPABASE_KEY dans vos variables d'environnement."
  );
}
