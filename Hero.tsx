import { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useParallax } from '../hooks/useScrollAnimation';

const words = ['Innovation', 'Excellence', 'Creativity', 'Impact'];

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  speedX: number;
  speedY: number;
  speedZ: number;
  opacity: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
}

export const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const offsetY = useParallax();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createParticle = (): Particle => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x,
        y,
        z: Math.random() * 1000,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        speedZ: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        baseX: x,
        baseY: y,
        vx: 0,
        vy: 0,
      };
    };

    particlesRef.current = [];
    for (let i = 0; i < 200; i++) {
      particlesRef.current.push(createParticle());
    }

    let animationFrame: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.z -= particle.speedZ;
        if (particle.z <= 0) {
          particle.z = 1000;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.baseX = particle.x;
          particle.baseY = particle.y;
        }

        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 150;

        if (distance < repelRadius) {
          const force = (repelRadius - distance) / repelRadius;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 3;
          particle.vy -= Math.sin(angle) * force * 3;
        }

        particle.vx *= 0.95;
        particle.vy *= 0.95;

        particle.x += particle.speedX + particle.vx;
        particle.y += particle.speedY + particle.vy;

        const returnForce = 0.02;
        particle.x += (particle.baseX - particle.x) * returnForce;
        particle.y += (particle.baseY - particle.y) * returnForce;

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
          particle.baseX = particle.x;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
          particle.baseY = particle.y;
        }

        const scale = 1000 / (1000 + particle.z);
        const x2d = (particle.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d = (particle.y - canvas.height / 2) * scale + canvas.height / 2;
        const size2d = particle.size * scale;

        ctx.beginPath();
        ctx.arc(x2d, y2d, size2d, 0, Math.PI * 2);

        const hue = 180 + (particle.z / 1000) * 20;
        ctx.fillStyle = hsla(${hue}, 80%, 60%, ${particle.opacity * scale});
        ctx.fill();

        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size2d * 4);
        gradient.addColorStop(0, hsla(${hue}, 80%, 60%, ${0.15 * scale}));
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size2d * 4, 0, Math.PI * 2);
        ctx.fill();

        if (distance < repelRadius) {
          ctx.strokeStyle = rgba(6, 182, 212, ${0.2 * (1 - distance / repelRadius)});
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x2d, y2d);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }
      });

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];

          const scale1 = 1000 / (1000 + p1.z);
          const scale2 = 1000 / (1000 + p2.z);
          const x1 = (p1.x - canvas.width / 2) * scale1 + canvas.width / 2;
          const y1 = (p1.y - canvas.height / 2) * scale1 + canvas.height / 2;
          const x2 = (p2.x - canvas.width / 2) * scale2 + canvas.width / 2;
          const y2 = (p2.y - canvas.height / 2) * scale2 + canvas.height / 2;

          const dx = x2 - x1;
          const dy = y2 - y1;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = rgba(6, 182, 212, ${0.1 * (1 - distance / 100)});
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ mixBlendMode: 'screen' }}
      />

      <div
        className="absolute inset-0 z-0"
        style={{
          background: radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(59, 130, 246, 0.15), transparent 50%),
        }}
      />

      <div className="absolute inset-0 z-0 perspective-1000">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: 'linear-gradient(45deg, #3b82f6, #06b6d4)',
            transform: translate3d(${mousePosition.x * 50}px, ${mousePosition.y * 50}px, 0) rotateX(${mousePosition.y * 20}deg) rotateY(${mousePosition.x * 20}deg),
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'linear-gradient(225deg, #06b6d4, #3b82f6)',
            transform: translate3d(${mousePosition.x * -30}px, ${mousePosition.y * -30}px, 0) rotateX(${mousePosition.y * -15}deg) rotateY(${mousePosition.x * -15}deg),
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          transform: translateY(${offsetY * 0.3}px) perspective(1000px) rotateX(60deg) scale(2),
          transformOrigin: 'center top',
        }}
      />

      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          transform: translateY(${offsetY * 0.4}px),
        }}
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: ${Math.random() * 300 + 100}px,
              height: ${Math.random() * 300 + 100}px,
              left: ${Math.random() * 100}%,
              top: ${Math.random() * 100}%,
              background: radial-gradient(circle, rgba(59, 130, 246, ${Math.random() * 0.1}) 0%, transparent 70%),
              animation: float ${Math.random() * 10 + 10}s ease-in-out infinite,
              animationDelay: ${Math.random() * 5}s,
              transform: translate3d(${mousePosition.x * (i * 2)}px, ${mousePosition.y * (i * 2)}px, 0),
              transition: 'transform 0.5s ease-out',
            }}
          />
        ))}
      </div>

      <div
        className="relative z-10 text-center px-4"
        style={{
          transform: translate3d(${mousePosition.x * 10}px, ${mousePosition.y * 10}px, 0),
          transition: 'transform 0.3s ease-out',
        }}
      >
        <h1
          className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight"
          style={{
            textShadow: `
              0 0 40px rgba(59, 130, 246, 0.5),
              0 0 80px rgba(6, 182, 212, 0.3),
              ${mousePosition.x * 5}px ${mousePosition.y * 5}px 30px rgba(59, 130, 246, 0.4)
            `,
            transform: `
              perspective(1000px)
              rotateX(${mousePosition.y * 3}deg)
              rotateY(${mousePosition.x * 3}deg)
              translateZ(50px)
            `,
          }}
        >
          Crafting
        </h1>
        <div className="h-24 md:h-32 flex items-center justify-center overflow-hidden perspective-1000">
          <h2
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(6, 182, 212, 0.6))',
            }}
          >
            {words.map((word, i) => (
              <span
                key={word}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
                  i === currentWord
                    ? 'opacity-100 translate-y-0 scale-100'
                    : i === (currentWord - 1 + words.length) % words.length
                    ? 'opacity-0 -translate-y-full scale-90'
                    : 'opacity-0 translate-y-full scale-90'
                }`}
                style={{
                  transform: i === currentWord
                    ? perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg) translateZ(30px)
                    : undefined,
                  transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>
        <p
          className="text-xl md:text-2xl text-gray-400 mt-8 max-w-3xl mx-auto font-light"
          style={{
            transform: translateZ(20px),
            textShadow: '0 0 20px rgba(6, 182, 212, 0.2)',
          }}
        >
          We design and build exceptional digital experiences that push boundaries
          and redefine what's possible
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ChevronDown className="w-8 h-8 text-white" style={{ filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.8))' }} />
      </div>
    </section>
  );
};