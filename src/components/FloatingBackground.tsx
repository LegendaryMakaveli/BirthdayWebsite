
import React, { useMemo } from 'react';
import { Heart } from 'lucide-react';

const FloatingBackground: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 20 + 10,
      left: Math.random() * 100 + '%',
      duration: Math.random() * 10 + 15 + 's',
      delay: Math.random() * 10 + 's',
      type: Math.random() > 0.5 ? 'heart' : 'circle',
      color: Math.random() > 0.5 ? 'text-pink-300' : 'text-yellow-300'
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            '--duration': p.duration,
            animationDelay: p.delay,
          } as React.CSSProperties}
        >
          {p.type === 'heart' ? (
            <Heart size={p.size} className={`${p.color} fill-current opacity-30`} />
          ) : (
            <div 
              style={{ width: p.size, height: p.size }} 
              className={`rounded-full ${p.color.replace('text', 'bg')} opacity-20`} 
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingBackground;
