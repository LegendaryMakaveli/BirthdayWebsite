
import React from 'react';
import { motion as m, useScroll, useTransform } from 'framer-motion';
import type { SisterProfile, PhotoData } from '../types';
import Gallery from "../components/Gallery";
import { Heart, Stars, Sparkles as SparklesIcon, Quote, Cloud } from 'lucide-react';
import { PRAYER_MESSAGE, MEMORY_LANE_PHOTOS } from "../constants";
import BirthdayCake from './BirthdayCake';
import MemoryLane from './MemoryLane';
import TwinTrivia from './TwinTrivia';

// Fix for framer-motion type issues
const motion = m as any;

interface CelebrationProps {
  sister1: SisterProfile;
  sister2: SisterProfile;
  message: string;
  photos: PhotoData[];
}

const Celebration: React.FC<CelebrationProps> = ({ sister1, sister2, message, photos }) => {
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Split message into paragraphs for staggered animation
  const paragraphs = message.split('\n\n').filter(p => p.trim() !== '');
  const prayerLines = PRAYER_MESSAGE.split('.').filter(line => line.trim() !== '');

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ y: yRange }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200/30 via-white to-pink-200/30" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-300/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-300/10 rounded-full blur-[100px]" />
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="mb-10 inline-block"
          >
            <div className="flex items-center justify-center gap-8">
              <SparklesIcon className="text-yellow-400 w-10 h-10 animate-spin-slow" />
              <div className="relative">
                <Heart className="text-pink-500 w-20 h-20 fill-pink-500 shadow-xl" />
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-pink-400 rounded-full blur-2xl"
                />
              </div>
              <SparklesIcon className="text-yellow-400 w-10 h-10 animate-spin-slow" />
            </div>
          </motion.div>

          <h1 className="font-cursive text-8xl md:text-[12rem] mb-6 leading-none tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-rose-500 to-pink-500">
              Happy Birthday!
            </span>
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 text-4xl md:text-7xl font-serif mt-4">
            <motion.span
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: 'spring', damping: 15 }}
              className="text-amber-500 drop-shadow-2xl font-bold"
            >
              {sister1.name}
            </motion.span>
            <span className="text-gray-300 font-light italic">&</span>
            <motion.span
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, type: 'spring', damping: 15 }}
              className="text-pink-500 drop-shadow-2xl font-bold"
            >
              {sister2.name}
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-16 text-gray-400 font-light tracking-[0.5em] uppercase text-xs md:text-sm"
          >
            The world celebrates a double dose of magic today
          </motion.p>
        </motion.div>

        <motion.div
          animate={{ opacity: [0.2, 0.8, 0.2], y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-12"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-gray-300 to-transparent" />
        </motion.div>
      </section>

      {/* Message Section */}
      <section className="relative py-40 px-6 overflow-hidden bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative glass p-16 md:p-32 rounded-[6rem] border border-white/80 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)]"
          >
            <Quote className="absolute top-12 left-12 text-pink-100 w-24 h-24 -z-10" />

            <h2 className="font-serif text-5xl md:text-6xl mb-12 italic text-gray-800 text-center">
              Our Deepest Affection
            </h2>

            <div className="space-y-12">
              {(() => {
                let accumulatedDelay = 0;
                return paragraphs.map((paragraph, i) => {
                  const words = paragraph.trim().split(" ");
                  const wordsPerSecond = 4.5; // Reading speed
                  const wordDuration = 2 / wordsPerSecond;
                  const startDelay = accumulatedDelay;

                  // Update accumulated delay: duration of this paragraph + 1.5s pause
                  accumulatedDelay += (words.length * wordDuration) + 1.5;

                  return (
                    <motion.p
                      key={i}
                      className="text-xl md:text-3xl text-gray-600 leading-relaxed font-light text-center font-serif flex flex-wrap justify-center gap-x-2"
                    >
                      {words.map((word, wordIndex) => (
                        <motion.span
                          key={wordIndex}
                          initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          viewport={{ once: true, margin: "-10%" }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: startDelay + (wordIndex * wordDuration)
                          }}
                          className="inline-block"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.p>
                  );
                });
              })()}
            </div>

            <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-12 border-t border-gray-100 pt-12">
              <div className="text-amber-500 font-cursive text-4xl">Taiwo the Sun</div>
              <div className="text-pink-500 font-cursive text-4xl">Kehinde the Moon</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEW & IMPROVED Ethereal Prayer Section */}
      <section className="relative py-60 px-6 overflow-hidden bg-[#FAFAFA]">
        {/* Heavenly Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-yellow-100/40 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-100/40 rounded-full blur-[120px]"
          />
          {/* Subtle light rays or particles for this section only */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full blur-sm"
              style={{
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
              }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -100],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-12"
            >
              <Stars className="text-yellow-400 w-16 h-16 opacity-60" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.1em" }}
              transition={{ duration: 2 }}
              className="font-serif text-5xl md:text-7xl mb-16 text-gray-800 tracking-wider"
            >
              Divine Blessing
            </motion.h2>

            <div className="glass-ethereal relative p-12 md:p-24 rounded-[5rem] border border-white/60 bg-white/30 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)]">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border border-yellow-50">
                <Cloud className="text-amber-200 fill-amber-50 w-10 h-10" />
              </div>

              <div className="space-y-10">
                {prayerLines.map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: idx * 0.4 }}
                    className="text-2xl md:text-4xl text-gray-700 leading-snug italic font-serif"
                    style={{ textShadow: "0 0 20px rgba(255,255,255,1)" }}
                  >
                    {line.trim()}.
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 2 }}
                className="mt-16 pt-8 border-t border-white/40"
              >
                <p className="text-pink-400 font-cursive text-5xl">Amen</p>
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mt-4"
                >
                  <Heart className="w-8 h-8 text-pink-300 mx-auto fill-pink-300" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Memory Lane Section */}
      <MemoryLane photos={MEMORY_LANE_PHOTOS} />

      {/* Trivia Game Section */}
      <TwinTrivia />

      {/* Birthday Cake Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-5xl text-gray-800 mb-4">Make a Wish</h2>
            <p className="text-gray-400 uppercase tracking-widest text-sm">Blow out the candles for double the blessings</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            <BirthdayCake name={sister1.name} flavorColor={sister1.theme as any} />
            <BirthdayCake name={sister2.name} flavorColor={sister2.theme as any} />
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-40 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-serif text-6xl md:text-7xl mb-6 text-gray-800 tracking-tight">A Lifetime of Togetherness</h2>
            <p className="text-gray-400 uppercase tracking-[0.4em] text-xs mb-8">Every picture tells a story of two</p>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-300 to-pink-300 mx-auto rounded-full" />
          </div>
          <Gallery photos={photos} />
        </div>
      </section>

      <style>{`
        .glass-ethereal {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
        }
      `}</style>
    </div>
  );
};

export default Celebration;
