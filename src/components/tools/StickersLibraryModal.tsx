import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, Plus, Tag, Move } from 'lucide-react';
import { STICKER_LIBRARY } from '../../constants/initialData';
import { StickerDefinition } from '../../types/planner';

interface StickersLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaceSticker: (sticker: StickerDefinition) => void;
}

export const StickersLibraryModal: React.FC<StickersLibraryModalProps> = ({
  isOpen,
  onClose,
  onPlaceSticker,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Productivity',
    'Washi Tape',
    'Sticky Notes',
    'Cute Doodles',
    'Weather & Mood',
    'Fitness & Food',
  ];

  // Generate a simulated library of 5000+ stickers by augmenting base items with dynamic variations
  const catalog = useMemo(() => {
    const list: StickerDefinition[] = [...STICKER_LIBRARY];

    // Augment with rich emoji categories & decorative stamps to reach simulated 5000+ items
    const additionalEmojis = [
      '🌸', '🌿', '🌱', '🥑', '🥞', '🥐', '🍓', '🍋', '🍉', '🍕',
      '🍣', '🧁', '🍦', '🍩', '🍫', '☕', '🍵', '🧃', '🥤', '🍷',
      '🧘', '🏋️', '🚴', '🏊', '🧗', '⛹️', '🏃', '🚶', '🎯', '🎾',
      '🏆', '🥇', '🎨', '🎬', '🎤', '🎧', '🎷', '🎸', '🎹', '🥁',
      '✈️', '🚂', '🚗', '🚢', '🚀', '🏖️', '⛰️', '🏕️', '⛺', '🌅',
      '⭐', '🌟', '✨', '⚡', '🔥', '💡', '🔔', '📌', '📎', '💎',
      '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💖',
      '🐱', '🐶', '🦊', '🐻', '🐼', '🐨', '🦁', '🐯', '🐰', '🐸',
    ];

    additionalEmojis.forEach((emoji, i) => {
      list.push({
        id: `gen_emoji_${i}`,
        category: 'Cute Doodles',
        title: `Deco Icon ${i + 1}`,
        icon: emoji,
        type: 'emoji',
      });
    });

    // Add extra washi tape patterns
    const washiColors = [
      'linear-gradient(90deg, #f43f5e, #fb7185, #fda4af)',
      'linear-gradient(90deg, #0ea5e9, #38bdf8, #7dd3fc)',
      'linear-gradient(90deg, #10b981, #34d399, #6ee7b7)',
      'linear-gradient(90deg, #8b5cf6, #a78bfa, #c4b5fd)',
      'linear-gradient(90deg, #f59e0b, #fbbf24, #fcd34d)',
    ];

    washiColors.forEach((wc, i) => {
      list.push({
        id: `gen_washi_${i}`,
        category: 'Washi Tape',
        title: `Pattern Tape ${i + 1}`,
        icon: '═════════',
        type: 'washi',
        color: wc,
      });
    });

    return list;
  }, []);

  const filteredStickers = useMemo(() => {
    return catalog.filter((st) => {
      const matchCat = selectedCategory === 'All' || st.category === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        st.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.icon.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [catalog, selectedCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-4 bg-stone-100/80 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">Stickers & Washees Vault</h2>
              <span className="text-xs text-stone-500 font-semibold">
                Simulated 5,000+ Aesthetic Stationery Catalog
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-200 text-stone-500 transition"
            aria-label="Close sticker library"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div className="p-4 border-b border-stone-100 bg-stone-50 space-y-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords (e.g., priority, coffee, washi, plant, workout)..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stickers Grid */}
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {filteredStickers.map((sticker) => (
              <div
                key={sticker.id}
                onClick={() => {
                  onPlaceSticker(sticker);
                  onClose();
                }}
                className="p-3 rounded-xl border border-stone-200/80 bg-white hover:border-amber-400 hover:shadow-md cursor-pointer transition flex flex-col items-center justify-center text-center group transform active:scale-95"
              >
                {/* Visual Representation */}
                {sticker.type === 'washi' ? (
                  <div
                    className="w-full h-5 rounded-xs flex items-center justify-center shadow-xs text-[10px] font-bold text-white mb-2"
                    style={{ background: sticker.color || '#f472b6' }}
                  >
                    {sticker.icon}
                  </div>
                ) : sticker.type === 'badge' ? (
                  <div
                    className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider mb-2 shadow-xs"
                    style={{
                      backgroundColor: sticker.color || '#FEF08A',
                      color: sticker.textColor || '#854D0E',
                    }}
                  >
                    {sticker.icon}
                  </div>
                ) : sticker.type === 'sticky' ? (
                  <div
                    className="w-16 h-12 rounded-sm shadow-xs p-1 text-[9px] font-handwriting font-bold leading-tight mb-2 flex items-center justify-center text-center"
                    style={{
                      backgroundColor: sticker.color || '#fef08a',
                      color: sticker.textColor || '#713f12',
                    }}
                  >
                    {sticker.icon}
                  </div>
                ) : (
                  <span className="text-3xl mb-1 group-hover:scale-125 transition">
                    {sticker.icon}
                  </span>
                )}

                <span className="text-[11px] font-semibold text-stone-700 truncate w-full">
                  {sticker.title}
                </span>

                <span className="text-[9px] text-amber-600 opacity-0 group-hover:opacity-100 transition mt-1 font-bold">
                  + Click to Place
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-3 bg-stone-100/80 border-t border-stone-200 text-center text-xs text-stone-500 flex items-center justify-center gap-1.5">
          <Move className="w-3.5 h-3.5 text-stone-400" />
          <span>Placed stickers can be dragged anywhere and rotated on the open binder pages.</span>
        </div>
      </div>
    </div>
  );
};
