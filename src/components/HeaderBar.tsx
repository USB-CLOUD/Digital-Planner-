import React from 'react';
import {
  BookOpen,
  Palette,
  Sticker,
  PenTool,
  Calendar,
  Grid,
  Sparkles,
  Maximize2,
} from 'lucide-react';
import { ThemeMode, ActivePageType } from '../types/planner';
import { UtilityShortcutsMenu } from './tools/UtilityShortcutsMenu';

interface HeaderBarProps {
  currentTheme: ThemeMode;
  onChangeTheme: (theme: ThemeMode) => void;
  activePage: ActivePageType;
  onNavigate: (page: ActivePageType) => void;
  onOpenStickers: () => void;
  isDrawingMode: boolean;
  onToggleDrawingMode: () => void;
  onOpenUtilities: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentTheme,
  onChangeTheme,
  activePage,
  onNavigate,
  onOpenStickers,
  isDrawingMode,
  onToggleDrawingMode,
  onOpenUtilities,
}) => {
  return (
    <header className="w-full bg-neutral-900/90 text-white border-b border-neutral-800/80 backdrop-blur-md px-4 py-2.5 flex items-center justify-between gap-4 z-30 select-none">
      {/* Zone 1: Brand Wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate('index')}
          className="flex items-center gap-2 group text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-white block">
              Digital Planner
            </span>
            <span className="text-[10px] text-amber-400 font-semibold block leading-none">
              Two-Page Open Binder
            </span>
          </div>
        </button>

        {/* Quick View Switches */}
        <div className="hidden md:flex items-center bg-neutral-800 rounded-lg p-0.5 border border-neutral-700/60 ml-3">
          <button
            onClick={() => onNavigate('index')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
              activePage === 'index' ? 'bg-amber-500 text-neutral-900 shadow-xs' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Index
          </button>
          <button
            onClick={() => onNavigate('daily')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
              activePage === 'daily' ? 'bg-amber-500 text-neutral-900 shadow-xs' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => onNavigate('weekly')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
              activePage === 'weekly' ? 'bg-amber-500 text-neutral-900 shadow-xs' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => onNavigate('monthly')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
              activePage === 'monthly' ? 'bg-amber-500 text-neutral-900 shadow-xs' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Zone 2: Theme Selector */}
      <div className="flex items-center gap-1 bg-neutral-800/90 rounded-lg p-1 border border-neutral-700">
        <Palette className="w-3.5 h-3.5 text-neutral-400 ml-1 mr-1 hidden sm:inline" />
        {[
          { id: 'rainbow', label: 'Rainbow', dot: 'bg-pink-400' },
          { id: 'boho', label: 'Boho', dot: 'bg-[#B08968]' },
          { id: 'white', label: 'White', dot: 'bg-white' },
          { id: 'dark', label: 'Dark', dot: 'bg-zinc-900' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => onChangeTheme(t.id as ThemeMode)}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
              currentTheme === t.id
                ? 'bg-neutral-700 text-white shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${t.dot} border border-black/20`} />
            <span className="capitalize">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Zone 3: Interactive Tool Actions */}
      <div className="flex items-center gap-2">
        {/* Stylus Canvas Toggle */}
        <button
          onClick={onToggleDrawingMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-xs ${
            isDrawingMode
              ? 'bg-amber-500 text-neutral-900'
              : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
          }`}
          title="Stylus Drawing Tool"
        >
          <PenTool className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isDrawingMode ? 'Drawing On' : 'Draw'}</span>
        </button>

        {/* Stickers Library Modal Toggle */}
        <button
          onClick={onOpenStickers}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition text-xs font-semibold shadow-xs"
          title="Stickers & Washi Tape"
        >
          <Sticker className="w-3.5 h-3.5 text-pink-400" />
          <span className="hidden sm:inline">Stickers</span>
        </button>

        {/* Utility Shortcuts Menu */}
        <button
          onClick={onOpenUtilities}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition text-xs font-semibold shadow-md active:scale-95"
          title="Quick Access Utilities"
        >
          <span className="text-amber-400">⚡</span>
          <span>Utilities</span>
        </button>
      </div>
    </header>
  );
};
