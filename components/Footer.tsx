
import React from 'react';

interface Props {
  onNavigate: (page: 'home' | 'contact' | 'post-job' | 'login') => void;
}

const Footer: React.FC<Props> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 mb-6"
            >
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <i className="fas fa-graduation-cap text-xl"></i>
              </div>
              <span className="text-xl font-bold text-white tracking-tight uppercase">School <span className="text-blue-500">Job</span></span>
            </button>
            <p className="text-sm leading-relaxed mb-6">
              La première plateforme dédiée exclusivement au recrutement dans le secteur de l'enseignement privé au Maroc.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-white transition-colors"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="hover:text-white transition-colors"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-left">
              <li><button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition-colors text-left">Accueil</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition-colors text-left">Offres d'emploi</button></li>
              <li><button onClick={() => onNavigate('login')} className="hover:text-blue-400 transition-colors text-left">Déposer mon CV</button></li>
              <li><button onClick={() => onNavigate('post-job')} className="hover:text-blue-400 transition-colors text-left">Espace Recruteur</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Informations</h4>
            <ul className="space-y-4 text-sm text-left">
              <li><a href="#" className="hover:text-blue-400 transition-colors">À propos</a></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors text-left">Contactez-nous</button></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Mentions légales</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Confidentialité</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Recevez les dernières offres directement par email.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">
                OK
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} SCHOOL JOB Recrutement. Tous droits réservés. Développé pour l'excellence éducative au Maroc.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
