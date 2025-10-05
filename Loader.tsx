import { useEffect, useState } from 'react';

export const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const name = "THE BIT BUSTERS";

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const letterInterval = setInterval(() => {
      setLetterIndex((prev) => (prev < name.length ? prev + 1 : prev));
    }, 100);

    return () => clearInterval(letterInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: ${Math.random() * 100}%,
              top: ${Math.random() * 100}%,
              animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite,
              animationDelay: ${Math.random() * 2}s,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, #3b82f6, #06b6d4, transparent)',
            animation: 'pulse 3s ease-in-out infinite',
          }}
        />
      </div>

      <div className="text-center relative z-10">
        <div className="mb-12">
          <div className="text-7xl md:text-8xl font-black text-white mb-8 tracking-wider relative">
            {name.split('').map((letter, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  animation: i < letterIndex ? 'letterBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none',
                  opacity: i < letterIndex ? 1 : 0,
                  transform: i < letterIndex ? 'translateY(0)' : 'translateY(50px)',
                  textShadow: `
                    0 0 20px rgba(59, 130, 246, 0.8),
                    0 0 40px rgba(6, 182, 212, 0.6),
                    0 0 60px rgba(59, 130, 246, 0.4),
                    0 5px 15px rgba(0, 0, 0, 0.5)
                  `,
                  background: 'linear-gradient(45deg, #3b82f6, #06b6d4, #3b82f6)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.8))',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>

          <div className="relative w-96 mx-auto">
            <div className="h-2 bg-gray-900 rounded-full overflow-hidden shadow-lg border border-gray-800">
              <div
                className="h-full rounded-full relative overflow-hidden"
                style={{
                  width: ${progress}%,
                  background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6)',
                  backgroundSize: '200% auto',
                  animation: 'shimmer 2s linear infinite',
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.6), 0 0 40px rgba(59, 130, 246, 0.4)',
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    animation: 'slide 1.5s ease-in-out infinite',
                  }}
                />
              </div>
            </div>
            <div className="absolute -top-8 left-0 right-0 text-center">
              <span
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.8))',
                  animation: 'float 2s ease-in-out infinite',
                }}
              >
                {progress}%
              </span>
            </div>
          </div>
        </div>

        <div className="text-gray-400 text-lg font-light tracking-[0.3em] uppercase mt-8">
          <span
            style={{
              animation: 'pulse 2s ease-in-out infinite',
            }}
          >
            Loading Experience
          </span>
        </div>
      </div>

      <style>{`
        @keyframes letterBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};