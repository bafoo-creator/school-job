
import React, { useState } from 'react';
import { candidateService } from '../services/candidateService';

interface Props {
  onLoginSuccess: (user: any) => void;
  onNavigate: (page: any) => void;
}

const Login: React.FC<Props> = ({ onLoginSuccess, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const user = await candidateService.authenticate(email, password);
      if (user) {
        onLoginSuccess(user);
        onNavigate('home');
      } else {
        setError('Email ou mot de passe incorrect.');
      }
    } catch (err) {
      setError('Erreur de connexion à la base de données.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-slate-50 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-fade-in">
          <div className="bg-slate-50/50 border-b border-slate-100 p-10 text-center">
            <div className="bg-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-6">
              <i className="fas fa-lock text-2xl"></i>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter tracking-widest">Connexion Supabase</h2>
          </div>

          <div className="p-10">
            {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">{error}</div>}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white outline-none transition-all font-medium" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mot de passe</label>
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white outline-none transition-all font-medium" />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                {isSubmitting ? <i className="fas fa-circle-notch fa-spin"></i> : <span className="uppercase tracking-widest text-sm">Se Connecter</span>}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button onClick={() => onNavigate('profile')} className="text-sm font-bold text-blue-600">Créer un profil</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
