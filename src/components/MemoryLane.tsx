
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Smile } from 'lucide-react';
import type { PhotoData } from '../types';

interface MemoryLaneProps {
    photos: PhotoData[];
}

const MemoryLane: React.FC<MemoryLaneProps> = ({ photos }) => {
    return (
        <div className="relative py-32 px-4 overflow-hidden bg-amber-50/50">
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#F59E0B 1px, transparent 1px)', backgroundSize: '30px 30px' }}
            />

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ rotate: -10, scale: 0.9 }}
                        whileInView={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: 'spring', repeat: Infinity, repeatType: 'reverse', duration: 2 }}
                        className="inline-block mb-6 bg-white p-4 rounded-full shadow-lg"
                    >
                        <Camera className="w-12 h-12 text-amber-500" />
                    </motion.div>

                    <h2 className="font-cursive text-6xl md:text-8xl text-gray-800 mb-6 transform -rotate-2">
                        Memory Lane
                    </h2>
                    <p className="font-serif italic text-xl text-gray-500">
                        The moments we can't help but laugh at...
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 auto-rows-auto">
                    {photos.map((photo, index) => {
                        const rotation = index % 2 === 0 ? 3 : -3;
                        const yOffset = index % 3 === 1 ? 40 : 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50, rotate: 0 }}
                                whileInView={{ opacity: 1, y: yOffset, rotate: rotation }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10, transition: { duration: 0.2 } }}
                                className="relative group cursor-pointer"
                            >
                                {/* Polaroid Frame */}
                                <div className="bg-white p-4 pb-16 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 transform transition-transform">
                                    <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-4 relative grayscale group-hover:grayscale-0 transition-all duration-500">
                                        <img
                                            src={photo.url}
                                            alt={photo.caption}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />

                                        {/* Tape Effect */}
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm transform -rotate-2 shadow-sm border border-white/20" />
                                    </div>

                                    <div className="absolute bottom-4 left-0 w-full text-center px-4">
                                        <h3 className="font-cursive text-3xl text-gray-800 mb-1 line-clamp-1">{photo.caption}</h3>
                                        <div className="flex items-center justify-center gap-2 text-xs font-serif text-gray-400 uppercase tracking-widest">
                                            <Smile size={12} />
                                            {photo.message}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MemoryLane;
