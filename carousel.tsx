import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  items: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
  }>;
}

export const Carousel = ({ items }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative h-screen bg-black overflow-hidden">
      <div className="absolute inset-0">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentIndex
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-110'
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
        ))}
      </div>

      <div className="relative z-10 h-full flex items-end pb-20 px-8 md:px-16">
        <div className="max-w-4xl">
          <div className="text-sm text-cyan-400 mb-4 font-semibold tracking-wider">
            {items[currentIndex]?.category}
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {items[currentIndex]?.title}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            {items[currentIndex]?.description}
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-4">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-12 bg-white' : 'w-6 bg-white/30'
              }`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};