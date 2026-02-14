
import React, { useState } from 'react';
import { generateJobDescription } from '../services/geminiService';
import { CITIES, SUBJECTS, LEVELS, JOB_TYPES } from '../constants';
import WPFormsBuilder from './WPFormsBuilder';
import { FormField } from '../types';

const PostJob: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState<FormField[]>([
    { id: '1', type: 'text', label: 'Nom et Prénom', required: true },
    { id: '2', type: 'email', label: 'Email', required: true },
    { id: '3', type: 'file', label: 'Télécharger votre CV (PDF)', required: true }
  ]);
  
  const [formData, setFormData] = useState({
    title: '',
    school: '',
    location: '',
    type: 'CDI',
    level: 'Primaire',
    subject: 'Français',
    description: '',
    requirements: ''
  });

  const handleAIWrite = async () => {
    if (!formData.title || !formData.school) {
      alert("Veuillez remplir le titre et le nom de l'école avant d'utiliser l'IA.");
      return;
    }
    setLoading(true);
    const result = await generateJobDescription(formData.title, formData.school, formData.requirements);
    setFormData({ ...formData, description: result });
    setLoading(false);
  };

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Publier une offre</h1>
          <p className="text-slate-600">Concevez votre offre et personnalisez le formulaire de candidature.</p>
        </div>

        <div className="space-y-8">
          {/* Section 1: Job Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Détails du Poste
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Titre de l'offre</label>
                <input 
                  type="text" 
                  placeholder="Ex: Professeur de Maths"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 focus:outline-none"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Type de contrat</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 focus:outline-none"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Ville</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 focus:outline-none"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                >
                  <option value="">Sélectionner...</option>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Niveau Scolaire</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 focus:outline-none"
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                >
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Description with AI Support */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Description du poste
            </h2>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fas fa-magic text-blue-600 text-lg"></i>
                <p className="text-sm text-blue-800 font-medium">L'IA de SCHOOL JOB peut rédiger l'annonce pour vous.</p>
              </div>
              <button 
                onClick={handleAIWrite}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : null}
                Rédiger avec l'IA
              </button>
            </div>

            <textarea 
              rows={8}
              placeholder="Décrivez les missions, le profil recherché..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 focus:outline-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* NEW SECTION 3: WPForms Builder */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Formulaire de Candidature (WPForms)
            </h2>
            <p className="text-slate-500 text-sm mb-6">Personnalisez les questions que vous souhaitez poser aux candidats.</p>
            
            <WPFormsBuilder 
              fields={formFields} 
              onChange={setFormFields} 
              jobTitle={formData.title}
            />
          </div>

          <button className="w-full bg-green-500 text-white font-bold py-5 rounded-2xl text-xl hover:bg-green-600 transition-all shadow-xl hover:shadow-green-500/20 flex items-center justify-center gap-3">
            <i className="fas fa-paper-plane"></i>
            Publier mon offre & le formulaire
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
