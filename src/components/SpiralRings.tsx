import React from 'react';
import { ThemeConfig } from '../styles/themes';

interface SpiralRingsProps {
  theme: ThemeConfig;
  count?: number;
}

export const SpiralRings: React.FC<SpiralRingsProps> = ({ theme, count = 20 }) => {
  return (
    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 z-20 pointer-events-none flex flex-col justify-around py-4">
      {/* Center spine gutter depth line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1.5 bg-black/15 shadow-inner" />

      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative w-full h-4 flex items-center justify-between px-0.5 my-auto">
          {/* Left punch hole */}
          <div className="w-2.5 h-3.5 rounded-full bg-neutral-900/40 shadow-inner border border-black/30 transform -translate-x-0.5" />

          {/* 3D Curved Spiral Metal Wire */}
          <div
            className="absolute left-1 right-1 h-3 rounded-full transform -rotate-3 transition-all"
            style={{
              background: theme.rings.gradient,
              boxShadow: `0 4px 6px ${theme.rings.shadow}, inset 0 1px 2px rgba(255,255,255,0.7), inset 0 -1px 2px rgba(0,0,0,0.5)`,
              filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))',
            }}
          >
            {/* Glossy top metallic sheen streak */}
            <div className="absolute top-0.5 left-2 right-2 h-0.5 bg-white/70 rounded-full blur-[0.3px]" />
          </div>

          {/* Right punch hole */}
          <div className="w-2.5 h-3.5 rounded-full bg-neutral-900/40 shadow-inner border border-black/30 transform translate-x-0.5" />
        </div>
      ))}
    </div>
  );
};
