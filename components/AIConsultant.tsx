
import React, { useState } from 'react';
import { getTeacherAdvice } from '../services/geminiService';
import { SUBJECTS } from '../constants';

const AIConsultant: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    if (!selectedSubject) return;
    setLoading(true);
    const result = await getTeacherAdvice(selectedSubject);
    setAdvice(result || 'Désolé, impossible de générer des conseils pour le moment.');
    setLoading(false);
  };

  return (
    <div className="bg-blue-900 rounded-3xl p-8 lg:p-12 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
        <i className="fas fa-robot text-8xl"></i>
      </div>
      
      <div className="relative z-10 max-w-2xl">
        <span className="bg-blue-500/30 text-blue-200 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
          Assistant IA Intelligence
        </span>
        <h2 className="text-3xl font-bold mb-4">Boostez votre candidature avec l'IA</h2>
        <p className="text-blue-200 mb-8">Sélectionnez votre spécialité pour obtenir des conseils personnalisés et convaincre les recruteurs.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <select 
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="" className="text-slate-900">Spécialité...</option>
            {SUBJECTS.map(s => <option key={s} value={s} className="text-slate-900">{s}</option>)}
          </select>
          <button 
            onClick={handleGetAdvice}
            disabled={loading || !selectedSubject}
            className="bg-white text-blue-900 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : 'Obtenir mes conseils'}
          </button>
        </div>

        {advice && (
          <div className="bg-white/10 rounded-2xl p-6 border border-white/10 animate-fade-in">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <i className="fas fa-lightbulb text-yellow-400"></i> Conseils pour {selectedSubject} :
            </h4>
            <div className="prose prose-invert text-sm whitespace-pre-wrap">
              {advice}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIConsultant;
