
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthdayCakeProps {
    name: string;
    flavorColor: 'pink' | 'yellow' | 'blue';
}

const BirthdayCake: React.FC<BirthdayCakeProps> = ({ name, flavorColor }) => {
    const [candles, setCandles] = useState([true, true, true, true, true]); // 5 candles
    const [wished, setWished] = useState(false);

    const blowOutCandle = (index: number) => {
        if (!candles[index]) return;

        const newCandles = [...candles];
        newCandles[index] = false;
        setCandles(newCandles);

        // Check if all candles are out
        if (newCandles.every(c => !c)) {
            setTimeout(() => {
                setWished(true);
                triggerConfetti();
            }, 500);
        }
    };

    const triggerConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            const timeLeft = end - Date.now();
            if (timeLeft <= 0) return;

            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#FFD700', '#FF69B4', '#FFFFFF']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#FFD700', '#FF69B4', '#FFFFFF']
            });

            requestAnimationFrame(frame);
        }());
    };

    const cakeColor = flavorColor === 'pink' ? 'bg-pink-200' : flavorColor === 'yellow' ? 'bg-amber-100' : 'bg-blue-200';
    const layerColor = flavorColor === 'pink' ? 'bg-pink-300/30' : flavorColor === 'yellow' ? 'bg-amber-300/30' : 'bg-blue-300/30';
    const nameColor = flavorColor === 'pink' ? 'text-pink-500' : flavorColor === 'yellow' ? 'text-amber-500' : 'text-blue-500';

    return (
        <div className="relative flex flex-col items-center justify-center py-12">
            <AnimatePresence>
                {wished && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute -top-32 z-20 text-center w-full"
                    >
                        <h3 className={`font-cursive text-4xl md:text-5xl ${nameColor} drop-shadow-lg`}>
                            Happy Birthday {name}!
                        </h3>
                        <p className="text-gray-500 font-serif italic mt-2 text-sm">Wish Granted ✨</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative mt-20">
                {/* Cake Body */}
                <div className={`relative w-48 h-36 md:w-64 md:h-48 ${cakeColor} rounded-b-lg shadow-xl flex items-end justify-center`}>
                    {/* Icing Drips */}
                    <div className="absolute top-0 w-full h-10 md:h-12 bg-white rounded-t-lg">
                        <div className="absolute top-10 md:top-12 left-0 w-full flex">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full -mt-3 md:-mt-4" />
                            ))}
                        </div>
                    </div>

                    {/* Layer Decoration */}
                    <div className={`w-full h-10 md:h-16 ${layerColor} mb-6 md:mb-8 border-y-2 border-white/20`} />
                </div>

                {/* Plate */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-60 md:w-80 h-4 bg-gray-100 rounded-full shadow-lg" />

                {/* Candles */}
                <div className="absolute -top-10 md:-top-12 left-0 w-full flex justify-center gap-4 md:gap-6 px-4 md:px-8">
                    {candles.map((isLit, i) => (
                        <motion.div
                            key={i}
                            whileHover={isLit ? { scale: 1.1 } : {}}
                            onClick={() => blowOutCandle(i)}
                            className="relative cursor-pointer group"
                        >
                            {/* Candle Stick */}
                            <div className="w-3 h-12 md:w-4 md:h-16 bg-gradient-to-b from-yellow-100 to-yellow-200 border-2 border-white rounded-md shadow-sm" />

                            {/* Flame */}
                            <AnimatePresence>
                                {isLit ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            rotate: [-2, 2, -2],
                                            filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
                                        }}
                                        exit={{ opacity: 0, scale: 0, y: -10 }}
                                        transition={{ repeat: Infinity, duration: 0.5 }}
                                        className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 w-3 h-4 md:w-4 md:h-6 bg-orange-400 rounded-full blur-[1px] shadow-[0_0_20px_4px_rgba(255,165,0,0.6)]"
                                    >
                                        <div className="absolute top-1 left-1 w-1.5 h-2 md:w-2 md:h-4 bg-yellow-200 rounded-full opacity-80" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 0 }}
                                        animate={{ opacity: 1, y: -20, x: [0, 5, -5, 0] }}
                                        exit={{ opacity: 0 }}
                                        className="absolute -top-8 left-1/2 -translate-x-1/2"
                                    >
                                        <Sparkles className="w-4 h-4 text-gray-400 opacity-50" />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Click Hint Tooltip */}
                            {isLit && !wished && (
                                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white/80 px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                    Blow!
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {!wished && (
                <p className="mt-12 text-gray-400 text-xs font-light tracking-widest uppercase animate-pulse">
                    Click candles to make a wish for {name}
                </p>
            )}
        </div>
    );
};

export default BirthdayCake;
