import React, { useState } from 'react';
import {
  Calendar,
  Check,
  Plus,
  Trash2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Habit } from '../../types/planner';
import { ThemeConfig } from '../../styles/themes';
import { getWeekDays, calculateHabitStats } from '../../utils/planner-logic';

interface WeeklyPlannerPageProps {
  currentDate: Date;
  onChangeDate: (newDate: Date) => void;
  habits: Habit[];
  onToggleHabitDay: (habitId: string, dayIdx: number) => void;
  onAddHabit: (name: string, category?: string) => void;
  onRemoveHabit: (habitId: string) => void;
  theme: ThemeConfig;
}

export const WeeklyPlannerPage: React.FC<WeeklyPlannerPageProps> = ({
  currentDate,
  onChangeDate,
  habits,
  onToggleHabitDay,
  onAddHabit,
  onRemoveHabit,
  theme,
}) => {
  const [startOnMonday, setStartOnMonday] = useState(true);
  const [weeklyPriorities, setWeeklyPriorities] = useState<string[]>([
    'Complete the tablet digital planner architecture and skeuomorphic styles',
    'Hit 4 workouts and maintain consistent 8 glasses of daily water',
    'Review personal monthly budget & allocate savings to index ETF',
    'Finish reading Atomic Habits Chapter 4',
  ]);
  const [newPriorityText, setNewPriorityText] = useState('');
  const [newHabitName, setNewHabitName] = useState('');

  // Daily notes for each of the 7 days
  const [dayNotes, setDayNotes] = useState<Record<string, string[]>>({
    '0': ['Morning team standup 9:30 AM', 'Deep work: UI design'],
    '1': ['Client sync call 2:00 PM', 'Gym leg day session'],
    '2': ['Sprint planning review', 'Dentist appointment 4:00 PM'],
    '3': ['Focus sprint & testing', 'Dinner with friends 7:30 PM'],
    '4': ['Weekly wrap-up & release demo', 'Cocktail evening'],
    '5': ['Farmers market morning stroll', 'Long nature trail run'],
    '6': ['Meal prep for the upcoming week', 'Relaxation & book reading'],
  });
  const [activeDayAddNote, setActiveDayAddNote] = useState<number | null>(null);
  const [tempNoteText, setTempNoteText] = useState('');

  const weekDays = getWeekDays(currentDate, startOnMonday);
  const habitStats = calculateHabitStats(habits);

  const handlePrevWeek = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 7);
    onChangeDate(d);
  };

  const handleNextWeek = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 7);
    onChangeDate(d);
  };

  const handleAddPriority = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPriorityText.trim()) return;
    setWeeklyPriorities([...weeklyPriorities, newPriorityText.trim()]);
    setNewPriorityText('');
  };

  const handleRemovePriority = (idx: number) => {
    setWeeklyPriorities(weeklyPriorities.filter((_, i) => i !== idx));
  };

  const handleAddHabitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    onAddHabit(newHabitName.trim(), 'Daily');
    setNewHabitName('');
  };

  const handleAddDayNote = (dayIdx: number) => {
    if (!tempNoteText.trim()) return;
    const currentList = dayNotes[dayIdx.toString()] || [];
    setDayNotes({
      ...dayNotes,
      [dayIdx.toString()]: [...currentList, tempNoteText.trim()],
    });
    setTempNoteText('');
    setActiveDayAddNote(null);
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-stone-200/60 text-stone-800 text-xs">
      {/* LEFT PAGE: 7-Day Layout & Day Columns */}
      <div className="flex-1 p-5 md:p-7 flex flex-col overflow-y-auto">
        {/* Header & Controls */}
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevWeek}
              className="p-1 rounded-md hover:bg-stone-200/60 text-stone-600 transition"
              aria-label="Previous Week"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h2 className="text-base md:text-lg font-bold tracking-tight">
              Weekly Spread · {weekDays[0].dayName} {weekDays[0].dayNumber} - {weekDays[6].dayName} {weekDays[6].dayNumber}
            </h2>
            <button
              onClick={handleNextWeek}
              className="p-1 rounded-md hover:bg-stone-200/60 text-stone-600 transition"
              aria-label="Next Week"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Monday vs Sunday Start Selector */}
          <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200">
            <button
              onClick={() => setStartOnMonday(true)}
              className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition ${
                startOnMonday ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
              }`}
            >
              Mon Start
            </button>
            <button
              onClick={() => setStartOnMonday(false)}
              className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition ${
                !startOnMonday ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
              }`}
            >
              Sun Start
            </button>
          </div>
        </div>

        {/* 7-Day Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 overflow-y-auto pr-1">
          {weekDays.map((d, idx) => {
            const notes = dayNotes[idx.toString()] || [];

            return (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border transition flex flex-col min-h-[115px] ${
                  d.isCurrentDay
                    ? 'bg-amber-50/50 border-amber-300 ring-1 ring-amber-300/60 shadow-xs'
                    : 'bg-stone-50/70 border-stone-200/80 hover:bg-stone-50'
                }`}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-stone-200/60 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center font-tabular font-bold text-xs ${
                        d.isCurrentDay ? 'bg-amber-500 text-white' : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {d.dayNumber}
                    </span>
                    <span className="font-bold text-xs uppercase tracking-wider text-stone-700">
                      {d.dayName}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveDayAddNote(idx)}
                    className="p-0.5 rounded hover:bg-stone-200/60 text-stone-400 hover:text-stone-700"
                    title="Add note"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Day Notes & Tasks */}
                <div className="space-y-1 flex-1 overflow-y-auto">
                  {notes.map((note, nIdx) => (
                    <div key={nIdx} className="font-handwriting text-sm text-stone-800 flex items-start gap-1">
                      <span className="text-stone-400 mt-0.5">•</span>
                      <span className="leading-tight">{note}</span>
                    </div>
                  ))}
                  {notes.length === 0 && (
                    <span className="text-[10px] text-stone-400 italic">No scheduled items</span>
                  )}
                </div>

                {/* Inline Add Note Form */}
                {activeDayAddNote === idx && (
                  <div className="mt-1 flex items-center gap-1 pt-1 border-t border-stone-200/60">
                    <input
                      type="text"
                      autoFocus
                      value={tempNoteText}
                      onChange={(e) => setTempNoteText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddDayNote(idx)}
                      placeholder="Add note..."
                      className="flex-1 bg-white border border-stone-300 rounded px-1.5 py-0.5 text-xs"
                    />
                    <button
                      onClick={() => handleAddDayNote(idx)}
                      className="px-2 py-0.5 bg-stone-800 text-white rounded text-[10px]"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setActiveDayAddNote(null)}
                      className="px-1.5 py-0.5 text-stone-500 text-[10px]"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT PAGE: Weekly Priority List & Grid-Based Habit Tracker */}
      <div className="flex-1 p-5 md:p-7 flex flex-col overflow-y-auto space-y-4">
        {/* Weekly Focus & Priorities */}
        <div className="p-3.5 bg-stone-50/70 rounded-xl border border-stone-200/70 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-[11px] text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Weekly Top Priorities
            </span>
            <span className="text-[10px] text-stone-500 font-semibold">
              {weeklyPriorities.length} Targets
            </span>
          </div>

          <div className="space-y-1.5 mb-2.5 max-h-36 overflow-y-auto">
            {weeklyPriorities.map((pri, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-white border border-stone-200/70 group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-stone-800 text-xs">{pri}</span>
                </div>
                <button
                  onClick={() => handleRemovePriority(idx)}
                  className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-red-500 p-0.5 transition"
                  aria-label="Remove priority"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddPriority} className="flex items-center gap-1.5">
            <input
              type="text"
              value={newPriorityText}
              onChange={(e) => setNewPriorityText(e.target.value)}
              placeholder="Add high-impact weekly target..."
              className="flex-1 bg-white border border-stone-200 rounded-md px-2.5 py-1 text-xs focus:outline-none"
            />
            <button
              type="submit"
              className="px-2.5 py-1 bg-stone-800 text-white rounded-md text-xs font-semibold hover:bg-stone-700 transition"
            >
              Add
            </button>
          </form>
        </div>

        {/* Grid-Based Habit Tracker */}
        <div className="p-3.5 bg-stone-50/70 rounded-xl border border-stone-200/70 shadow-xs flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-bold text-[11px] text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                Weekly Habit Matrix
              </span>
              <span className="text-[10px] text-stone-500">Track consistency across all 7 days</span>
            </div>
            {/* Live Progress Pill */}
            <div className="flex items-center gap-2 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              <span className="text-[10px] font-bold text-emerald-900 uppercase">Consistency</span>
              <span className="text-xs font-bold font-tabular text-emerald-700">
                {habitStats.overallPercentage}%
              </span>
            </div>
          </div>

          {/* Habit Grid Table */}
          <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-xs flex-1 flex flex-col mb-2.5">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-[10px] text-stone-600 border-b border-stone-200">
                    <th className="py-2 px-3 font-bold">Habit Routine</th>
                    {weekDays.map((d) => (
                      <th key={d.dayName} className="py-2 px-1 text-center font-bold w-7">
                        {d.dayName.slice(0, 2)}
                      </th>
                    ))}
                    <th className="w-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {habits.map((habit) => {
                    const doneThisWeek = habit.days.filter(Boolean).length;

                    return (
                      <tr key={habit.id} className="hover:bg-stone-50/80 group">
                        <td className="py-2 px-3 font-medium text-stone-800">
                          <div className="flex items-center justify-between pr-2">
                            <span className="truncate max-w-[140px]">{habit.name}</span>
                            <span className="text-[10px] font-tabular text-stone-400 font-semibold">
                              {doneThisWeek}/7
                            </span>
                          </div>
                        </td>

                        {/* 7 Checkboxes */}
                        {habit.days.map((isDone, dayIdx) => (
                          <td key={dayIdx} className="py-2 px-1 text-center">
                            <button
                              type="button"
                              onClick={() => onToggleHabitDay(habit.id, dayIdx)}
                              className={`w-5 h-5 rounded mx-auto flex items-center justify-center transition ${
                                isDone
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-stone-100 border border-stone-300 hover:border-emerald-400'
                              }`}
                              title={`Toggle ${weekDays[dayIdx]?.dayName}`}
                            >
                              {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </button>
                          </td>
                        ))}

                        <td className="py-2 px-1 text-center">
                          <button
                            type="button"
                            onClick={() => onRemoveHabit(habit.id)}
                            className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-red-500 transition p-0.5"
                            aria-label="Remove habit"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Habit Form */}
          <form onSubmit={handleAddHabitSubmit} className="flex items-center gap-1.5 pt-1">
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder="New daily habit to cultivate..."
              className="flex-1 bg-white border border-stone-200 rounded-md px-2.5 py-1 text-xs focus:outline-none"
            />
            <button
              type="submit"
              className="px-2.5 py-1 bg-emerald-700 text-white rounded-md text-xs font-semibold hover:bg-emerald-800 transition flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Habit</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
