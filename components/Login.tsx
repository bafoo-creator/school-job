
import React, { useState } from 'react';

/**
 * CONFIGURATION GOOGLE FORMS POUR : https://forms.gle/G2TcdLfNHBds9BX3A
 * 
 * 1. Form ID : Ouvrez votre lien, l'ID est dans l'URL finale (ex: 1FAIpQLSfXXXXXXXXXXXX)
 * 2. Entry IDs : Inspectez le code source de votre formulaire (F12) 
 *    et cherchez "entry." pour chaque champ.
 */
const GOOGLE_FORM_CONFIG = {
  // Remplacez 'VOTRE_ID_EXTRAIT' par l'ID réel trouvé après la redirection de votre lien forms.gle
  formActionUrl: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScz_qNq_Your_Real_ID_Here/formResponse', 
  fields: {
    name: 'entry.123456789',    // À REMPLACER par l'ID du champ Nom
    email: 'entry.987654321',   // À REMPLACER par l'ID du champ Email
    password: 'entry.000000000' // À REMPLACER par l'ID du champ Password
  }
};

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simulation de connexion
      console.log("Tentative de connexion pour:", formData.email);
      alert("Espace membre en cours de maintenance. Utilisez l'inscription pour tester l'envoi Google Forms.");
      return;
    }

    // --- LOGIQUE D'ENVOI VERS GOOGLE FORMS ---
    setIsSubmitting(true);
    
    const googleFormData = new FormData();
    googleFormData.append(GOOGLE_FORM_CONFIG.fields.name, formData.name);
    googleFormData.append(GOOGLE_FORM_CONFIG.fields.email, formData.email);
    googleFormData.append(GOOGLE_FORM_CONFIG.fields.password, formData.password);

    try {
      // Envoi en mode 'no-cors' pour éviter les erreurs de sécurité du navigateur avec Google
      await fetch(GOOGLE_FORM_CONFIG.formActionUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: googleFormData
      });
      
      // Succès
      setIsSuccess(true);
      setFormData({ name: '', email: '', password: '' });
      
      // Redirection visuelle après 3 secondes
      setTimeout(() => {
        setIsSuccess(false);
        setIsLogin(true);
      }, 3000);

    } catch (error) {
      console.error("Erreur technique lors de la transmission:", error);
      alert("Une erreur est survenue. Vérifiez votre connexion internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="py-20 bg-slate-50 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-md w-full px-4 text-center">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-12">
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 animate-bounce shadow-inner">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Transmis !</h2>
            <p className="text-slate-500 leading-relaxed">
              Vos informations ont été envoyées vers notre base de données sécurisée.
              <br/><span className="text-blue-600 font-bold">Redirection vers la connexion...</span>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-50 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        {/* WPForms-Inspired Interface */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-slate-50/50 border-b border-slate-100 p-10 text-center">
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200 rotate-3 transition-transform hover:rotate-0">
                <i className="fas fa-graduation-cap text-3xl"></i>
              </div>
              <span className="text-2xl font-black text-blue-900 tracking-tighter uppercase">
                School <span className="text-blue-600">Job</span>
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">
              {isLogin ? 'Bon retour parmi nous' : 'Créer votre compte'}
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              {isLogin ? 'Accédez à votre espace recrutement personnalisé' : 'Rejoignez le réseau n°1 de l\'enseignement au Maroc'}
            </p>
          </div>

          <div className="p-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Nom Complet <span className="text-red-500">*</span></label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300 group-focus-within:text-blue-600 transition-colors">
                      <i className="fas fa-user-circle"></i>
                    </span>
                    <input 
                      required
                      type="text" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all text-sm font-medium"
                      placeholder="Jean Dupont"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Email Professionnel <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300 group-focus-within:text-blue-600 transition-colors">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input 
                    required
                    type="email" 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all text-sm font-medium"
                    placeholder="contact@etablissement.ma"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Mot de passe <span className="text-red-500">*</span></label>
                  {isLogin && (
                    <button type="button" className="text-[10px] font-black text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-wider">Oublié ?</button>
                  )}
                </div>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300 group-focus-within:text-blue-600 transition-colors">
                    <i className="fas fa-shield-alt"></i>
                  </span>
                  <input 
                    required
                    type="password" 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all text-sm font-medium"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              {isLogin && (
                <label className="flex items-center gap-3 cursor-pointer group w-fit">
                  <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 text-blue-600 focus:ring-blue-500 transition-all" />
                  <span className="text-sm text-slate-500 font-medium group-hover:text-slate-900 transition-colors">Rester connecté</span>
                </label>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 mt-6 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <i className="fas fa-circle-notch fa-spin text-xl"></i>
                ) : (
                  <>
                    <span className="uppercase tracking-widest text-sm">{isLogin ? 'Se connecter' : "S'inscrire"}</span>
                    <i className="fas fa-chevron-right text-xs"></i>
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-50 text-center">
              <p className="text-sm text-slate-400 font-medium">
                {isLogin ? "Nouveau sur SCHOOL JOB ?" : "Vous avez déjà un compte ?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 font-black text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {isLogin ? "Créer un profil" : "Se connecter"}
                </button>
              </p>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="bg-slate-50/80 p-5 border-t border-slate-100 flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center">
                  <i className="fas fa-user text-[8px] text-slate-400"></i>
                </div>
              ))}
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
              +500 écoles nous font confiance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
