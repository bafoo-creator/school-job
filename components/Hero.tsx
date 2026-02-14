
import React, { useState } from 'react';
import { CITIES, SUBJECTS, LEVELS } from '../constants';

const Hero: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [city, setCity] = useState('');
  const [level, setLevel] = useState('');

  return (
    <section className="relative bg-blue-600 py-20 lg:py-32 overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
          La plateforme de recrutement dédiée <br className="hidden lg:block"/>
          <span className="text-blue-200">aux écoles privées au Maroc</span>
        </h1>
        <p className="text-blue-100 text-lg lg:text-xl max-w-2xl mx-auto mb-10">
          Trouvez le poste idéal dans les meilleurs établissements du Royaume ou recrutez des talents d'exception pour votre école.
        </p>

        {/* Search Bar */}
        <div className="max-w-5xl mx-auto bg-white p-3 rounded-2xl shadow-2xl flex flex-col lg:flex-row gap-3">
          <div className="flex-1 flex items-center px-4 border-b lg:border-b-0 lg:border-r border-slate-100 py-3 lg:py-0">
            <i className="fas fa-book-open text-blue-500 mr-3"></i>
            <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full focus:outline-none bg-transparent text-slate-700 appearance-none cursor-pointer"
            >
              <option value="">Quelle matière ?</option>
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          
          <div className="flex-1 flex items-center px-4 border-b lg:border-b-0 lg:border-r border-slate-100 py-3 lg:py-0">
            <i className="fas fa-map-marker-alt text-blue-500 mr-3"></i>
            <select 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full focus:outline-none bg-transparent text-slate-700 appearance-none cursor-pointer"
            >
              <option value="">Quelle ville ?</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex-1 flex items-center px-4 py-3 lg:py-0">
            <i className="fas fa-layer-group text-blue-500 mr-3"></i>
            <select 
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full focus:outline-none bg-transparent text-slate-700 appearance-none cursor-pointer"
            >
              <option value="">Niveau scolaire ?</option>
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg">
            <i className="fas fa-search"></i>
            Rechercher
          </button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-blue-100 text-sm">
          <span>Populaire :</span>
          <a href="#" className="underline hover:text-white">Français</a>
          <a href="#" className="underline hover:text-white">Maths</a>
          <a href="#" className="underline hover:text-white">Casablanca</a>
          <a href="#" className="underline hover:text-white">Primaire</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
