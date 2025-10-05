import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;
    audio.loop = true;
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.log('Audio playback failed:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 group">
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"
        preload="auto"
      />

      <button
        onClick={togglePlay}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
        style={{
          boxShadow: '0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)',
        }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <>
            <Pause className="w-6 h-6 text-white" fill="white" />
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
          </>
        ) : (
          <Play className="w-6 h-6 text-white ml-1" fill="white" />
        )}
      </button>

      <div className="absolute bottom-full mb-3 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-black/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/30 whitespace-nowrap">
          <div className="flex items-center gap-2 text-white text-sm">
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span>{isPlaying ? 'Background Music Playing' : 'Click to Play Music'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};