
import React, { useState, useEffect } from 'react';
import { candidateService, CandidateProfile } from '../services/candidateService';

const CandidateManagement: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCandidates = async () => {
    setLoading(true);
    const data = await candidateService.getAll();
    setCandidates(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce profil de Supabase ?')) {
      try {
        await candidateService.delete(id);
        fetchCandidates();
      } catch (err) {
        alert("Erreur lors de la suppression.");
      }
    }
  };

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(filter.toLowerCase()) || 
    c.subject.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
              <i className="fas fa-database text-blue-600"></i>
              Base Supabase
            </h1>
            <p className="text-slate-500 font-medium">Gestion en temps réel des profils enseignants.</p>
          </div>
          <div className="relative w-full md:w-96">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-600/10 outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <i className="fas fa-circle-notch fa-spin text-4xl text-blue-600"></i>
              <p className="font-bold text-slate-400">Connexion à Supabase...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidat</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Spécialité</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ville</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredCandidates.length > 0 ? filteredCandidates.map((c) => (
                    <tr key={c.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                            {c.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{c.name}</div>
                            <div className="text-xs text-slate-500">{c.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-blue-600">{c.subject}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{c.city}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleDelete(c.id!)} className="w-8 h-8 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                            <i className="fas fa-trash text-xs"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-20 text-center text-slate-400 font-bold">Aucun candidat</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateManagement;
