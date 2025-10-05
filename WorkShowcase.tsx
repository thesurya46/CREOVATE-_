import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation, useParallax } from '../hooks/useScrollAnimation';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface WorkShowcaseProps {
  projects: Project[];
}

export const WorkShowcase = ({ projects }: WorkShowcaseProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <section ref={sectionRef} className="relative py-32 bg-black overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          transform: translateY(${scrollY * 0.3}px) rotateX(45deg) scale(1.5),
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div
          className="text-center mb-20"
          style={{
            transform: perspective(1000px) rotateX(${Math.min(scrollY * 0.02, 10)}deg),
          }}
        >
          <h2
            className="text-6xl md:text-8xl font-bold text-white mb-6"
            style={{
              textShadow: '0 0 40px rgba(6, 182, 212, 0.5)',
              transform: translateZ(${scrollY * 0.1}px),
            }}
          >
            Featured Work
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transforming ideas into exceptional digital experiences
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: translateX(-${currentIndex * 100}%) }}
            >
              {projects.map((project, index) => (
                <ProjectSlide
                  key={project.id}
                  project={project}
                  isActive={index === currentIndex}
                />
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-full flex items-center justify-center text-white hover:bg-cyan-500/20 transition-all duration-300 group"
            style={{
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
            }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-125 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-full flex items-center justify-center text-white hover:bg-cyan-500/20 transition-all duration-300 group"
            style={{
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
            }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-125 transition-transform" />
          </button>

          <div className="flex justify-center gap-3 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-12 bg-gradient-to-r from-blue-500 to-cyan-400'
                    : 'w-2 bg-gray-600 hover:bg-gray-500'
                }`}
                style={{
                  boxShadow: index === currentIndex ? '0 0 20px rgba(6, 182, 212, 0.6)' : 'none',
                }}
                aria-label={Go to slide ${index + 1}}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectSlide = ({
  project,
  isActive,
}: {
  project: Project;
  isActive: boolean;
}) => {
  const slug = project.title.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="min-w-full">
      <div className="grid md:grid-cols-2 gap-12 items-center p-8 md:p-16">
        <div
          className="relative group"
          style={{
            transform: isActive ? 'scale(1)' : 'scale(0.95)',
            opacity: isActive ? 1 : 0.5,
            transition: 'all 0.7s ease-in-out',
          }}
        >
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.2), transparent 70%)',
              }}
            />
          </div>

        </div>

        <div
          style={{
            transform: isActive ? 'translateX(0)' : 'translateX(50px)',
            opacity: isActive ? 1 : 0,
            transition: 'all 0.7s ease-in-out 0.2s',
          }}
        >
          <div className="text-sm text-cyan-400 mb-4 font-semibold tracking-wider uppercase">
            {project.category}
          </div>
          <h3
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            style={{
              textShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
            }}
          >
            {project.title}
          </h3>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {['Design', 'Development', 'Strategy'].map((tag) => (
              <span
                key={tag}
                className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-cyan-400 rounded-full text-sm font-semibold border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
                style={{
                  boxShadow: '0 0 10px rgba(6, 182, 212, 0.1)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};