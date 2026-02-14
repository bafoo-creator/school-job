
import React, { useState } from 'react';
import { FormField, FieldType } from '../types';
import { suggestFormFields } from '../services/geminiService';

interface Props {
  fields: FormField[];
  onChange: (fields: FormField[]) => void;
  jobTitle: string;
}

const WPFormsBuilder: React.FC<Props> = ({ fields, onChange, jobTitle }) => {
  const [loadingAI, setLoadingAI] = useState(false);

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      label: type === 'file' ? 'Télécharger votre CV' : 'Nouvelle Question',
      placeholder: 'Entrez votre réponse ici...',
      required: true
    };
    onChange([...fields, newField]);
  };

  const removeField = (id: string) => {
    onChange(fields.filter(f => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    onChange(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const handleAISuggestions = async () => {
    if (!jobTitle) return alert("Veuillez d'abord saisir un titre de poste.");
    setLoadingAI(true);
    const suggestions = await suggestFormFields(jobTitle);
    const newFields = suggestions.map((s: any) => ({
      id: Math.random().toString(36).substr(2, 9),
      ...s
    }));
    onChange([...fields, ...newFields]);
    setLoadingAI(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-slate-100 p-1 rounded-3xl overflow-hidden border border-slate-200">
      {/* Left Sidebar: Field Options */}
      <div className="lg:w-72 bg-white p-6 border-r border-slate-200">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-xs uppercase">WP</div>
          <h3 className="font-bold text-slate-800">Champs WPForms</h3>
        </div>
        
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Champs Standards</p>
          <button onClick={() => addField('text')} className="w-full flex items-center gap-3 p-3 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-all">
            <i className="fas fa-font text-slate-400 w-4"></i> Texte court
          </button>
          <button onClick={() => addField('textarea')} className="w-full flex items-center gap-3 p-3 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-all">
            <i className="fas fa-align-left text-slate-400 w-4"></i> Paragraphe
          </button>
          <button onClick={() => addField('email')} className="w-full flex items-center gap-3 p-3 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-all">
            <i className="fas fa-envelope text-slate-400 w-4"></i> Email
          </button>
          
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 mb-2">Champs Avancés</p>
          <button onClick={() => addField('file')} className="w-full flex items-center gap-3 p-3 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-all">
            <i className="fas fa-cloud-upload-alt text-slate-400 w-4"></i> Upload CV/Fichier
          </button>
          <button onClick={() => addField('checkbox')} className="w-full flex items-center gap-3 p-3 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-all">
            <i className="fas fa-check-square text-slate-400 w-4"></i> Case à cocher
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100">
          <button 
            onClick={handleAISuggestions}
            disabled={loadingAI}
            className="w-full bg-blue-600 text-white text-xs font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
          >
            {loadingAI ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
            Smart Suggest (IA)
          </button>
        </div>
      </div>

      {/* Main Builder Area */}
      <div className="flex-1 p-8 min-h-[500px]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-8 shadow-inner min-h-[400px]">
            {fields.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 text-2xl mb-4">
                  <i className="fas fa-plus"></i>
                </div>
                <p className="text-slate-400 font-medium">Cliquez sur un champ à gauche pour commencer à construire votre formulaire de candidature.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {fields.map((field) => (
                  <div key={field.id} className="group relative bg-slate-50 border border-slate-200 p-5 rounded-xl hover:border-blue-400 hover:ring-2 hover:ring-blue-100 transition-all">
                    <button 
                      onClick={() => removeField(field.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                    
                    <div className="flex flex-col gap-3">
                      <input 
                        type="text" 
                        value={field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                        className="bg-transparent font-bold text-slate-800 border-none p-0 focus:ring-0 w-full"
                        placeholder="Libellé de la question..."
                      />
                      
                      <div className="relative">
                        {field.type === 'textarea' ? (
                          <div className="w-full h-20 bg-white border border-slate-200 rounded-lg"></div>
                        ) : field.type === 'file' ? (
                          <div className="w-full p-4 border-2 border-dashed border-slate-200 rounded-lg flex items-center gap-3 text-slate-400 text-sm">
                            <i className="fas fa-file-pdf"></i> Glissez votre fichier ici
                          </div>
                        ) : (
                          <div className="w-full h-10 bg-white border border-slate-200 rounded-lg"></div>
                        )}
                        <div className="absolute inset-0 bg-transparent cursor-default"></div>
                      </div>

                      <div className="flex items-center gap-4 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={field.required}
                            onChange={(e) => updateField(field.id, { required: e.target.checked })}
                            className="rounded text-blue-600 focus:ring-blue-500" 
                          />
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Obligatoire</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="text-center pt-8">
                  <span className="text-xs text-slate-400 flex items-center justify-center gap-2">
                    <i className="fas fa-lock"></i> Sécurisé par SCHOOL JOB Form Engine
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WPFormsBuilder;
