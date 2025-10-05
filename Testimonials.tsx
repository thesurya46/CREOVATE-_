import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  client_name: string;
  client_role: string;
  content: string;
  avatar_url: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
            `,
            transform: scale(${1 + scrollY * 0.2}),
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div
          className="text-center mb-20"
          style={{
            transform: perspective(1000px) translateY(${-scrollY * 50}px) rotateX(${scrollY * 10}deg),
            opacity: 1,
          }}
        >
          <h2
            className="text-6xl md:text-8xl font-bold text-white mb-6"
            style={{
              textShadow: '0 0 60px rgba(6, 182, 212, 0.6)',
            }}
          >
            Client Stories
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            What our clients say about working with us
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative min-h-[400px]">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={index === currentIndex}
                isPrev={index === (currentIndex - 1 + testimonials.length) % testimonials.length}
                isNext={index === (currentIndex + 1) % testimonials.length}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prevTestimonial}
              className="w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 group"
              style={{
                boxShadow: '0 0 30px rgba(6, 182, 212, 0.2)',
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-125 transition-transform" />
            </button>

            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-12 bg-gradient-to-r from-blue-500 to-cyan-400'
                      : 'w-3 bg-gray-700 hover:bg-gray-600'
                  }`}
                  style={{
                    boxShadow: index === currentIndex ? '0 0 20px rgba(6, 182, 212, 0.8)' : 'none',
                  }}
                  aria-label={Go to testimonial ${index + 1}}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 group"
              style={{
                boxShadow: '0 0 30px rgba(6, 182, 212, 0.2)',
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-125 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({
  testimonial,
  isActive,
  isPrev,
  isNext,
}: {
  testimonial: Testimonial;
  isActive: boolean;
  isPrev: boolean;
  isNext: boolean;
}) => {
  const getTransform = () => {
    if (isActive) return 'translateX(0) scale(1) rotateY(0deg)';
    if (isPrev) return 'translateX(-120%) scale(0.85) rotateY(15deg)';
    if (isNext) return 'translateX(120%) scale(0.85) rotateY(-15deg)';
    return 'translateX(0) scale(0.7)';
  };

  const getZIndex = () => {
    if (isActive) return 30;
    if (isPrev || isNext) return 20;
    return 10;
  };

  return (
    <div
      className="absolute inset-0 transition-all duration-700 ease-out"
      style={{
        transform: getTransform(),
        opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
        zIndex: getZIndex(),
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      <div className="relative p-12 bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-3xl border-2 border-cyan-500/20 shadow-2xl overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-400/5"
          style={{
            opacity: isActive ? 1 : 0,
          }}
        />

        <div className="absolute top-8 left-8">
          <Quote
            className="w-16 h-16 text-cyan-400/20"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.3))',
            }}
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 text-yellow-400 fill-yellow-400"
                style={{
                  filter: 'drop-shadow(0 0 5px rgba(250, 204, 21, 0.5))',
                  animation: isActive ? starPulse 2s ease-in-out ${i * 0.1}s infinite : 'none',
                }}
              />
            ))}
          </div>

          <p className="text-gray-100 text-2xl leading-relaxed mb-10 font-light">
            "{testimonial.content}"
          </p>

          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {testimonial.client_name.charAt(0)}
              </div>
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(45deg, #3b82f6, #06b6d4)',
                  filter: 'blur(15px)',
                  opacity: 0.5,
                  zIndex: -1,
                }}
              />
            </div>
            <div>
              <div
                className="text-white font-bold text-2xl mb-1"
                style={{
                  textShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
                }}
              >
                {testimonial.client_name}
              </div>
              {testimonial.client_role && (
                <div className="text-cyan-400 text-lg">{testimonial.client_role}</div>
              )}
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"
          style={{
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.8)',
          }}
        />
      </div>

      <style>{`
        @keyframes starPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};