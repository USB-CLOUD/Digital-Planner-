import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Trash2,
  Check,
  Calendar as CalendarIcon,
  Smile,
  Moon,
  Droplet,
  Utensils,
  CreditCard,
  Clock,
  ListTodo,
  Bell,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Expense,
  ToDoItem,
  SmartEvent,
  MealHydration,
  MoodSleep,
} from '../../types/planner';
import { ThemeConfig } from '../../styles/themes';
import { calculateExpensesTotal, generateHourlySlots } from '../../utils/planner-logic';

interface DailyPlannerPageProps {
  currentDate: Date;
  onChangeDate: (newDate: Date) => void;
  todayFocus: string;
  onChangeTodayFocus: (focus: string) => void;
  reminders: string[];
  onAddReminder: (text: string) => void;
  onRemoveReminder: (index: number) => void;
  expenses: Expense[];
  onAddExpense: (item: string, amount: number, category: string) => void;
  onRemoveExpense: (id: string) => void;
  todos: ToDoItem[];
  onToggleTodo: (id: string) => void;
  onAddTodo: (text: string, priority?: 'high' | 'medium' | 'low') => void;
  onRemoveTodo: (id: string) => void;
  mealsHydration: MealHydration;
  onChangeMealsHydration: (val: MealHydration) => void;
  moodSleep: MoodSleep;
  onChangeMoodSleep: (val: MoodSleep) => void;
  events: SmartEvent[];
  onOpenScheduleModal: (hour: number, existingEvent?: SmartEvent) => void;
  onOpenAskAI: () => void;
  theme: ThemeConfig;
}

const MOODS: Array<{ id: 'great' | 'good' | 'neutral' | 'down' | 'stressed'; emoji: string; label: string }> = [
  { id: 'great', emoji: '😄', label: 'Great' },
  { id: 'good', emoji: '🙂', label: 'Good' },
  { id: 'neutral', emoji: '😐', label: 'Okay' },
  { id: 'down', emoji: '😔', label: 'Down' },
  { id: 'stressed', emoji: '😫', label: 'Stressed' },
];

export const DailyPlannerPage: React.FC<DailyPlannerPageProps> = ({
  currentDate,
  onChangeDate,
  todayFocus,
  onChangeTodayFocus,
  reminders,
  onAddReminder,
  onRemoveReminder,
  expenses,
  onAddExpense,
  onRemoveExpense,
  todos,
  onToggleTodo,
  onAddTodo,
  onRemoveTodo,
  mealsHydration,
  onChangeMealsHydration,
  moodSleep,
  onChangeMoodSleep,
  events,
  onOpenScheduleModal,
  onOpenAskAI,
  theme,
}) => {
  // Local state for adding an expense
  const [newExpenseItem, setNewExpenseItem] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState('Personal');

  // Local state for adding a reminder
  const [newReminderText, setNewReminderText] = useState('');

  // Local state for adding a to-do
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const hourlySlots = generateHourlySlots(6, 22);
  const totalExpenses = calculateExpensesTotal(expenses);

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handlePrevDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    onChangeDate(d);
  };

  const handleNextDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    onChangeDate(d);
  };

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseItem.trim() || isNaN(Number(newExpenseAmount))) return;
    onAddExpense(newExpenseItem.trim(), Number(newExpenseAmount), newExpenseCategory);
    setNewExpenseItem('');
    setNewExpenseAmount('');
  };

  const handleAddReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminderText.trim()) return;
    onAddReminder(newReminderText.trim());
    setNewReminderText('');
  };

  const handleAddTodoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    onAddTodo(newTodoText.trim(), newTodoPriority);
    setNewTodoText('');
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-stone-200/60 text-stone-800 text-xs">
      {/* LEFT PAGE: Mini Calendar, Focus, Reminders, Expenses, Meals/Hydration, Mood/Sleep */}
      <div className="flex-1 p-5 md:p-7 flex flex-col overflow-y-auto space-y-4.5">
        {/* Date Title & Day Navigation */}
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevDay}
              className="p-1 rounded-md hover:bg-stone-200/60 text-stone-600 transition"
              aria-label="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-base md:text-lg font-bold tracking-tight">{formattedDate}</h2>
            <button
              onClick={handleNextDay}
              className="p-1 rounded-md hover:bg-stone-200/60 text-stone-600 transition"
              aria-label="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            Daily Spread · Page 1
          </span>
        </div>

        {/* Today's Focus Box */}
        <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/25 shadow-xs">
          <label className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Today's Main Focus
          </label>
          <input
            type="text"
            value={todayFocus}
            onChange={(e) => onChangeTodayFocus(e.target.value)}
            placeholder="What is your #1 high-impact focus today?"
            className="w-full bg-white/80 border border-amber-300/60 rounded-lg px-2.5 py-1.5 text-sm font-handwriting font-bold text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Reminders Section */}
        <div className="p-3 bg-stone-50/70 rounded-xl border border-stone-200/70 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-[11px] text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-amber-600" />
              Reminders
            </span>
            <span className="text-[10px] text-stone-500">{reminders.length} items</span>
          </div>

          <div className="space-y-1 mb-2.5 max-h-24 overflow-y-auto">
            {reminders.map((rem, idx) => (
              <div key={idx} className="flex items-center justify-between py-0.5 group">
                <span className="font-handwriting text-sm text-stone-800 font-medium">
                  • {rem}
                </span>
                <button
                  onClick={() => onRemoveReminder(idx)}
                  className="opacity-0 group-hover:opacity-100 p-0.5 text-stone-400 hover:text-red-500 transition"
                  aria-label={`Remove reminder ${rem}`}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddReminderSubmit} className="flex items-center gap-1.5">
            <input
              type="text"
              value={newReminderText}
              onChange={(e) => setNewReminderText(e.target.value)}
              placeholder="Add quick reminder..."
              className="flex-1 bg-white border border-stone-200 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
            <button
              type="submit"
              className="px-2.5 py-1 bg-stone-800 text-white rounded-md text-xs font-medium hover:bg-stone-700 transition"
            >
              Add
            </button>
          </form>
        </div>

        {/* Expenses Table */}
        <div className="p-3 bg-stone-50/70 rounded-xl border border-stone-200/70 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-[11px] text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              Expenses Log
            </span>
            <span className="font-bold font-tabular text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Total: ${totalExpenses.toFixed(2)}
            </span>
          </div>

          <div className="border border-stone-200 rounded-lg overflow-hidden mb-2 bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100 text-[10px] text-stone-600 border-b border-stone-200">
                  <th className="py-1 px-2 font-semibold">Item</th>
                  <th className="py-1 px-2 font-semibold">Category</th>
                  <th className="py-1 px-2 font-semibold text-right">Amount</th>
                  <th className="w-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs">
                {expenses.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-2 text-center text-stone-400 italic text-[11px]">
                      No expenses logged today yet.
                    </td>
                  </tr>
                ) : (
                  expenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-stone-50 group">
                      <td className="py-1 px-2 font-medium truncate max-w-[120px]">{exp.item}</td>
                      <td className="py-1 px-2 text-[10px] text-stone-500">{exp.category}</td>
                      <td className="py-1 px-2 font-tabular font-semibold text-right">
                        ${exp.amount.toFixed(2)}
                      </td>
                      <td className="py-1 px-1 text-center">
                        <button
                          onClick={() => onRemoveExpense(exp.id)}
                          className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-red-500 transition"
                          aria-label={`Remove expense ${exp.item}`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Add expense inline form */}
          <form onSubmit={handleAddExpenseSubmit} className="grid grid-cols-6 gap-1.5">
            <input
              type="text"
              value={newExpenseItem}
              onChange={(e) => setNewExpenseItem(e.target.value)}
              placeholder="Expense item"
              className="col-span-3 bg-white border border-stone-200 rounded px-2 py-1 text-xs focus:outline-none"
            />
            <input
              type="number"
              step="0.01"
              value={newExpenseAmount}
              onChange={(e) => setNewExpenseAmount(e.target.value)}
              placeholder="$0.00"
              className="col-span-2 bg-white border border-stone-200 rounded px-2 py-1 text-xs font-tabular focus:outline-none"
            />
            <button
              type="submit"
              className="col-span-1 bg-emerald-700 text-white font-medium rounded hover:bg-emerald-800 transition flex items-center justify-center"
              title="Add Expense"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Meals & Hydration Tracker */}
        <div className="p-3 bg-stone-50/70 rounded-xl border border-stone-200/70 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-[11px] text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-orange-600" />
              Meals & Hydration Tracker
            </span>
            {/* Water glass interactive tracker */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-stone-500 font-semibold mr-1">
                {mealsHydration.waterGlasses}/8 Glasses
              </span>
              {Array.from({ length: 8 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() =>
                    onChangeMealsHydration({
                      ...mealsHydration,
                      waterGlasses: i < mealsHydration.waterGlasses ? i : i + 1,
                    })
                  }
                  className={`w-3.5 h-5 rounded-xs border transition transform active:scale-95 flex items-end justify-center overflow-hidden ${
                    i < mealsHydration.waterGlasses
                      ? 'border-sky-500 bg-sky-400'
                      : 'border-stone-300 bg-white hover:border-sky-300'
                  }`}
                  title={`Water glass ${i + 1}`}
                >
                  <Droplet
                    className={`w-2.5 h-2.5 ${
                      i < mealsHydration.waterGlasses ? 'text-white' : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="font-semibold text-stone-500 block mb-0.5">Breakfast:</span>
              <input
                type="text"
                value={mealsHydration.breakfast}
                onChange={(e) =>
                  onChangeMealsHydration({ ...mealsHydration, breakfast: e.target.value })
                }
                placeholder="Morning meal..."
                className="w-full bg-white border border-stone-200 rounded px-2 py-1 text-xs"
              />
            </div>
            <div>
              <span className="font-semibold text-stone-500 block mb-0.5">Lunch:</span>
              <input
                type="text"
                value={mealsHydration.lunch}
                onChange={(e) =>
                  onChangeMealsHydration({ ...mealsHydration, lunch: e.target.value })
                }
                placeholder="Midday meal..."
                className="w-full bg-white border border-stone-200 rounded px-2 py-1 text-xs"
              />
            </div>
            <div>
              <span className="font-semibold text-stone-500 block mb-0.5">Dinner:</span>
              <input
                type="text"
                value={mealsHydration.dinner}
                onChange={(e) =>
                  onChangeMealsHydration({ ...mealsHydration, dinner: e.target.value })
                }
                placeholder="Evening meal..."
                className="w-full bg-white border border-stone-200 rounded px-2 py-1 text-xs"
              />
            </div>
            <div>
              <span className="font-semibold text-stone-500 block mb-0.5">Snacks:</span>
              <input
                type="text"
                value={mealsHydration.snacks}
                onChange={(e) =>
                  onChangeMealsHydration({ ...mealsHydration, snacks: e.target.value })
                }
                placeholder="Nuts, fruit, tea..."
                className="w-full bg-white border border-stone-200 rounded px-2 py-1 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Mood & Sleep Tracker */}
        <div className="p-3 bg-stone-50/70 rounded-xl border border-stone-200/70 shadow-xs flex items-center justify-between">
          <div>
            <span className="font-bold text-[11px] text-stone-700 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <Smile className="w-3.5 h-3.5 text-amber-600" />
              Daily Mood
            </span>
            <div className="flex items-center gap-1.5">
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onChangeMoodSleep({ ...moodSleep, mood: m.id })}
                  className={`p-1 text-lg rounded-md transition transform hover:scale-110 ${
                    moodSleep.mood === m.id
                      ? 'bg-amber-100 ring-2 ring-amber-400 scale-110 shadow-xs'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  title={m.label}
                >
                  {m.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="text-right">
            <span className="font-bold text-[11px] text-stone-700 uppercase tracking-wider flex items-center justify-end gap-1.5 mb-1.5">
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              Sleep: {moodSleep.sleepHours} hrs
            </span>
            <div className="flex items-center gap-1">
              {[5, 6, 7, 8, 9].map((hrs) => (
                <button
                  key={hrs}
                  type="button"
                  onClick={() => onChangeMoodSleep({ ...moodSleep, sleepHours: hrs })}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-tabular font-bold border transition ${
                    moodSleep.sleepHours === hrs
                      ? 'bg-indigo-600 text-white border-indigo-700'
                      : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {hrs}h
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PAGE: Hourly Schedule & To-Do Lists with Ask AI */}
      <div className="flex-1 p-5 md:p-7 flex flex-col overflow-y-auto space-y-4">
        {/* Header with Ask AI Callout */}
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
          <div>
            <h3 className="text-base font-bold tracking-tight">Timeline & Action Tasks</h3>
            <span className="text-[11px] text-stone-500">Click any hour to schedule smart event</span>
          </div>

          <button
            onClick={onOpenAskAI}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-lg font-bold text-xs shadow-sm hover:from-amber-600 hover:to-rose-600 transition transform active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Ask AI Planner</span>
          </button>
        </div>

        {/* Hourly Schedule Timeline */}
        <div className="border border-stone-200 rounded-xl bg-white shadow-xs overflow-hidden flex flex-col">
          <div className="p-2 bg-stone-100/80 border-b border-stone-200 flex items-center justify-between">
            <span className="font-bold text-[11px] uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              Hourly Schedule (6 AM – 10 PM)
            </span>
            <span className="text-[10px] text-stone-500 italic">Apple & Google Calendar Sync</span>
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-stone-100">
            {hourlySlots.map((slot) => {
              const eventForHour = events.find((e) => e.hour === slot.hour);

              return (
                <div
                  key={slot.hour}
                  onClick={() => onOpenScheduleModal(slot.hour, eventForHour)}
                  className="flex items-center px-3 py-2 hover:bg-amber-50/40 cursor-pointer transition group"
                >
                  <span className="w-16 font-tabular font-semibold text-[11px] text-stone-500 shrink-0">
                    {slot.label}
                  </span>

                  <div className="flex-1 pl-2 border-l border-stone-200 min-h-[22px] flex items-center justify-between">
                    {eventForHour ? (
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            eventForHour.category === 'work'
                              ? 'bg-blue-100 text-blue-800'
                              : eventForHour.category === 'wellness'
                              ? 'bg-emerald-100 text-emerald-800'
                              : eventForHour.category === 'meal'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {eventForHour.category || 'Event'}
                        </span>
                        <span className="font-medium text-stone-900 text-xs truncate">
                          {eventForHour.title}
                        </span>
                        {eventForHour.notes && (
                          <span className="text-[10px] text-stone-400 truncate max-w-[140px]">
                            — {eventForHour.notes}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-[11px] text-stone-300 italic group-hover:text-stone-400">
                        + Add event or reminder...
                      </span>
                    )}

                    <Plus className="w-3.5 h-3.5 text-stone-300 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* To-Do Lists with Functional Checkboxes */}
        <div className="p-3 bg-stone-50/70 rounded-xl border border-stone-200/70 shadow-xs flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-[11px] text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <ListTodo className="w-3.5 h-3.5 text-indigo-600" />
              Prioritized To-Do List
            </span>
            <span className="text-[10px] text-stone-500 font-tabular">
              {todos.filter((t) => t.completed).length} / {todos.length} done
            </span>
          </div>

          {/* List items */}
          <div className="space-y-1.5 flex-1 overflow-y-auto mb-2 max-h-48 pr-1">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-stone-200/80 hover:border-stone-300 transition group"
              >
                <button
                  type="button"
                  onClick={() => onToggleTodo(todo.id)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                    todo.completed
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-stone-300 bg-white hover:border-stone-400'
                  }`}
                  aria-label={`Toggle to-do ${todo.text}`}
                >
                  {todo.completed && <Check className="w-3 h-3 stroke-[3]" />}
                </button>

                <span
                  className={`flex-1 text-xs select-none transition ${
                    todo.completed
                      ? 'line-through text-stone-400'
                      : 'text-stone-800 font-medium'
                  }`}
                >
                  {todo.text}
                </span>

                {todo.priority && (
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      todo.priority === 'high'
                        ? 'bg-rose-100 text-rose-700'
                        : todo.priority === 'medium'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {todo.priority}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => onRemoveTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 p-0.5 text-stone-400 hover:text-red-500 transition"
                  aria-label={`Remove to-do ${todo.text}`}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Add to-do inline form */}
          <form onSubmit={handleAddTodoSubmit} className="flex items-center gap-1.5 pt-1">
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              placeholder="Add new action item..."
              className="flex-1 bg-white border border-stone-200 rounded-md px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
            <select
              value={newTodoPriority}
              onChange={(e) => setNewTodoPriority(e.target.value as any)}
              className="bg-white border border-stone-200 rounded-md px-1.5 py-1 text-xs focus:outline-none"
            >
              <option value="high">High</option>
              <option value="medium">Med</option>
              <option value="low">Low</option>
            </select>
            <button
              type="submit"
              className="px-2.5 py-1 bg-stone-800 text-white rounded-md text-xs font-semibold hover:bg-stone-700 transition"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
