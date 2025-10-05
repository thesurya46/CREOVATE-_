import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface ServicesProps {
  services: Service[];
}

const RippleCard = ({ service, index }: { service: Service; index: number }) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollAnimation(cardRef);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 1000);
  };

  const IconComponent = (Icons as any)[service.icon] || Icons.Circle;
  const slug = service.title.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link to={/service/${slug}}>
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        className="relative group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transitionDelay: ${index * 100}ms,
        }}
      >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-cyan-400/30 rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <div className="relative z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
        <p className="text-gray-400 leading-relaxed">{service.description}</p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/10 group-hover:to-cyan-600/10 transition-all duration-500" />
      </div>
    </Link>
  );
};

export const Services = ({ services }: ServicesProps) => {
  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            What We Do
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive solutions designed to elevate your digital presence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <RippleCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};