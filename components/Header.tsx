
import React from 'react';

interface Props {
  onNavigate: (page: 'home' | 'contact' | 'post-job' | 'login') => void;
  activePage: 'home' | 'contact' | 'post-job' | 'login';
}

const Header: React.FC<Props> = ({ onNavigate, activePage }) => {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2"
          >
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <i className="fas fa-graduation-cap text-xl"></i>
            </div>
            <span className="text-xl font-bold text-blue-900 tracking-tight uppercase">School <span className="text-blue-600">Job</span></span>
          </button>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <button 
              onClick={() => onNavigate('home')} 
              className={`transition-colors ${activePage === 'home' ? 'text-blue-600 underline underline-offset-8' : 'hover:text-blue-600'}`}
            >
              Accueil
            </button>
            <a href="#offres" className="hover:text-blue-600 transition-colors" onClick={() => activePage !== 'home' && onNavigate('home')}>Offres</a>
            <button 
              onClick={() => onNavigate('post-job')} 
              className={`transition-colors font-bold ${activePage === 'post-job' ? 'text-blue-600' : 'text-blue-700 hover:text-blue-900'}`}
            >
              Publier une offre
            </button>
            <button 
              onClick={() => onNavigate('contact')} 
              className={`transition-colors ${activePage === 'contact' ? 'text-blue-600' : 'hover:text-blue-600'}`}
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('login')}
              className={`text-sm font-medium transition-colors hidden sm:block ${activePage === 'login' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Connexion
            </button>
            <button 
              onClick={() => onNavigate('login')}
              className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-md"
            >
              Inscription
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
