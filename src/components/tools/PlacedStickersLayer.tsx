import React, { useState } from 'react';
import { Trash2, RotateCw } from 'lucide-react';
import { PlacedSticker } from '../../types/planner';

interface PlacedStickersLayerProps {
  stickers: PlacedSticker[];
  onUpdateSticker: (updated: PlacedSticker) => void;
  onRemoveSticker: (id: string) => void;
}

export const PlacedStickersLayer: React.FC<PlacedStickersLayerProps> = ({
  stickers,
  onUpdateSticker,
  onRemoveSticker,
}) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, sticker: PlacedSticker) => {
    e.stopPropagation();
    setDraggingId(sticker.id);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingId) return;
    const parent = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - parent.left - dragOffset.x;
    const newY = e.clientY - parent.top - dragOffset.y;

    const target = stickers.find((s) => s.id === draggingId);
    if (target) {
      onUpdateSticker({
        ...target,
        x: Math.max(10, Math.min(parent.width - 60, newX)),
        y: Math.max(10, Math.min(parent.height - 60, newY)),
      });
    }
  };

  const handlePointerUp = () => {
    setDraggingId(null);
  };

  const handleRotate = (e: React.MouseEvent, sticker: PlacedSticker) => {
    e.stopPropagation();
    onUpdateSticker({
      ...sticker,
      rotation: (sticker.rotation + 15) % 360,
    });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
    >
      {stickers.map((sticker) => (
        <div
          key={sticker.id}
          onPointerDown={(e) => handlePointerDown(e, sticker)}
          style={{
            transform: `translate3d(${sticker.x}px, ${sticker.y}px, 0) rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
            touchAction: 'none',
          }}
          className="absolute pointer-events-auto cursor-grab active:cursor-grabbing group select-none transition-transform duration-75"
        >
          {/* Sticker Content */}
          <div className="relative p-1.5 drop-shadow-md hover:drop-shadow-xl transition flex items-center justify-center">
            {sticker.emojiOrUrl.startsWith('http') || sticker.emojiOrUrl.startsWith('data:') ? (
              <img
                src={sticker.emojiOrUrl}
                alt={sticker.title}
                className="w-16 h-16 object-contain pointer-events-none"
              />
            ) : sticker.emojiOrUrl.length > 5 ? (
              <div
                className="px-2.5 py-1 rounded text-xs font-bold shadow-xs whitespace-nowrap"
                style={{ background: '#fef08a', color: '#854d0e' }}
              >
                {sticker.emojiOrUrl}
              </div>
            ) : (
              <span className="text-4xl filter drop-shadow-xs">{sticker.emojiOrUrl}</span>
            )}

            {/* Quick Actions overlay on hover */}
            <div className="absolute -top-3 -right-3 hidden group-hover:flex items-center gap-1 bg-white/95 rounded-full shadow-lg border border-stone-200 p-0.5">
              <button
                onClick={(e) => handleRotate(e, sticker)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-600 transition"
                title="Rotate Sticker"
              >
                <RotateCw className="w-2.5 h-2.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveSticker(sticker.id);
                }}
                className="p-1 rounded-full hover:bg-red-50 text-stone-400 hover:text-red-500 transition"
                title="Delete Sticker"
              >
                <Trash2 className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
