import { useEffect } from 'react';

export function FullPageLoader() {
  useEffect(() => {
    // Create floating particles
    function createParticles() {
      const particlesContainer = document.getElementById('particles');
      if (!particlesContainer) return;

      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = Math.random() * 10 + 8 + 's';
        particlesContainer.appendChild(particle);
      }
    }

    // Initialize particles
    createParticles();

    // Add hover effects
    document.querySelectorAll('.loader').forEach(loader => {
      const handleMouseEnter = () => {
        (loader as HTMLElement).style.transform = 'scale(1.1) translateY(-5px)';
        (loader as HTMLElement).style.transition = 'all 0.3s ease';
      };

      const handleMouseLeave = () => {
        (loader as HTMLElement).style.transform = 'scale(1) translateY(0)';
      };

      loader.addEventListener('mouseenter', handleMouseEnter);
      loader.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup function
      return () => {
        loader.removeEventListener('mouseenter', handleMouseEnter);
        loader.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  return (
    <div
      className="min-h-screen flex justify-center items-center m-0 font-serif overflow-hidden relative"
      style={{
        background: 'radial-gradient(circle at 20% 50%, #1a0a1a 0%, #2a1a3a 30%, #0a0a1a 70%)',
      }}
    >
      {/* Floating particles background */}
      <div
        id="particles"
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      ></div>

      <div
        className="flex gap-5 items-center z-20 relative px-12 py-10 rounded-3xl backdrop-blur-3xl"
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          border: '2px solid rgba(255, 105, 180, 0.4)',
          boxShadow: `
               0 25px 50px rgba(255, 105, 180, 0.2),
               0 0 50px rgba(138, 43, 226, 0.15),
               inset 0 1px 0 rgba(255, 255, 255, 0.1)
             `,
          animation: 'containerGlow 4s ease-in-out infinite alternate',
        }}
      >
        {/* S */}
        <div className="loader s">
          <svg
            viewBox="0 0 70 90"
            className="block w-full h-full"
            style={{ filter: 'drop-shadow(0 0 15px rgba(255, 105, 180, 0.4))' }}
          >
            <path
              d="M55 20 L20 20 Q10 20 10 30 Q10 35 15 35 L45 35 Q60 35 60 50 Q60 70 45 70 L15 70"
              fill="none"
              strokeWidth="10"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* E */}
        <div className="loader e">
          <svg
            viewBox="0 0 70 90"
            className="block w-full h-full"
            style={{ filter: 'drop-shadow(0 0 15px rgba(255, 105, 180, 0.4))' }}
          >
            <path
              d="M15 70 L15 20 L55 20 M15 45 L50 45 M15 70 L55 70"
              fill="none"
              strokeWidth="10"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* A */}
        <div className="loader a">
          <svg
            viewBox="0 0 70 90"
            className="block w-full h-full"
            style={{ filter: 'drop-shadow(0 0 15px rgba(255, 105, 180, 0.4))' }}
          >
            <path
              d="M10 70 L35 20 L60 70 M20 55 L50 55"
              fill="none"
              strokeWidth="10"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* M */}
        <div className="loader m">
          <svg
            viewBox="0 0 70 90"
            className="block w-full h-full"
            style={{ filter: 'drop-shadow(0 0 15px rgba(255, 105, 180, 0.4))' }}
          >
            <path
              d="M10 70 L10 20 L35 45 L60 20 L60 70"
              fill="none"
              strokeWidth="10"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* L */}
        <div className="loader l">
          <svg
            viewBox="0 0 70 90"
            className="block w-full h-full"
            style={{ filter: 'drop-shadow(0 0 15px rgba(255, 105, 180, 0.4))' }}
          >
            <path
              d="M15 20 L15 70 L55 70"
              fill="none"
              strokeWidth="10"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* E */}
        <div className="loader e">
          <svg
            viewBox="0 0 70 90"
            className="block w-full h-full"
            style={{ filter: 'drop-shadow(0 0 15px rgba(255, 105, 180, 0.4))' }}
          >
            <path
              d="M15 70 L15 20 L55 20 M15 45 L50 45 M15 70 L55 70"
              fill="none"
              strokeWidth="10"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* S */}
        <div className="loader s">
          <svg
            viewBox="0 0 70 90"
            className="block w-full h-full"
            style={{ filter: 'drop-shadow(0 0 15px rgba(255, 105, 180, 0.4))' }}
          >
            <path
              d="M55 20 L20 20 Q10 20 10 30 Q10 35 15 35 L45 35 Q60 35 60 50 Q60 70 45 70 L15 70"
              fill="none"
              strokeWidth="10"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* S */}
        <div className="loader s">
          <svg
            viewBox="0 0 70 90"
            className="block w-full h-full"
            style={{ filter: 'drop-shadow(0 0 15px rgba(255, 105, 180, 0.4))' }}
          >
            <path
              d="M55 20 L20 20 Q10 20 10 30 Q10 35 15 35 L45 35 Q60 35 60 50 Q60 70 45 70 L15 70"
              fill="none"
              strokeWidth="10"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <style>{`
        /* Animated background particles */
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 105, 180, 0.5);
          border-radius: 50%;
          animation: float 8s infinite linear;
          box-shadow: 0 0 6px rgba(255, 105, 180, 0.7);
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes containerGlow {
          0% {
            box-shadow: 
              0 25px 50px rgba(255, 105, 180, 0.2),
              0 0 50px rgba(138, 43, 226, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }
          100% {
            box-shadow: 
              0 25px 50px rgba(255, 105, 180, 0.3),
              0 0 80px rgba(138, 43, 226, 0.25),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }
        }

        .loader {
          --path: #4a4a5a;
          --dot: #ff69b4;
          --glow: #8a2be2;
          --secondary: #da70d6;
          --duration: 4s;
          width: 70px;
          height: 90px;
          position: relative;
          display: inline-block;
        }

        .loader:before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: absolute;
          display: block;
          background: radial-gradient(circle, var(--dot) 0%, var(--glow) 70%);
          box-shadow: 
            0 0 20px var(--dot),
            0 0 40px var(--glow),
            0 0 60px var(--secondary);
          z-index: 10;
          transition: all 0.3s ease;
        }

        .loader:hover:before {
          width: 12px;
          height: 12px;
          box-shadow: 
            0 0 30px var(--dot),
            0 0 60px var(--glow),
            0 0 90px var(--secondary);
        }

        .loader svg path {
          stroke: var(--path);
          transition: stroke 0.3s ease;
        }

        .loader:hover svg path {
          stroke: var(--dot);
          filter: drop-shadow(0 0 10px var(--dot));
        }

        /* Enhanced Letter Animations */
        
        /* Letter S */
        .loader.s svg path {
          stroke-dasharray: 140;
          animation: pathS var(--duration) cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }
        .loader.s:before {
          animation: dotS var(--duration) cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }

        /* Letter E */
        .loader.e svg path {
          stroke-dasharray: 120;
          animation: pathE var(--duration) cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }
        .loader.e:before {
          animation: dotE var(--duration) cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }

        /* Letter A */
        .loader.a svg path {
          stroke-dasharray: 130;
          animation: pathA var(--duration) cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }
        .loader.a:before {
          animation: dotA var(--duration) cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }

        /* Letter M */
        .loader.m svg path {
          stroke-dasharray: 160;
          animation: pathM var(--duration) cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }
        .loader.m:before {
          animation: dotM var(--duration) cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }

        /* Letter L */
        .loader.l svg path {
          stroke-dasharray: 100;
          animation: pathL var(--duration) cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }
        .loader.l:before {
          animation: dotL var(--duration) cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }

        /* Staggered wave animation */
        .loader:nth-child(1) { animation: letterPulse var(--duration) ease-in-out infinite; animation-delay: 0s; }
        .loader:nth-child(2) { animation: letterPulse var(--duration) ease-in-out infinite; animation-delay: 0.15s; }
        .loader:nth-child(3) { animation: letterPulse var(--duration) ease-in-out infinite; animation-delay: 0.3s; }
        .loader:nth-child(4) { animation: letterPulse var(--duration) ease-in-out infinite; animation-delay: 0.45s; }
        .loader:nth-child(5) { animation: letterPulse var(--duration) ease-in-out infinite; animation-delay: 0.6s; }
        .loader:nth-child(6) { animation: letterPulse var(--duration) ease-in-out infinite; animation-delay: 0.75s; }
        .loader:nth-child(7) { animation: letterPulse var(--duration) ease-in-out infinite; animation-delay: 0.9s; }
        .loader:nth-child(8) { animation: letterPulse var(--duration) ease-in-out infinite; animation-delay: 1.05s; }

        .loader:nth-child(1):before { animation-delay: 0s; }
        .loader:nth-child(2):before { animation-delay: 0.15s; }
        .loader:nth-child(3):before { animation-delay: 0.3s; }
        .loader:nth-child(4):before { animation-delay: 0.45s; }
        .loader:nth-child(5):before { animation-delay: 0.6s; }
        .loader:nth-child(6):before { animation-delay: 0.75s; }
        .loader:nth-child(7):before { animation-delay: 0.9s; }
        .loader:nth-child(8):before { animation-delay: 1.05s; }

        @keyframes letterPulse {
          0%, 90% { 
            transform: scale(1) translateY(0);
            filter: brightness(1);
          }
          95% { 
            transform: scale(1.1) translateY(-5px);
            filter: brightness(1.5);
          }
          100% { 
            transform: scale(1) translateY(0);
            filter: brightness(1);
          }
        }

        /* Enhanced Path Animations */
        @keyframes pathS {
          0% { stroke-dashoffset: 140; }
          70% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -20; }
        }
        @keyframes dotS {
          0% { left: 45px; top: 15px; transform: scale(1); }
          20% { left: 25px; top: 20px; transform: scale(1.2); }
          40% { left: 35px; top: 40px; transform: scale(1); }
          60% { left: 20px; top: 50px; transform: scale(1.2); }
          80% { left: 40px; top: 65px; transform: scale(1); }
          100% { left: 45px; top: 15px; transform: scale(1); }
        }

        @keyframes pathE {
          0% { stroke-dashoffset: 120; }
          70% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -15; }
        }
        @keyframes dotE {
          0% { left: 15px; top: 65px; transform: scale(1); }
          25% { left: 15px; top: 45px; transform: scale(1.2); }
          50% { left: 35px; top: 40px; transform: scale(1); }
          75% { left: 15px; top: 25px; transform: scale(1.2); }
          100% { left: 45px; top: 15px; transform: scale(1); }
        }

        @keyframes pathA {
          0% { stroke-dashoffset: 130; }
          70% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -15; }
        }
        @keyframes dotA {
          0% { left: 15px; top: 65px; transform: scale(1); }
          35% { left: 30px; top: 15px; transform: scale(1.2); }
          70% { left: 45px; top: 65px; transform: scale(1); }
          100% { left: 15px; top: 65px; transform: scale(1); }
        }

        @keyframes pathM {
          0% { stroke-dashoffset: 160; }
          70% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -20; }
        }
        @keyframes dotM {
          0% { left: 12px; top: 65px; transform: scale(1); }
          25% { left: 12px; top: 15px; transform: scale(1.2); }
          50% { left: 30px; top: 35px; transform: scale(1); }
          75% { left: 48px; top: 15px; transform: scale(1.2); }
          100% { left: 48px; top: 65px; transform: scale(1); }
        }

        @keyframes pathL {
          0% { stroke-dashoffset: 100; }
          70% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -10; }
        }
        @keyframes dotL {
          0% { left: 15px; top: 15px; transform: scale(1); }
          60% { left: 15px; top: 65px; transform: scale(1.2); }
          100% { left: 45px; top: 65px; transform: scale(1); }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .seamless-container {
            gap: 8px;
            padding: 20px;
          }
          .loader {
            width: 45px;
            height: 60px;
          }
        }
      `}</style>
    </div>
  );
}
