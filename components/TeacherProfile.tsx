
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cvName: e.target.files[0].name });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulation de délai réseau
    setTimeout(() => {
      candidateService.save(formData);
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="py-20 bg-slate-50 min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-2xl text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            <i className="fas fa-check"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Profil Enregistré !</h2>
          <p className="text-slate-600 mb-8">Votre profil est désormais présent dans notre base de données et visible par les recruteurs.</p>
          <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
            Fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {['Compte', 'Expérience', 'Documents'].map((label, i) => (
              <div key={i} className={`text-xs font-black uppercase tracking-widest ${step >= i + 1 ? 'text-blue-600' : 'text-slate-400'}`}>
                {label}
              </div>
            ))}
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 lg:p-12">
            
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Vos Identifiants</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nom Complet</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 outline-none" 
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Email (Connexion)</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 outline-none"
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Mot de passe</label>
                    <input required type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 outline-none"
                      value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Téléphone</label>
                    <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600/20 outline-none"
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Parcours Pro</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Spécialité</label>
                    <select required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                      value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                      <option value="">Sélectionner...</option>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Expérience</label>
                    <select required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                      value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})}>
                      <option value="">Sélectionner...</option>
                      {EXPERIENCE_LEVELS.map(exp => <option key={exp} value={exp}>{exp}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Ville</label>
                    <select required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                      value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}>
                      <option value="">Sélectionner...</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Dernier Diplôme</label>
                    <select required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                      value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})}>
                      <option value="">Sélectionner...</option>
                      {DEGREES.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                    <i className="fas fa-file-upload"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Validation Finale</h2>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center relative group">
                  <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className="flex flex-col items-center">
                    <i className={`fas fa-cloud-upload-alt text-4xl mb-4 ${formData.cvName ? 'text-green-500' : 'text-slate-300 group-hover:text-blue-500'}`}></i>
                    <p className="text-sm font-bold text-slate-700">{formData.cvName || 'Télécharger votre CV (PDF)'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-50 p-8 border-t border-slate-100 flex justify-between gap-4">
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="px-8 py-3 font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all">Précédent</button>}
            <div className="flex-grow"></div>
            {step < 3 ? (
              <button type="button" onClick={() => setStep(step + 1)} className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">Continuer <i className="fas fa-arrow-right text-xs"></i></button>
            ) : (
              <button type="submit" disabled={loading} className="bg-green-500 text-white px-10 py-3 rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg flex items-center gap-2">
                {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>}
                Enregistrer mon profil
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherProfile;
