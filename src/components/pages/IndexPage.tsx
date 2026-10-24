import React from 'react';
import {
  Calendar,
  CalendarDays,
  CheckSquare,
  Sparkles,
  Utensils,
  DollarSign,
  Compass,
  FileText,
  Target,
  Heart,
  Briefcase,
  Plane,
  Home,
  BookOpen,
  ArrowRight,
  Clock,
  ListTodo,
} from 'lucide-react';
import { ActivePageType, CategoryType, CustomSection, Habit, ToDoItem } from '../../types/planner';
import { ThemeConfig } from '../../styles/themes';

interface IndexPageProps {
  onNavigate: (page: ActivePageType, subId?: any) => void;
  onSelectCategory: (category: CategoryType) => void;
  onSelectCustomSection: (sectionId: number) => void;
  theme: ThemeConfig;
  habits: Habit[];
  todos: ToDoItem[];
  customSections: CustomSection[];
  todayFocus: string;
}

export const IndexPage: React.FC<IndexPageProps> = ({
  onNavigate,
  onSelectCategory,
  onSelectCustomSection,
  theme,
  habits,
  todos,
  customSections,
  todayFocus,
}) => {
  const pendingTodos = todos.filter(t => !t.completed).length;
  const completedHabitsToday = habits.filter(h => h.days[0]).length;

  return (
    <div className="w-full h-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-stone-200/60 text-stone-800">
      {/* Left Page: Core Planners & Overview */}
      <div className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto">
        {/* Header Title */}
        <div className="border-b border-stone-200/80 pb-4 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-stone-500">Master Index</p>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-sans">
                Digital Life Binder
              </h1>
            </div>
            <span className="font-handwriting text-2xl text-amber-700 font-bold px-3 py-1 bg-amber-50 rounded-lg border border-amber-200/60 shadow-xs">
              2026 Edition
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Centralized hub connecting all daily, weekly, monthly, and personal tracking workspaces.
          </p>
        </div>

        {/* Daily Focus Callout */}
        <div className="mb-6 p-3.5 bg-amber-500/10 rounded-xl border border-amber-500/20 shadow-xs">
          <div className="flex items-center gap-2 mb-1 text-amber-800 font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Today's Guiding Focus</span>
          </div>
          <p className="font-handwriting text-xl text-stone-800 font-bold pl-1">
            "{todayFocus || 'Bring mindful clarity and deep focus to all creative endeavors.'}"
          </p>
        </div>

        {/* Quick KPI stats strip */}
        <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
          <div className="p-2.5 bg-stone-100/70 rounded-lg border border-stone-200/70">
            <span className="text-[10px] text-stone-500 font-semibold block uppercase">Habits Today</span>
            <span className="text-lg font-bold font-tabular text-emerald-700">
              {completedHabitsToday} / {habits.length}
            </span>
          </div>
          <div className="p-2.5 bg-stone-100/70 rounded-lg border border-stone-200/70">
            <span className="text-[10px] text-stone-500 font-semibold block uppercase">Pending To-Dos</span>
            <span className="text-lg font-bold font-tabular text-amber-700">{pendingTodos} Tasks</span>
          </div>
          <div className="p-2.5 bg-stone-100/70 rounded-lg border border-stone-200/70">
            <span className="text-[10px] text-stone-500 font-semibold block uppercase">Status</span>
            <span className="text-lg font-bold text-sky-700">On Track</span>
          </div>
        </div>

        {/* Core Sub-Trackers Grid */}
        <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5" />
          <span>Core Navigation Hub</span>
        </h2>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => onNavigate('daily')}
            className="flex items-center gap-3 p-3 text-left rounded-xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200/80 transition shadow-xs group"
          >
            <div className="w-9 h-9 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold block truncate">Daily Planner</span>
              <span className="text-[10px] text-stone-500">Timeline, To-Dos, Mood</span>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto text-stone-400 group-hover:text-stone-700 group-hover:translate-x-0.5 transition" />
          </button>

          <button
            onClick={() => onNavigate('weekly')}
            className="flex items-center gap-3 p-3 text-left rounded-xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200/80 transition shadow-xs group"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold block truncate">Weekly Spread</span>
              <span className="text-[10px] text-stone-500">7-Day & Habit Matrix</span>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto text-stone-400 group-hover:text-stone-700 group-hover:translate-x-0.5 transition" />
          </button>

          <button
            onClick={() => onNavigate('monthly')}
            className="flex items-center gap-3 p-3 text-left rounded-xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200/80 transition shadow-xs group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold block truncate">Monthly Calendar</span>
              <span className="text-[10px] text-stone-500">Budget & Reviews</span>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto text-stone-400 group-hover:text-stone-700 group-hover:translate-x-0.5 transition" />
          </button>

          <button
            onClick={() => onSelectCategory('Vision')}
            className="flex items-center gap-3 p-3 text-left rounded-xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200/80 transition shadow-xs group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Compass className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold block truncate">Vision Board</span>
              <span className="text-[10px] text-stone-500">Inspirations & Goals</span>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto text-stone-400 group-hover:text-stone-700 group-hover:translate-x-0.5 transition" />
          </button>

          <button
            onClick={() => onSelectCategory('Budget')}
            className="flex items-center gap-3 p-3 text-left rounded-xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200/80 transition shadow-xs group"
          >
            <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold block truncate">Budget Planner</span>
              <span className="text-[10px] text-stone-500">Cashflow & Expenses</span>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto text-stone-400 group-hover:text-stone-700 group-hover:translate-x-0.5 transition" />
          </button>

          <button
            onClick={() => onNavigate('note-line')}
            className="flex items-center gap-3 p-3 text-left rounded-xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200/80 transition shadow-xs group"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold block truncate">Notes Templates</span>
              <span className="text-[10px] text-stone-500">Lined, Grid, Tables</span>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto text-stone-400 group-hover:text-stone-700 group-hover:translate-x-0.5 transition" />
          </button>
        </div>
      </div>

      {/* Right Page: Life Categories & Custom Sections */}
      <div className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto">
        <div className="border-b border-stone-200/80 pb-4 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-stone-500">Directory</p>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Categories & Custom Tabs</h2>
            </div>
            <span className="text-xs text-stone-500 font-medium">10 Sections & 10 Workspaces</span>
          </div>
        </div>

        {/* 10 Category Quick Navigation */}
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
          Life Categories (Bottom Tabs)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          {[
            { name: 'Personal', icon: Heart, color: 'text-rose-600 bg-rose-50' },
            { name: 'Self-Care', icon: Sparkles, color: 'text-pink-600 bg-pink-50' },
            { name: 'Education', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50' },
            { name: 'Finance', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
            { name: 'Budget', icon: Target, color: 'text-teal-600 bg-teal-50' },
            { name: 'Vision', icon: Compass, color: 'text-amber-600 bg-amber-50' },
            { name: 'Planning', icon: Calendar, color: 'text-sky-600 bg-sky-50' },
            { name: 'Household', icon: Home, color: 'text-orange-600 bg-orange-50' },
            { name: 'Work', icon: Briefcase, color: 'text-blue-600 bg-blue-50' },
            { name: 'Travel', icon: Plane, color: 'text-violet-600 bg-violet-50' },
          ].map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name as CategoryType)}
                className="flex flex-col items-center justify-center p-2 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 transition group text-center"
              >
                <div className={`w-7 h-7 rounded-md flex items-center justify-center mb-1 ${cat.color} group-hover:scale-110 transition`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-semibold truncate w-full">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Sections (Left Tabs) Directory */}
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
          Custom Notebook Sections (Left Tabs 1–10)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {customSections.slice(0, 8).map(sec => (
            <button
              key={sec.id}
              onClick={() => onSelectCustomSection(sec.id)}
              className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200/80 text-left transition group"
            >
              <span className="w-5 h-5 rounded-md bg-stone-200 text-stone-700 text-xs font-bold flex items-center justify-center shrink-0">
                {sec.id}
              </span>
              <span className="text-xs font-medium text-stone-700 truncate group-hover:text-stone-900">
                {sec.title}
              </span>
              <ArrowRight className="w-3 h-3 ml-auto text-stone-400 group-hover:translate-x-0.5 transition" />
            </button>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="mt-auto p-3 rounded-lg bg-stone-100/60 border border-stone-200/60 text-xs text-stone-600 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Pro-tip:</strong> Use the multi-colored edge tabs anytime to switch sections, open the Sticker Drawer to embellish notes, or click <em>Ask AI</em> in Daily View to auto-plan your day.
          </p>
        </div>
      </div>
    </div>
  );
};
