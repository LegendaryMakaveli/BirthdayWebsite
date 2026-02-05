
import React from 'react';
import { motion as m } from 'framer-motion';
import type { TimeRemaining, SisterProfile } from '../types';
import { Heart } from 'lucide-react';

// Fix for framer-motion type issues in some environments where motion props are not correctly recognized
const motion = m as any;

interface CountdownProps {
  time: TimeRemaining;
  sister1: SisterProfile;
  sister2: SisterProfile;
}

const Countdown: React.FC<CountdownProps> = ({ time, sister1, sister2 }) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { staggerChildren: 0.15, duration: 0.8, ease: "easeOut" } 
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-yellow-200/20 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-[40rem] h-[40rem] bg-pink-200/20 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse delay-1000" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center glass p-10 md:p-20 rounded-[4rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] max-w-5xl w-full border border-white/60"
      >
        <motion.div variants={itemVariants} className="mb-8 flex justify-center items-center gap-4">
           <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-amber-300" />
           <motion.div
             animate={{ scale: [1, 1.2, 1] }}
             transition={{ repeat: Infinity, duration: 1.5 }}
           >
             <Heart className="text-rose-400 fill-rose-400 w-8 h-8" />
           </motion.div>
           <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-pink-300" />
        </motion.div>

        <motion.h2 
          variants={itemVariants}
          className="font-cursive text-5xl md:text-8xl text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-b from-gray-800 to-gray-400"
        >
          Counting down to
        </motion.h2>

        <motion.h1 
          variants={itemVariants}
          className="font-serif text-4xl md:text-6xl font-bold mb-16 flex items-center justify-center gap-6 flex-wrap"
        >
          <span className="text-amber-500 drop-shadow-md">{sister1.name}</span>
          <span className="text-gray-300 italic font-light">&</span>
          <span className="text-pink-500 drop-shadow-md">{sister2.name}</span>
        </motion.h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {Object.entries(time).map(([label, value]) => (
            <motion.div 
              key={label}
              variants={itemVariants}
              className="flex flex-col items-center group"
            >
              <div className="w-24 h-24 md:w-36 md:h-36 rounded-[2.5rem] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.05)] flex items-center justify-center mb-4 relative overflow-hidden transition-transform group-hover:scale-105 duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 text-4xl md:text-6xl font-bold text-gray-700 font-serif">
                  {String(value).padStart(2, '0')}
                </span>
              </div>
              <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold text-gray-400">
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={itemVariants}
          className="mt-20 flex flex-col items-center gap-4"
        >
          <p className="italic text-gray-400 font-light tracking-wide text-lg">A lifetime of love is about to begin its next chapter...</p>
          <div className="w-1 h-12 bg-gradient-to-b from-gray-200 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Countdown;
