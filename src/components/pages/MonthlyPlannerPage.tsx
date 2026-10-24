import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  DollarSign,
  TrendingUp,
  Award,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { MONTH_NAMES } from '../../constants/initialData';
import { ThemeConfig } from '../../styles/themes';
import { getMonthGrid } from '../../utils/planner-logic';

interface MonthlyPlannerPageProps {
  currentMonth: number; // 0 to 11
  currentYear: number;
  onSelectMonth: (monthIndex: number) => void;
  onNavigateToDay: (date: Date) => void;
  onOpenBudgetSubpage: () => void;
  onOpenReviewSubpage: () => void;
  theme: ThemeConfig;
}

export const MonthlyPlannerPage: React.FC<MonthlyPlannerPageProps> = ({
  currentMonth,
  currentYear,
  onSelectMonth,
  onNavigateToDay,
  onOpenBudgetSubpage,
  onOpenReviewSubpage,
  theme,
}) => {
  const [monthGoals, setMonthGoals] = useState<string[]>([
    'Launch digital planner tablet web experience',
    'Hit monthly net savings target of $2,000',
    'Complete 20 gym or outdoor fitness sessions',
    'Host family and friends Sunday brunch',
  ]);
  const [newGoal, setNewGoal] = useState('');

  const [keyDates, setKeyDates] = useState<Array<{ day: number; title: string; category: string }>>([
    { day: 5, title: 'Quarterly review presentation', category: 'Work' },
    { day: 14, title: 'Anniversary celebration dinner', category: 'Personal' },
    { day: 22, title: 'Dentist routine checkup', category: 'Health' },
    { day: 28, title: 'Monthly savings & investment transfer', category: 'Finance' },
  ]);
  const [newDateTitle, setNewDateTitle] = useState('');
  const [newDateDay, setNewDateDay] = useState('1');

  const gridDays = getMonthGrid(currentYear, currentMonth);
  const monthName = MONTH_NAMES[currentMonth];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      onSelectMonth(11);
    } else {
      onSelectMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      onSelectMonth(0);
    } else {
      onSelectMonth(currentMonth + 1);
    }
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    setMonthGoals([...monthGoals, newGoal.trim()]);
    setNewGoal('');
  };

  const handleAddKeyDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDateTitle.trim()) return;
    setKeyDates([
      ...keyDates,
      { day: Number(newDateDay) || 1, title: newDateTitle.trim(), category: 'Event' },
    ]);
    setNewDateTitle('');
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-stone-200/60 dark:divide-zinc-700/60 text-stone-800 dark:text-zinc-100 text-xs">
      {/* LEFT PAGE: Traditional Calendar Grid */}
      <div className="flex-1 p-5 md:p-7 flex flex-col overflow-y-auto">
        {/* Header with Month Nav & Sub-page buttons */}
        <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-zinc-700 pb-3 mb-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded-md hover:bg-stone-200/60 dark:hover:bg-zinc-700 text-stone-600 dark:text-zinc-300 transition"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-lg md:text-xl font-bold tracking-tight text-stone-900 dark:text-white">
              {monthName} {currentYear}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-1 rounded-md hover:bg-stone-200/60 dark:hover:bg-zinc-700 text-stone-600 dark:text-zinc-300 transition"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Sub-pages Quick Link Tabs */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenBudgetSubpage}
              className="flex items-center gap-1 px-2.5 py-1 bg-stone-100 dark:bg-zinc-800 hover:bg-teal-50 dark:hover:bg-teal-900/40 hover:text-teal-800 dark:hover:text-teal-300 rounded-lg text-stone-700 dark:text-zinc-200 font-semibold text-[11px] border border-stone-200 dark:border-zinc-700 transition"
            >
              <DollarSign className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Monthly Budget</span>
            </button>
            <button
              onClick={onOpenReviewSubpage}
              className="flex items-center gap-1 px-2.5 py-1 bg-stone-100 dark:bg-zinc-800 hover:bg-purple-50 dark:hover:bg-purple-900/40 hover:text-purple-800 dark:hover:text-purple-300 rounded-lg text-stone-700 dark:text-zinc-200 font-semibold text-[11px] border border-stone-200 dark:border-zinc-700 transition"
            >
              <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Monthly Review</span>
            </button>
          </div>
        </div>

        {/* Calendar Grid Table */}
        <div className="border border-stone-200 dark:border-zinc-700 rounded-xl overflow-hidden bg-white dark:bg-zinc-800 shadow-xs flex-1 flex flex-col">
          {/* Day Names Header */}
          <div className="grid grid-cols-7 bg-stone-100 dark:bg-zinc-900/90 text-stone-600 dark:text-zinc-300 text-center font-bold text-[10px] py-1.5 border-b border-stone-200 dark:border-zinc-700">
            <span>SUN</span>
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
            <span>SAT</span>
          </div>

          {/* Days Grid Cells */}
          <div className="grid grid-cols-7 flex-1 auto-rows-fr divide-x divide-y divide-stone-100 dark:divide-zinc-700">
            {gridDays.map((cell, idx) => {
              const matchedKeyDate = cell.isCurrentMonth
                ? keyDates.find((k) => k.day === cell.dayNumber)
                : null;

              return (
                <div
                  key={idx}
                  onClick={() => cell.isCurrentMonth && onNavigateToDay(cell.date)}
                  className={`p-1.5 min-h-[64px] flex flex-col justify-between transition cursor-pointer group ${
                    cell.isCurrentMonth
                      ? 'bg-white dark:bg-zinc-800 hover:bg-amber-50/50 dark:hover:bg-zinc-700/60'
                      : 'bg-stone-50/60 dark:bg-zinc-900/40 opacity-40 cursor-default'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-tabular font-bold w-5 h-5 flex items-center justify-center rounded-full ${
                        cell.isCurrentMonth ? 'text-stone-800 dark:text-zinc-200 group-hover:bg-amber-200 dark:group-hover:text-stone-900' : 'text-stone-400'
                      }`}
                    >
                      {cell.dayNumber}
                    </span>
                  </div>

                  {matchedKeyDate && (
                    <div className="mt-1 px-1 py-0.5 rounded bg-amber-100/80 dark:bg-amber-900/50 border border-amber-300/60 dark:border-amber-700 text-[9px] text-amber-900 dark:text-amber-200 font-semibold truncate leading-tight">
                      {matchedKeyDate.title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT PAGE: Goals, Key Milestones & Sub-Page Features */}
      <div className="flex-1 p-5 md:p-7 flex flex-col overflow-y-auto space-y-4">
        {/* Month Goals */}
        <div className="p-3.5 bg-stone-50/70 dark:bg-zinc-800/80 rounded-xl border border-stone-200/70 dark:border-zinc-700 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-[11px] text-stone-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              {monthName} Main Objectives & Goals
            </span>
            <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-semibold">{monthGoals.length} Goals</span>
          </div>

          <div className="space-y-1.5 mb-2.5 max-h-36 overflow-y-auto">
            {monthGoals.map((goal, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-zinc-700/60 border border-stone-200/70 dark:border-zinc-600"
              >
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium text-stone-800 dark:text-zinc-100 text-xs flex-1">{goal}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddGoal} className="flex items-center gap-1.5">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Add key monthly milestone..."
              className="flex-1 bg-white dark:bg-zinc-700 dark:text-white border border-stone-200 dark:border-zinc-600 rounded-md px-2.5 py-1 text-xs focus:outline-none"
            />
            <button
              type="submit"
              className="px-2.5 py-1 bg-stone-800 dark:bg-zinc-900 text-white rounded-md text-xs font-semibold hover:bg-stone-700 transition"
            >
              Add
            </button>
          </form>
        </div>

        {/* Key Dates & Celebrations */}
        <div className="p-3.5 bg-stone-50/70 dark:bg-zinc-800/80 rounded-xl border border-stone-200/70 dark:border-zinc-700 shadow-xs flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-[11px] text-stone-700 dark:text-zinc-300 uppercase tracking-wider">
              Important Key Dates
            </span>
            <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-semibold">{keyDates.length} Events</span>
          </div>

          <div className="space-y-1.5 flex-1 overflow-y-auto mb-2">
            {keyDates.map((kd, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-zinc-700/60 border border-stone-200/70 dark:border-zinc-600"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-stone-100 dark:bg-zinc-800 font-tabular font-bold text-xs flex items-center justify-center text-stone-700 dark:text-zinc-200 border border-stone-200 dark:border-zinc-600">
                    {kd.day}
                  </span>
                  <span className="font-medium text-stone-800 dark:text-zinc-100 text-xs">{kd.title}</span>
                </div>
                <span className="text-[10px] font-semibold text-stone-500 dark:text-zinc-400 bg-stone-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                  {kd.category}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddKeyDate} className="flex items-center gap-1.5 pt-1">
            <input
              type="number"
              min="1"
              max="31"
              value={newDateDay}
              onChange={(e) => setNewDateDay(e.target.value)}
              className="w-12 bg-white dark:bg-zinc-700 dark:text-white border border-stone-200 dark:border-zinc-600 rounded px-2 py-1 text-xs font-tabular text-center"
            />
            <input
              type="text"
              value={newDateTitle}
              onChange={(e) => setNewDateTitle(e.target.value)}
              placeholder="Event or milestone title..."
              className="flex-1 bg-white dark:bg-zinc-700 dark:text-white border border-stone-200 dark:border-zinc-600 rounded px-2 py-1 text-xs"
            />
            <button
              type="submit"
              className="px-2.5 py-1 bg-stone-800 dark:bg-zinc-900 text-white rounded text-xs font-semibold hover:bg-stone-700"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
