
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import JobCard from './components/JobCard';
import JobManager from './components/JobManager';
import AIConsultant from './components/AIConsultant';
import Footer from './components/Footer';
import Contact from './components/Contact';
import PostJob from './components/PostJob';
import Login from './components/Login';
import TeacherProfile from './components/TeacherProfile';
import SplashScreen from './components/SplashScreen';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'contact' | 'post-job' | 'login' | 'profile'>('home');
  const [isLaunching, setIsLaunching] = useState(true);

  const navigateTo = (page: 'home' | 'contact' | 'post-job' | 'login' | 'profile') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLaunching) {
    return <SplashScreen onFinish={() => setIsLaunching(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <Header onNavigate={navigateTo} activePage={currentPage} />
      
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero />
            <HowItWorks onAction={() => navigateTo('profile')} />

            {/* Main Job Board Section */}
            <section id="offres" className="py-20 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Offres d'emploi</h2>
                    <p className="text-slate-600">Explorez les opportunités actuelles dans le secteur privé.</p>
                  </div>
                  <button 
                    onClick={() => navigateTo('post-job')}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg"
                  >
                    <i className="fas fa-plus"></i>
                    Publier une offre
                  </button>
                </div>

                <JobManager />
              </div>
            </section>

            {/* AI Career Section */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AIConsultant />
              </div>
            </section>

            {/* School B2B Section */}
            <section id="ecoles" className="py-24 bg-blue-600 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <img 
                  src="https://images.unsplash.com/photo-1523050335392-9bc5ad06fe33?auto=format&fit=crop&q=80&w=1200" 
                  alt="Background" 
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <i className="fas fa-school text-5xl mb-6 text-blue-200"></i>
                <h2 className="text-4xl font-extrabold mb-6 italic text-white uppercase tracking-tighter text-shadow">Espace Recruteurs</h2>
                <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                  Simplifiez votre processus de recrutement. Accédez à une base de données qualifiée de milliers d'enseignants passionnés.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={() => navigateTo('post-job')}
                    className="bg-white text-blue-600 font-bold px-10 py-4 rounded-xl text-lg hover:shadow-2xl transition-all"
                  >
                    Publier une offre gratuitement
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {currentPage === 'contact' && <Contact />}
        {currentPage === 'post-job' && <PostJob />}
        {currentPage === 'login' && <Login />}
        {currentPage === 'profile' && <TeacherProfile />}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
