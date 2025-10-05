import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A'
      );
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <>
      <div
        className="fixed w-3 h-3 rounded-full pointer-events-none z-[9999] transition-transform duration-100"
        style={{
          left: ${position.x}px,
          top: ${position.y}px,
          transform: translate(-50%, -50%) scale(${isPointer ? 1.5 : 1}),
          background: 'radial-gradient(circle, #06b6d4, #3b82f6)',
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(59, 130, 246, 0.5)',
        }}
      />
      <div
        className="fixed w-8 h-8 border-2 rounded-full pointer-events-none z-[9999] transition-all duration-200"
        style={{
          left: ${position.x}px,
          top: ${position.y}px,
          transform: translate(-50%, -50%) scale(${isPointer ? 1.5 : 1}),
          borderColor: '#06b6d4',
          boxShadow: '0 0 15px rgba(6, 182, 212, 0.5)',
        }}
      />
    </>
  );
};