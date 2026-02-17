
import React from 'react';

interface Props {
  onAction?: () => void;
}

const steps = [
  {
    icon: 'fa-user-plus',
    title: 'Créer un profil',
    desc: 'Ajoutez votre CV, vos diplômes et vos compétences en quelques minutes.',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: 'fa-search',
    title: 'Chercher des offres',
    desc: 'Filtrez par ville, matière et niveau scolaire pour trouver le poste idéal.',
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: 'fa-paper-plane',
    title: 'Postuler facilement',
    desc: 'Envoyez votre candidature en un clic directement aux établissements.',
    color: 'bg-orange-100 text-orange-600'
  }
];

const HowItWorks: React.FC<Props> = ({ onAction }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Comment ça marche ?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Une méthode simple et efficace pour booster votre carrière dans l'enseignement privé.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className={`${step.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform shadow-sm`}>
                <i className={`fas ${step.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {onAction && (
          <div className="text-center">
            <button 
              onClick={onAction}
              className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
            >
              Commencer mon inscription
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;
