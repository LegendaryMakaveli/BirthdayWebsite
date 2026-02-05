
import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import type { PhotoData } from '../types';

// Fix for framer-motion type issues in some environments where motion props are not correctly recognized
const motion = m as any;

interface GalleryProps {
  photos: PhotoData[];
}

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
      {photos.map((photo, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="group flex flex-col items-center cursor-pointer"
        >
          {/* Image Container */}
          <div className="relative w-full h-[400px] rounded-[2rem] overflow-hidden shadow-2xl mb-6">
            {/* Decorative Frame */}
            <div className={`absolute inset-0 z-30 border-[10px] border-white/30 pointer-events-none rounded-[2rem] transition-colors duration-500 ${hoveredIndex === index ? (index % 2 === 0 ? 'border-amber-200/40' : 'border-pink-200/40') : ''}`} />
            
            {/* Image itself */}
            <img 
              src={photo.url} 
              alt={photo.caption} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            />
            
            {/* Overlay for personal message tooltip */}
            <AnimatePresence>
              {hoveredIndex === index && photo.message && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-40 flex items-center justify-center p-6 bg-black/30 backdrop-blur-[2px]"
                >
                  <div className="glass p-6 rounded-2xl text-center shadow-2xl border border-white/50 max-w-[80%]">
                    <p className="text-sm font-serif italic text-gray-800 leading-relaxed">
                      "{photo.message}"
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Subtle Ambient Tint */}
            <div className={`absolute inset-0 ${index % 2 === 0 ? 'bg-amber-100/5' : 'bg-pink-100/5'} pointer-events-none`} />
          </div>

          {/* Artistic Caption Block Below Image */}
          <motion.div 
            className="text-center w-full px-2"
            animate={{ 
              y: hoveredIndex === index ? -5 : 0,
              scale: hoveredIndex === index ? 1.05 : 1
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className={`font-cursive text-4xl mb-3 transition-colors duration-300 ${index % 2 === 0 ? 'text-amber-500 group-hover:text-amber-600' : 'text-pink-500 group-hover:text-pink-600'}`}>
              {photo.caption}
            </h3>
            
            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-2 opacity-60">
              <div className={`h-[1px] w-8 bg-gradient-to-r from-transparent to-${index % 2 === 0 ? 'amber-300' : 'pink-300'}`} />
              <div className={`w-1.5 h-1.5 rounded-full ${index % 2 === 0 ? 'bg-amber-300' : 'pink-300'}`} />
              <div className={`h-[1px] w-8 bg-gradient-to-l from-transparent to-${index % 2 === 0 ? 'amber-300' : 'pink-300'}`} />
            </div>
            
            <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold group-hover:text-gray-500 transition-colors">
              Special Moment
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default Gallery;
