
import React, { useState } from 'react';
import { MOCK_JOBS, JOB_TYPES } from '../constants';
import { JobOffer } from '../types';

const JobManager: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredJobs = filterType === 'all' 
    ? MOCK_JOBS 
    : MOCK_JOBS.filter(job => job.type === filterType);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      {/* WP Job Manager Style Filter Bar */}
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <button 
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filterType === 'all' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
          >
            Tous les postes
          </button>
          {JOB_TYPES.map(type => (
            <button 
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filterType === type ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="text-slate-400 text-sm italic">
          {filteredJobs.length} offres trouvées
        </div>
      </div>

      {/* Job List */}
      <div className="divide-y divide-slate-100">
        {filteredJobs.map((job) => (
          <div key={job.id} className="p-5 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-blue-600 text-xl font-bold border border-slate-200 group-hover:border-blue-300 transition-colors">
                {job.school.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm font-medium text-slate-600">{job.school}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-sm text-slate-500"><i className="fas fa-map-marker-alt mr-1"></i> {job.city}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                job.type === 'CDI' ? 'bg-green-100 text-green-700' : 
                job.type === 'CDD' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {job.type}
              </span>
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter">Publiée</p>
                <p className="text-sm text-slate-600 font-bold">{job.date}</p>
              </div>
              <i className="fas fa-chevron-right text-slate-300 group-hover:text-blue-600 transition-all group-hover:translate-x-1"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobManager;
