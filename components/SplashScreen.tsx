
import React, { useEffect, useState } from 'react';

interface Props {
  onFinish: () => void;
}

const SplashScreen: React.FC<Props> = ({ onFinish }) => {
  const [phase, setPhase] = useState<'intro' | 'exit'>('intro');

  useEffect(() => {
    // Phase 1: Show logo for 1.8 seconds
    const timer1 = setTimeout(() => {
      setPhase('exit');
    }, 1800);

    // Phase 2: Complete the animation after the exit transition
    const timer2 = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-blue-600 transition-all duration-700 ease-in-out ${
      phase === 'exit' ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
    }`}>
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl transition-transform duration-[2000ms] ${phase === 'exit' ? 'scale-150' : 'scale-100'}`}></div>
        <div className={`absolute -bottom-20 -right-20 w-96 h-96 bg-blue-700 rounded-full blur-3xl transition-transform duration-[2000ms] ${phase === 'exit' ? 'scale-150' : 'scale-100'}`}></div>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Animated Logo Container */}
        <div className={`flex flex-col items-center transition-all duration-700 ${
          phase === 'intro' ? 'animate-bounce' : 'scale-125 opacity-0'
        }`}>
          <div className="bg-white text-blue-600 w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl mb-6 transform rotate-3">
            <i className="fas fa-graduation-cap text-5xl"></i>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase flex items-center gap-2">
            School <span className="bg-white text-blue-600 px-2 py-0.5 rounded-lg">Job</span>
          </h1>
          <div className="mt-4 flex gap-1">
            <div className="w-2 h-2 bg-blue-200 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-200 rounded-full animate-pulse [animation-delay:200ms]"></div>
            <div className="w-2 h-2 bg-blue-200 rounded-full animate-pulse [animation-delay:400ms]"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
