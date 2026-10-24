import React, { useState } from 'react';
import { Award, ArrowLeft, Star, Heart, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { ThemeConfig } from '../../styles/themes';

interface MonthlyReviewPageProps {
  onBackToMonthly: () => void;
  monthName: string;
  theme: ThemeConfig;
}

export const MonthlyReviewPage: React.FC<MonthlyReviewPageProps> = ({
  onBackToMonthly,
  monthName,
  theme,
}) => {
  const [rating, setRating] = useState<number>(4);
  const [wins, setWins] = useState<string[]>([
    'Completed the tablet digital planner skeuomorphic open binder project',
    'Maintained consistent gym routine 4x per week',
    'Stuck strictly to dining-out budget limit and saved $1,800',
    'Cultivated daily reading habit before bedtime without screens',
  ]);
  const [newWin, setNewWin] = useState('');

  const [improvements, setImprovements] = useState<string[]>([
    'Wake up 30 minutes earlier on Tuesdays and Thursdays to prevent morning rush',
    'Drink full glass of lemon water immediately upon getting out of bed',
    'Delegate minor administrative tasks earlier in the sprint',
  ]);
  const [newImprovement, setNewImprovement] = useState('');

  const [nextMonthFocus, setNextMonthFocus] = useState<string>(
    'Focus on deep work blocks in the morning, launch creative portfolio showcase, and prepare for annual wellness retreat.'
  );

  const handleAddWin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWin.trim()) return;
    setWins([...wins, newWin.trim()]);
    setNewWin('');
  };

  const handleAddImprovement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImprovement.trim()) return;
    setImprovements([...improvements, newImprovement.trim()]);
    setNewImprovement('');
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-stone-200/60 text-stone-800 text-xs">
      {/* LEFT PAGE: Wins & Celebrations */}
      <div className="flex-1 p-5 md:p-7 flex flex-col overflow-y-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToMonthly}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-600 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Calendar</span>
            </button>
            <h2 className="text-base md:text-lg font-bold tracking-tight">
              {monthName} Monthly Review
            </h2>
          </div>

          {/* Month Star Rating */}
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
            <span className="text-[10px] font-bold text-amber-800 uppercase mr-1">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-0.5 text-amber-400 hover:scale-125 transition"
              >
                <Star
                  className={`w-3.5 h-3.5 ${
                    star <= rating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Big Wins Section */}
        <div className="p-3.5 bg-stone-50/70 rounded-xl border border-stone-200/70 shadow-xs flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-[11px] text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              Proudest Wins & Milestones Achieved
            </span>
            <span className="text-[10px] text-stone-500 font-semibold">{wins.length} Wins</span>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto mb-2">
            {wins.map((w, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2.5 rounded-lg bg-white border border-stone-200/70 shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-handwriting text-base text-stone-900 font-bold leading-tight">
                  {w}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddWin} className="flex items-center gap-1.5 pt-1">
            <input
              type="text"
              value={newWin}
              onChange={(e) => setNewWin(e.target.value)}
              placeholder="Record a victory or proud achievement..."
              className="flex-1 bg-white border border-stone-200 rounded px-2.5 py-1 text-xs"
            />
            <button
              type="submit"
              className="px-2.5 py-1 bg-stone-800 text-white rounded text-xs font-semibold hover:bg-stone-700 transition"
            >
              Add Win
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT PAGE: Improvements & Next Month's Vision */}
      <div className="flex-1 p-5 md:p-7 flex flex-col overflow-y-auto space-y-4">
        {/* Lessons & Growth */}
        <div className="p-3.5 bg-stone-50/70 rounded-xl border border-stone-200/70 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-[11px] text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              Key Learnings & Areas for Growth
            </span>
          </div>

          <div className="space-y-2 mb-2 max-h-44 overflow-y-auto">
            {improvements.map((imp, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2 rounded-lg bg-white border border-stone-200/70"
              >
                <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="font-medium text-stone-800 text-xs">{imp}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddImprovement} className="flex items-center gap-1.5">
            <input
              type="text"
              value={newImprovement}
              onChange={(e) => setNewImprovement(e.target.value)}
              placeholder="Insight or adjustment for next cycle..."
              className="flex-1 bg-white border border-stone-200 rounded px-2.5 py-1 text-xs"
            />
            <button
              type="submit"
              className="px-2.5 py-1 bg-stone-800 text-white rounded text-xs font-semibold hover:bg-stone-700"
            >
              Add
            </button>
          </form>
        </div>

        {/* Vision for Next Month */}
        <div className="p-3.5 bg-stone-50/70 rounded-xl border border-stone-200/70 shadow-xs flex-1 flex flex-col">
          <span className="font-bold text-[11px] text-stone-700 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Next Month's Core Direction & Manifesto
          </span>
          <textarea
            value={nextMonthFocus}
            onChange={(e) => setNextMonthFocus(e.target.value)}
            rows={5}
            className="w-full flex-1 p-3 bg-white border border-stone-200 rounded-lg text-sm font-handwriting font-bold leading-relaxed text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-400"
            placeholder="Write your personal intention for next month..."
          />
        </div>
      </div>
    </div>
  );
};
