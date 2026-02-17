
import React, { useState } from 'react';
import { candidateService } from '../services/candidateService';

interface Props {
  onLoginSuccess: (user: any) => void;
  onNavigate: (page: any) => void;
}

const Login: React.FC<Props> = ({ onLoginSuccess, onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Simulation de délai réseau
    setTimeout(() => {
      const user = candidateService.authenticate(email, password);
      
      if (user) {
        onLoginSuccess(user);
        onNavigate('home');
      } else {
        setError('Identifiants incorrects ou compte inexistant.');
      }
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-slate-50 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-fade-in">
          <div className="bg-slate-50/50 border-b border-slate-100 p-10 text-center">
            <div className="bg-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-6 rotate-3">
              <i className="fas fa-lock text-2xl"></i>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Accès Sécurisé</h2>
            <p className="text-slate-500 text-sm font-medium">Connectez-vous à votre espace SCHOOL JOB</p>
          </div>

          <div className="p-10">
            {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-2 animate-bounce"><i className="fas fa-exclamation-circle"></i> {error}</div>}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all text-sm font-medium"
                  placeholder="votre@email.com" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mot de passe</label>
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all text-sm font-medium"
                  placeholder="••••••••" />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 disabled:opacity-50">
                {isSubmitting ? <i className="fas fa-circle-notch fa-spin"></i> : <span className="uppercase tracking-widest text-sm">Se Connecter</span>}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-50 text-center">
              <p className="text-sm text-slate-400 font-medium">Pas encore inscrit ? 
                <button onClick={() => onNavigate('profile')} className="ml-2 font-black text-blue-600 hover:underline">Créer un profil</button>
              </p>
              <button onClick={() => onNavigate('admin-candidates')} className="mt-4 text-[10px] font-bold text-slate-300 uppercase hover:text-slate-900 transition-colors">Accès Recruteur (Démo)</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
