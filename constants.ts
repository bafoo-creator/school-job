
import { JobOffer } from './types';

export const CITIES = ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Agadir', 'Meknès', 'Oujda'];
export const LEVELS = ['Maternelle', 'Primaire', 'Collège', 'Lycée'];
export const SUBJECTS = ['Français', 'Mathématiques', 'Arabe', 'Anglais', 'Physique-Chimie', 'SVT', 'Informatique', 'Arts'];
export const JOB_TYPES = ['CDI', 'CDD', 'Vacation', 'Freelance'];

export const MOCK_JOBS: JobOffer[] = [
  {
    id: '1',
    title: 'Enseignant de Français',
    school: 'École Al Madina',
    city: 'Casablanca',
    level: 'Primaire',
    subject: 'Français',
    type: 'CDI',
    date: 'Il y a 2 jours',
    isNew: true,
    description: 'Recherchons un enseignant dynamique pour nos classes de CM1/CM2.'
  },
  {
    id: '2',
    title: 'Professeur de Mathématiques',
    school: 'Lycée Descartes Proxi',
    city: 'Rabat',
    level: 'Lycée',
    subject: 'Mathématiques',
    type: 'CDD',
    date: 'Il y a 5 jours',
    isNew: false,
    description: 'Poste à plein temps pour les classes de Terminale S.'
  },
  {
    id: '3',
    title: 'Éducatrice Maternelle',
    school: 'Les Petits Génies',
    city: 'Marrakech',
    level: 'Maternelle',
    subject: 'Général',
    type: 'CDI',
    date: 'Il y a 1 jour',
    isNew: true,
    description: 'Passionnée par la petite enfance, venez rejoindre notre équipe créative.'
  }
];
