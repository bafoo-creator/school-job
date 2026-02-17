
import React, { useState } from 'react';
import { CITIES, SUBJECTS, LEVELS } from '../constants';
import { candidateService } from '../services/candidateService';

const EXPERIENCE_LEVELS = ['Étudiant / Stagiaire', 'Débutant (0-2 ans)', 'Intermédiaire (2-5 ans)', 'Confirmé (5-10 ans)', 'Senior (+10 ans)'];
const DEGREES = ['Licence / BAC+3', 'Master / BAC+5', 'Doctorat', 'Diplôme de l\'ENS', 'Autre diplôme professionnel'];

const TeacherProfile: React.FC = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    subject: '',
    experience: '',
    degree: '',
    level: '',
    cvName: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await candidateService.save(formData);
      setSubmitted(true);
    } catch (err) {
      alert("Erreur lors de l'enregistrement sur Supabase.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-20 bg-slate-50 min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-2xl text-center">
          <i className="fas fa-cloud-upload-alt text-6xl text-blue-600 mb-6"></i>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Profil sur Supabase !</h2>
          <p className="text-slate-600 mb-8">Vos données sont maintenant synchronisées avec notre base de données cloud.</p>
          <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Retour</button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        {/* Barre de progression identique */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {['Compte', 'Profil', 'Finaliser'].map((label, i) => (
              <div key={i} className={`text-[10px] font-black uppercase tracking-widest ${step >= i + 1 ? 'text-blue-600' : 'text-slate-400'}`}>{label}</div>
            ))}
          </div>
          <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-10">
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-bold text-slate-900">Créez votre compte Cloud</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required type="text" placeholder="Nom Complet" className="w-full px-4 py-3 rounded-xl border border-slate-200" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input required type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-slate-200" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  <input required type="password" placeholder="Mot de passe" className="w-full px-4 py-3 rounded-xl border border-slate-200" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                  <input required type="tel" placeholder="Téléphone" className="w-full px-4 py-3 rounded-xl border border-slate-200" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-bold text-slate-900">Informations Professionnelles</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <select required className="w-full px-4 py-3 rounded-xl border border-slate-200" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                    <option value="">Spécialité...</option>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <select required className="w-full px-4 py-3 rounded-xl border border-slate-200" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}>
                    <option value="">Ville...</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select required className="w-full px-4 py-3 rounded-xl border border-slate-200" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})}>
                    <option value="">Expérience...</option>
                    {EXPERIENCE_LEVELS.map(exp => <option key={exp} value={exp}>{exp}</option>)}
                  </select>
                  <select required className="w-full px-4 py-3 rounded-xl border border-slate-200" value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})}>
                    <option value="">Diplôme...</option>
                    {DEGREES.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-fade-in text-center py-10">
                <i className="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
                <h2 className="text-xl font-bold text-slate-900">Prêt pour l'envoi</h2>
                <p className="text-slate-500">En cliquant sur finaliser, vos données seront enregistrées dans notre base Supabase sécurisée.</p>
              </div>
            )}
          </div>

          <div className="bg-slate-50 p-8 flex justify-between">
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-2 font-bold text-slate-500">Retour</button>}
            <div className="flex-grow"></div>
            {step < 3 ? (
              <button type="button" onClick={() => setStep(step + 1)} className="bg-blue-600 text-white px-8 py-2 rounded-xl font-bold">Suivant</button>
            ) : (
              <button type="submit" disabled={loading} className="bg-green-600 text-white px-10 py-3 rounded-xl font-bold flex items-center gap-2">
                {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Finaliser sur Supabase'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherProfile;
