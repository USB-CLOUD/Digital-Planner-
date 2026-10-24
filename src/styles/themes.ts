import { ThemeMode } from '../types/planner';

export interface ThemeConfig {
  name: string;
  coverBg: string; // Outer leather / binder binder cover
  coverBorder: string;
  coverStitch: string;
  paperBg: string; // Inner page paper background
  paperTextColor: string;
  paperSubText: string;
  paperBorder: string;
  gutterLine: string;
  rings: {
    gradient: string;
    shadow: string;
    holeBg: string;
  };
  tabStyles: {
    top: { bg: string; text: string; activeBg: string; activeText: string }[];
    right: { bg: string; text: string; activeBg: string; activeText: string }[];
    bottom: { bg: string; text: string; activeBg: string; activeText: string }[];
    left: { bg: string; text: string; activeBg: string; activeText: string }[];
  };
}

export const THEMES: Record<ThemeMode, ThemeConfig> = {
  rainbow: {
    name: 'Rainbow',
    coverBg: 'bg-gradient-to-br from-rose-100 via-purple-100 to-sky-100',
    coverBorder: 'border-rose-200/80',
    coverStitch: 'border-dashed border-rose-300/60',
    paperBg: 'bg-[#FCFAF7]',
    paperTextColor: 'text-slate-800',
    paperSubText: 'text-slate-500',
    paperBorder: 'border-amber-100/80',
    gutterLine: 'bg-amber-200/40',
    rings: {
      gradient: 'linear-gradient(135deg, #fbcfe8 0%, #f472b6 40%, #e879f9 60%, #cbd5e1 100%)',
      shadow: 'rgba(219, 39, 119, 0.35)',
      holeBg: 'bg-stone-300',
    },
    tabStyles: {
      top: [
        { bg: 'bg-pink-100 hover:bg-pink-200', text: 'text-pink-800', activeBg: 'bg-[#FCFAF7] border-t-2 border-pink-400', activeText: 'text-pink-900 font-bold' },
        { bg: 'bg-purple-100 hover:bg-purple-200', text: 'text-purple-800', activeBg: 'bg-[#FCFAF7] border-t-2 border-purple-400', activeText: 'text-purple-900 font-bold' },
        { bg: 'bg-indigo-100 hover:bg-indigo-200', text: 'text-indigo-800', activeBg: 'bg-[#FCFAF7] border-t-2 border-indigo-400', activeText: 'text-indigo-900 font-bold' },
        { bg: 'bg-sky-100 hover:bg-sky-200', text: 'text-sky-800', activeBg: 'bg-[#FCFAF7] border-t-2 border-sky-400', activeText: 'text-sky-900 font-bold' },
        { bg: 'bg-teal-100 hover:bg-teal-200', text: 'text-teal-800', activeBg: 'bg-[#FCFAF7] border-t-2 border-teal-400', activeText: 'text-teal-900 font-bold' },
        { bg: 'bg-amber-100 hover:bg-amber-200', text: 'text-amber-800', activeBg: 'bg-[#FCFAF7] border-t-2 border-amber-400', activeText: 'text-amber-900 font-bold' },
        { bg: 'bg-emerald-100 hover:bg-emerald-200', text: 'text-emerald-800', activeBg: 'bg-[#FCFAF7] border-t-2 border-emerald-400', activeText: 'text-emerald-900 font-bold' },
        { bg: 'bg-rose-100 hover:bg-rose-200', text: 'text-rose-800', activeBg: 'bg-[#FCFAF7] border-t-2 border-rose-400', activeText: 'text-rose-900 font-bold' },
      ],
      right: Array(12).fill(null).map((_, i) => {
        const colors = [
          'bg-rose-200 text-rose-900 border-r-2 border-rose-400',
          'bg-orange-200 text-orange-900 border-r-2 border-orange-400',
          'bg-amber-200 text-amber-900 border-r-2 border-amber-400',
          'bg-yellow-200 text-yellow-900 border-r-2 border-yellow-400',
          'bg-lime-200 text-lime-900 border-r-2 border-lime-400',
          'bg-emerald-200 text-emerald-900 border-r-2 border-emerald-400',
          'bg-teal-200 text-teal-900 border-r-2 border-teal-400',
          'bg-cyan-200 text-cyan-900 border-r-2 border-cyan-400',
          'bg-sky-200 text-sky-900 border-r-2 border-sky-400',
          'bg-blue-200 text-blue-900 border-r-2 border-blue-400',
          'bg-indigo-200 text-indigo-900 border-r-2 border-indigo-400',
          'bg-violet-200 text-violet-900 border-r-2 border-violet-400',
        ];
        return {
          bg: colors[i % colors.length].split(' ')[0],
          text: colors[i % colors.length].split(' ')[1],
          activeBg: 'bg-[#FCFAF7] border-r-4 border-pink-400',
          activeText: 'text-pink-900 font-bold',
        };
      }),
      bottom: Array(10).fill(null).map((_, i) => {
        const bColors = ['bg-fuchsia-100', 'bg-pink-100', 'bg-rose-100', 'bg-orange-100', 'bg-amber-100', 'bg-lime-100', 'bg-emerald-100', 'bg-teal-100', 'bg-cyan-100', 'bg-purple-100'];
        return {
          bg: bColors[i % bColors.length],
          text: 'text-slate-800',
          activeBg: 'bg-[#FCFAF7] border-b-2 border-pink-400',
          activeText: 'text-pink-900 font-bold',
        };
      }),
      left: Array(10).fill(null).map((_, i) => ({
        bg: 'bg-rose-50 hover:bg-rose-100',
        text: 'text-rose-900',
        activeBg: 'bg-[#FCFAF7] border-l-4 border-rose-400',
        activeText: 'text-rose-950 font-bold',
      })),
    },
  },

  boho: {
    name: 'Boho',
    coverBg: 'bg-[#785942] shadow-2xl',
    coverBorder: 'border-[#5C4331]',
    coverStitch: 'border-dashed border-[#A88B74]/50',
    paperBg: 'bg-[#F9F5EB]',
    paperTextColor: 'text-[#4A3B32]',
    paperSubText: 'text-[#8C7A6B]',
    paperBorder: 'border-[#E6DCC8]',
    gutterLine: 'bg-[#D9CEB6]/60',
    rings: {
      gradient: 'linear-gradient(135deg, #d97706 0%, #b45309 30%, #78350f 70%, #451a03 100%)',
      shadow: 'rgba(120, 53, 15, 0.4)',
      holeBg: 'bg-[#3b2d24]',
    },
    tabStyles: {
      top: [
        { bg: 'bg-[#EBD9CC]', text: 'text-[#5C3D28]', activeBg: 'bg-[#F9F5EB] border-t-2 border-[#A85B32]', activeText: 'text-[#4A2814] font-bold' },
        { bg: 'bg-[#D6C5B3]', text: 'text-[#4E3E30]', activeBg: 'bg-[#F9F5EB] border-t-2 border-[#8A5B3D]', activeText: 'text-[#3E2D20] font-bold' },
        { bg: 'bg-[#D8D2C2]', text: 'text-[#4A4737]', activeBg: 'bg-[#F9F5EB] border-t-2 border-[#73705C]', activeText: 'text-[#3B3828] font-bold' },
        { bg: 'bg-[#C7D0C0]', text: 'text-[#3B4734]', activeBg: 'bg-[#F9F5EB] border-t-2 border-[#607357]', activeText: 'text-[#2D3827] font-bold' },
        { bg: 'bg-[#DFCDB4]', text: 'text-[#54432C]', activeBg: 'bg-[#F9F5EB] border-t-2 border-[#8C6D45]', activeText: 'text-[#433522] font-bold' },
        { bg: 'bg-[#E3CBB8]', text: 'text-[#5A3F2A]', activeBg: 'bg-[#F9F5EB] border-t-2 border-[#94623E]', activeText: 'text-[#47301E] font-bold' },
        { bg: 'bg-[#CFBEAC]', text: 'text-[#4B3C2D]', activeBg: 'bg-[#F9F5EB] border-t-2 border-[#7E6147]', activeText: 'text-[#3B2E21] font-bold' },
        { bg: 'bg-[#EADBC8]', text: 'text-[#544431]', activeBg: 'bg-[#F9F5EB] border-t-2 border-[#9C7A53]', activeText: 'text-[#433525] font-bold' },
      ],
      right: Array(12).fill(null).map((_, i) => {
        const bohoTones = ['bg-[#C89B7B]', 'bg-[#B08968]', 'bg-[#9C6644]', 'bg-[#7F5539]', 'bg-[#8F7D6B]', 'bg-[#9AA087]', 'bg-[#B4846C]', 'bg-[#A98467]', 'bg-[#C5A880]', 'bg-[#B07D62]', 'bg-[#7D6B58]', 'bg-[#6B4F3B]'];
        return {
          bg: bohoTones[i % bohoTones.length],
          text: 'text-[#F9F5EB]',
          activeBg: 'bg-[#F9F5EB] border-r-4 border-[#7F5539]',
          activeText: 'text-[#4A3B32] font-bold',
        };
      }),
      bottom: Array(10).fill(null).map((_, i) => ({
        bg: 'bg-[#E6D5C3]',
        text: 'text-[#5C4331]',
        activeBg: 'bg-[#F9F5EB] border-b-2 border-[#8A5B3D]',
        activeText: 'text-[#4A2814] font-bold',
      })),
      left: Array(10).fill(null).map((_, i) => ({
        bg: 'bg-[#DEC7B2]',
        text: 'text-[#543E2E]',
        activeBg: 'bg-[#F9F5EB] border-l-4 border-[#8A5B3D]',
        activeText: 'text-[#433022] font-bold',
      })),
    },
  },

  white: {
    name: 'White',
    coverBg: 'bg-stone-200 shadow-2xl',
    coverBorder: 'border-stone-300',
    coverStitch: 'border-dashed border-stone-300',
    paperBg: 'bg-white',
    paperTextColor: 'text-stone-900',
    paperSubText: 'text-stone-500',
    paperBorder: 'border-stone-200',
    gutterLine: 'bg-stone-100',
    rings: {
      gradient: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 35%, #94a3b8 70%, #64748b 100%)',
      shadow: 'rgba(100, 116, 139, 0.35)',
      holeBg: 'bg-stone-300',
    },
    tabStyles: {
      top: Array(8).fill(null).map(() => ({
        bg: 'bg-stone-100 hover:bg-stone-200',
        text: 'text-stone-700',
        activeBg: 'bg-white border-t-2 border-stone-800',
        activeText: 'text-stone-950 font-bold',
      })),
      right: Array(12).fill(null).map(() => ({
        bg: 'bg-stone-200 hover:bg-stone-300',
        text: 'text-stone-800',
        activeBg: 'bg-white border-r-4 border-stone-800',
        activeText: 'text-stone-950 font-bold',
      })),
      bottom: Array(10).fill(null).map(() => ({
        bg: 'bg-stone-100 hover:bg-stone-200',
        text: 'text-stone-700',
        activeBg: 'bg-white border-b-2 border-stone-800',
        activeText: 'text-stone-950 font-bold',
      })),
      left: Array(10).fill(null).map(() => ({
        bg: 'bg-stone-100 hover:bg-stone-200',
        text: 'text-stone-700',
        activeBg: 'bg-white border-l-4 border-stone-800',
        activeText: 'text-stone-950 font-bold',
      })),
    },
  },

  dark: {
    name: 'Dark Mode',
    coverBg: 'bg-[#18181B] shadow-2xl',
    coverBorder: 'border-zinc-800',
    coverStitch: 'border-dashed border-amber-600/30',
    paperBg: 'bg-[#27272A]',
    paperTextColor: 'text-zinc-100',
    paperSubText: 'text-zinc-400',
    paperBorder: 'border-zinc-700/80',
    gutterLine: 'bg-zinc-800',
    rings: {
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #b45309 40%, #78350f 70%, #1c1917 100%)',
      shadow: 'rgba(0, 0, 0, 0.7)',
      holeBg: 'bg-[#09090b]',
    },
    tabStyles: {
      top: Array(8).fill(null).map(() => ({
        bg: 'bg-zinc-800 hover:bg-zinc-700',
        text: 'text-zinc-300',
        activeBg: 'bg-[#27272A] border-t-2 border-amber-500',
        activeText: 'text-amber-400 font-bold',
      })),
      right: Array(12).fill(null).map(() => ({
        bg: 'bg-zinc-800 hover:bg-zinc-700',
        text: 'text-zinc-300',
        activeBg: 'bg-[#27272A] border-r-4 border-amber-500',
        activeText: 'text-amber-400 font-bold',
      })),
      bottom: Array(10).fill(null).map(() => ({
        bg: 'bg-zinc-800 hover:bg-zinc-700',
        text: 'text-zinc-300',
        activeBg: 'bg-[#27272A] border-b-2 border-amber-500',
        activeText: 'text-amber-400 font-bold',
      })),
      left: Array(10).fill(null).map(() => ({
        bg: 'bg-zinc-800 hover:bg-zinc-700',
        text: 'text-zinc-300',
        activeBg: 'bg-[#27272A] border-l-4 border-amber-500',
        activeText: 'text-amber-400 font-bold',
      })),
    },
  },
};
