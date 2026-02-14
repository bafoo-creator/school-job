
import React from 'react';
import { JobOffer } from '../types';

interface Props {
  job: JobOffer;
}

const JobCard: React.FC<Props> = ({ job }) => {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-xl transition-all group relative">
      {job.isNew && (
        <span className="absolute -top-3 left-6 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          Nouveau
        </span>
      )}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
          <p className="text-blue-600 font-medium text-sm">{job.school}</p>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg">
          <i className="far fa-heart text-slate-400 hover:text-red-500 cursor-pointer transition-colors"></i>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <i className="fas fa-map-marker-alt"></i> {job.city}
        </span>
        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <i className="fas fa-graduation-cap"></i> {job.level}
        </span>
        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
          {job.subject}
        </span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-slate-400 text-xs">{job.date}</span>
        <button className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
          Voir l'offre
          <i className="fas fa-arrow-right text-[10px]"></i>
        </button>
      </div>
    </div>
  );
};

export default JobCard;
