import { useRef, useState, useEffect } from 'react';
import { useScrollAnimation, useCountUp } from '../hooks/useScrollAnimation';

interface StatsProps {
  stats: Array<{
    id: string;
    label: string;
    value: number;
    suffix: string;
  }>;
}

export const Stats = ({ stats }: StatsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: perspective(1000px) rotateX(${scrollY * 20}deg) scale(${1 + scrollY * 0.5}),
            transformOrigin: 'center top',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div
          className="text-center mb-16"
          style={{
            transform: translateY(${-scrollY * 30}px),
            opacity: isVisible ? 1 : 0,
          }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{
            textShadow: '0 0 40px rgba(6, 182, 212, 0.5)',
          }}>
            Our Impact
          </h2>
          <p className="text-gray-400 text-xl">Numbers that speak for themselves</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const count = useCountUp(stat.value, 2000, isVisible);
            const delay = index * 0.2;
            const percentage = (count / stat.value) * 100;

            return (
              <div
                key={stat.id}
                className="relative group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? translateY(0) rotateY(0deg) scale(1)
                    : translateY(100px) rotateY(-10deg) scale(0.9),
                  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s,
                }}
              >
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 overflow-hidden group-hover:scale-105">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 200 200">
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="rgba(6, 182, 212, 0.1)"
                        strokeWidth="8"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={${2 * Math.PI * 80}}
                        strokeDashoffset={${2 * Math.PI * 80 * (1 - percentage / 100)}}
                        transform="rotate(-90 100 100)"
                        style={{
                          transition: 'stroke-dashoffset 2s ease-out',
                        }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="relative z-10 text-center">
                    <div
                      className="text-6xl md:text-7xl font-black mb-4"
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))',
                        textShadow: '0 0 40px rgba(6, 182, 212, 0.3)',
                      }}
                    >
                      {count}
                      {stat.suffix}
                    </div>
                    <div className="text-gray-300 text-lg font-semibold uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400"
                    style={{
                      width: ${percentage}%,
                      transition: 'width 2s ease-out',
                      boxShadow: '0 0 20px rgba(6, 182, 212, 0.8)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};