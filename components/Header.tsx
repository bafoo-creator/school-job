
import React from 'react';

interface Props {
  onNavigate: (page: any) => void;
  activePage: string;
  userName?: string;
  onLogout: () => void;
}

const Header: React.FC<Props> = ({ onNavigate, activePage, userName, onLogout }) => {
  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg"><i className="fas fa-graduation-cap text-xl"></i></div>
            <span className="text-xl font-bold text-blue-900 tracking-tighter uppercase">School <span className="text-blue-600">Job</span></span>
          </button>
          
          <nav className="hidden md:flex items-center space-x-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
            <button onClick={() => onNavigate('home')} className={`hover:text-blue-600 ${activePage === 'home' ? 'text-blue-600' : ''}`}>Accueil</button>
            <button onClick={() => onNavigate('profile')} className={`hover:text-blue-600 ${activePage === 'profile' ? 'text-blue-600' : ''}`}>Espace Candidat</button>
            <button onClick={() => onNavigate('admin-candidates')} className={`hover:text-blue-600 ${activePage === 'admin-candidates' ? 'text-blue-600' : ''}`}>Base de données</button>
            <button onClick={() => onNavigate('contact')} className={`hover:text-blue-600 ${activePage === 'contact' ? 'text-blue-600' : ''}`}>Contact</button>
          </nav>

          <div className="flex items-center gap-4">
            {userName ? (
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-xs font-bold text-slate-900 bg-slate-100 px-3 py-2 rounded-lg">Bonjour, {userName.split(' ')[0]}</span>
                <button onClick={onLogout} className="text-red-500 hover:text-red-700 font-bold text-xs uppercase tracking-widest">Quitter</button>
              </div>
            ) : (
              <>
                <button onClick={() => onNavigate('login')} className="text-xs font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-colors">Connexion</button>
                <button onClick={() => onNavigate('profile')} className="bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">S'inscrire</button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
