
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-20 bg-slate-50 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Espace Clientèle</h1>
          <p className="text-lg text-slate-600">
            Une question ? Un besoin spécifique ? Notre équipe est à votre écoute pour vous accompagner.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-5">
          {/* Contact Info Sidebar */}
          <div className="md:col-span-2 bg-blue-600 p-8 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6">Nos Coordonnées</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 p-3 rounded-xl">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <p className="font-semibold">Adresse</p>
                    <p className="text-blue-100 text-sm">Quartier Maârif, Casablanca, Maroc</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 p-3 rounded-xl">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <p className="font-semibold">Téléphone</p>
                    <p className="text-blue-100 text-sm">+212 5 22 00 00 00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 p-3 rounded-xl">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-blue-100 text-sm">contact@schooljob.ma</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-sm text-blue-200 mb-4 tracking-wider uppercase font-bold">Suivez-nous</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="md:col-span-3 p-8 lg:p-12">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6">
                  <i className="fas fa-check"></i>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Envoyé !</h3>
                <p className="text-slate-600">Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-blue-600 font-bold hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Nom Complet</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Email professionnel</label>
                    <input 
                      required
                      type="email" 
                      placeholder="votre@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Téléphone</label>
                    <input 
                      type="tel" 
                      placeholder="+212 ..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Sujet</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all appearance-none bg-no-repeat bg-[right_1rem_center]"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="recrutement">Aide au recrutement</option>
                      <option value="technique">Problème technique</option>
                      <option value="partenariat">Partenariat</option>
                      <option value="autre">Autre demande</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Votre Message</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/20"
                >
                  Envoyer ma demande
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
