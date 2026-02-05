
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Heart, Sparkles } from 'lucide-react';
import type { TimeRemaining } from './types';
import { BIRTHDAY_DATE, SISTER_ONE, SISTER_TWO, BIRTHDAY_MESSAGE, GALLERY_PHOTOS } from './constants';
import Countdown from './components/Countdown';
import Celebration from './components/Celebration';
import FloatingBackground from './components/FloatingBackground';

// Fix for framer-motion type issues in some environments where motion props are not correctly recognized
const motion = m as any;

const App: React.FC = () => {
  const [isBirthday, setIsBirthday] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [extraHearts, setExtraHearts] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const calculateTime = useCallback(() => {
    const now = new Date().getTime();
    const distance = BIRTHDAY_DATE.getTime() - now;

    if (distance <= 0) {
      setIsBirthday(true);
      return null;
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
  }, []);

  useEffect(() => {
    // Check immediately on mount
    const remaining = calculateTime();
    setTimeRemaining(remaining);

    const timer = setInterval(() => {
      const remaining = calculateTime();
      setTimeRemaining(remaining);
      if (!remaining) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTime]);

  useEffect(() => {
    if (isBirthday && hasStarted) {
      const duration = 20 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 40, spread: 360, ticks: 100, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 60 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 }, colors: ['#FFD700', '#FF69B4', '#FFFFFF'] });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 }, colors: ['#FFD700', '#FF69B4', '#FFFFFF'] });
      }, 700);

      return () => clearInterval(interval);
    }
  }, [isBirthday, hasStarted]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startCelebration = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
      setIsPlaying(true);
    }
  };

  const handleGlobalClick = (e: React.MouseEvent) => {
    const colors = ['text-pink-400', 'text-yellow-400', 'text-rose-400', 'text-amber-400'];
    const newHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setExtraHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setExtraHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1500);
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden bg-white selection:bg-pink-100"
      onClick={handleGlobalClick}
    >
      <FloatingBackground />

      {/* Interactive Sparkle Hearts */}
      <AnimatePresence>
        {extraHearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ scale: 0, opacity: 1, x: heart.x - 10, y: heart.y - 10 }}
            animate={{ scale: [0, 2.5, 0], opacity: [1, 0.8, 0], y: heart.y - 150, rotate: 20 }}
            exit={{ opacity: 0 }}
            className={`fixed pointer-events-none z-[120] ${heart.color}`}
          >
            <Heart size={24} className="fill-current" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Background audio */}
      <audio ref={audioRef} loop crossOrigin="anonymous">
        {/* Custom song takes priority. If missing, falls back to the default link. */}
        <source src="/song.mp3" type="audio/mpeg" />
        <source src="https://raw.githubusercontent.com/ayusharma/birthday/master/hbd.mp3" type="audio/mpeg" />
      </audio>

      {/* Persistent Audio Control */}
      {hasStarted && (
        <button
          onClick={(e) => { e.stopPropagation(); toggleMusic(); }}
          className="fixed top-8 right-8 z-[150] p-4 rounded-full glass hover:scale-110 active:scale-95 transition-all shadow-2xl border border-white/50"
        >
          {isPlaying ? <Volume2 className="text-pink-500 w-6 h-6" /> : <VolumeX className="text-gray-400 w-6 h-6" />}
        </button>
      )}

      <AnimatePresence mode="wait">
        {!hasStarted && isBirthday ? (
          <motion.div
            key="start-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100/90 via-white to-pink-100/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center p-12 glass rounded-[4rem] shadow-2xl max-w-lg border-2 border-white/80"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="mb-10"
              >
                <Heart className="w-24 h-24 text-pink-500 mx-auto fill-pink-500 drop-shadow-lg" />
              </motion.div>
              <h1 className="text-5xl font-serif font-bold text-gray-800 mb-6">Double Celebration</h1>
              <p className="text-xl text-gray-500 mb-10 italic">Georgina & Josephine's special day has officially arrived. Ready for the surprise?</p>
              <button
                onClick={(e) => { e.stopPropagation(); startCelebration(); }}
                className="px-12 py-5 bg-gradient-to-r from-yellow-400 to-pink-400 text-white rounded-full font-bold shadow-[0_20px_40px_rgba(255,105,180,0.3)] hover:shadow-pink-400/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto text-lg"
              >
                <Sparkles size={24} /> Step into the Magic
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full"
          >
            {!isBirthday && timeRemaining ? (
              <Countdown time={timeRemaining} sister1={SISTER_ONE} sister2={SISTER_TWO} />
            ) : (
              <Celebration
                sister1={SISTER_ONE}
                sister2={SISTER_TWO}
                message={BIRTHDAY_MESSAGE}
                photos={GALLERY_PHOTOS}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative py-24 text-center z-10 bg-white">
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8" />
        <p className="font-serif italic text-gray-400 text-lg">Created with infinite love for the twins who light up our world</p>
        <div className="flex justify-center items-center gap-4 mt-4">
          <span className="font-cursive text-4xl text-amber-400">Georgina</span>
          <Heart size={16} className="text-rose-200 fill-rose-200" />
          <span className="font-cursive text-4xl text-pink-400">Josephine</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
