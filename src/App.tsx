import React, { useState } from 'react';
import {
  ThemeMode,
  ActivePageType,
  CategoryType,
  CustomSection,
  Expense,
  Habit,
  MealHydration,
  MoodSleep,
  PlacedSticker,
  SmartEvent,
  StickerDefinition,
  ToDoItem,
} from './types/planner';
import {
  INITIAL_CUSTOM_SECTIONS,
  INITIAL_EVENTS,
  INITIAL_EXPENSES,
  INITIAL_HABITS,
  INITIAL_MEALS_HYDRATION,
  INITIAL_MOOD_SLEEP,
  INITIAL_TODOS,
  MONTH_NAMES,
} from './constants/initialData';
import { THEMES } from './styles/themes';
import { HeaderBar } from './components/HeaderBar';
import { BinderLayout } from './components/BinderLayout';
import { IndexPage } from './components/pages/IndexPage';
import { DailyPlannerPage } from './components/pages/DailyPlannerPage';
import { WeeklyPlannerPage } from './components/pages/WeeklyPlannerPage';
import { MonthlyPlannerPage } from './components/pages/MonthlyPlannerPage';
import { MonthlyBudgetPage } from './components/pages/MonthlyBudgetPage';
import { MonthlyReviewPage } from './components/pages/MonthlyReviewPage';
import { NotesPage } from './components/pages/NotesPage';
import { CategoryPage } from './components/pages/CategoryPage';
import { CustomSectionPage } from './components/pages/CustomSectionPage';
import { CanvasAnnotationLayer } from './components/tools/CanvasAnnotationLayer';
import { PlacedStickersLayer } from './components/tools/PlacedStickersLayer';
import { StickersLibraryModal } from './components/tools/StickersLibraryModal';
import { SmartScheduleModal } from './components/tools/SmartScheduleModal';
import { AskAIModal } from './components/tools/AskAIModal';
import { UtilityShortcutsModal } from './components/tools/UtilityShortcutsMenu';

export default function App() {
  // Theme & Navigation State
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('rainbow');
  const [activePage, setActivePage] = useState<ActivePageType>('daily');
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 9, 24)); // Oct 24, 2026
  const [currentMonth, setCurrentMonth] = useState<number>(9); // 0-indexed (9 = Oct)
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Personal');
  const [activeSectionId, setActiveSectionId] = useState<number>(1);

  // Daily Planner State
  const [todayFocus, setTodayFocus] = useState<string>(
    'Refine the tablet digital binder experience and hit fitness targets'
  );
  const [reminders, setReminders] = useState<string[]>([
    'Pick up fresh matcha powder & organic oat milk',
    'Drink 500ml water before opening laptop',
    'Evening stretch & screen shutdown at 9:30 PM',
  ]);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [todos, setTodos] = useState<ToDoItem[]>(INITIAL_TODOS);
  const [events, setEvents] = useState<SmartEvent[]>(INITIAL_EVENTS);
  const [mealsHydration, setMealsHydration] = useState<MealHydration>(INITIAL_MEALS_HYDRATION);
  const [moodSleep, setMoodSleep] = useState<MoodSleep>(INITIAL_MOOD_SLEEP);

  // Weekly & Monthly State
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [customSections, setCustomSections] = useState<CustomSection[]>(INITIAL_CUSTOM_SECTIONS);

  // Stickers State
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([
    {
      id: 'st_init_1',
      stickerId: 'st1',
      emojiOrUrl: '⭐ PRIORITY',
      title: 'Top Priority',
      x: 820,
      y: 35,
      scale: 0.95,
      rotation: -2,
      pageSide: 'right',
    },
    {
      id: 'st_init_2',
      stickerId: 'em1',
      emojiOrUrl: '✨',
      title: 'Sparkles',
      x: 390,
      y: 95,
      scale: 1.1,
      rotation: 8,
      pageSide: 'left',
    },
  ]);

  // Modal & Overlay Tools State
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isStickersOpen, setIsStickersOpen] = useState(false);
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleModalHour, setScheduleModalHour] = useState<number>(9);
  const [scheduleModalExistingEvent, setScheduleModalExistingEvent] = useState<SmartEvent | undefined>(undefined);
  const [isUtilitiesOpen, setIsUtilitiesOpen] = useState(false);

  // Sync dark class on document element
  React.useEffect(() => {
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentTheme]);

  // Handlers for Navigation
  const handleSelectPage = (page: ActivePageType) => {
    setActivePage(page);
  };

  const handleSelectMonth = (monthIdx: number) => {
    setCurrentMonth(monthIdx);
    setActivePage('monthly');
  };

  const handleSelectCategory = (category: CategoryType) => {
    setActiveCategory(category);
    setActivePage('category');
  };

  const handleSelectCustomSection = (sectionId: number) => {
    setActiveSectionId(sectionId);
    setActivePage('custom-section');
  };

  // Handlers for To-Dos
  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTodo = (text: string, priority?: 'high' | 'medium' | 'low') => {
    const newTodo: ToDoItem = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority: priority || 'medium',
    };
    setTodos([newTodo, ...todos]);
  };

  const handleRemoveTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // Handlers for Expenses
  const handleAddExpense = (item: string, amount: number, category: string) => {
    const newExp: Expense = {
      id: Date.now().toString(),
      item,
      amount,
      category,
      date: 'Today',
    };
    setExpenses([...expenses, newExp]);
  };

  const handleRemoveExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // Handlers for Reminders
  const handleAddReminder = (text: string) => {
    setReminders([...reminders, text]);
  };

  const handleRemoveReminder = (index: number) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  // Handlers for Habits
  const handleToggleHabitDay = (habitId: string, dayIdx: number) => {
    setHabits(
      habits.map((h) => {
        if (h.id !== habitId) return h;
        const newDays = [...h.days];
        newDays[dayIdx] = !newDays[dayIdx];
        return { ...h, days: newDays };
      })
    );
  };

  const handleAddHabit = (name: string, category = 'Daily') => {
    const newH: Habit = {
      id: Date.now().toString(),
      name,
      days: [false, false, false, false, false, false, false],
      category,
    };
    setHabits([...habits, newH]);
  };

  const handleRemoveHabit = (id: string) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  // Handlers for Schedule Modal
  const handleOpenScheduleModal = (hour: number, existing?: SmartEvent) => {
    setScheduleModalHour(hour);
    setScheduleModalExistingEvent(existing);
    setIsScheduleModalOpen(true);
  };

  const handleSaveScheduledEvent = (ev: SmartEvent) => {
    const exists = events.some((e) => e.id === ev.id);
    if (exists) {
      setEvents(events.map((e) => (e.id === ev.id ? ev : e)));
    } else {
      setEvents([...events, ev]);
    }
  };

  const handleDeleteScheduledEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  // AI Schedule apply
  const handleApplyAISchedule = (newEvents: SmartEvent[], newFocus?: string) => {
    setEvents([...events.filter((e) => !newEvents.some((ne) => ne.hour === e.hour)), ...newEvents]);
    if (newFocus) {
      setTodayFocus(newFocus);
    }
  };

  // Stickers placement
  const handlePlaceSticker = (sticker: StickerDefinition) => {
    const newPlaced: PlacedSticker = {
      id: `placed_${Date.now()}`,
      stickerId: sticker.id,
      emojiOrUrl: sticker.icon,
      title: sticker.title,
      x: 350 + Math.random() * 200,
      y: 120 + Math.random() * 200,
      scale: 1,
      rotation: Math.round((Math.random() - 0.5) * 16),
      pageSide: 'right',
    };
    setPlacedStickers([...placedStickers, newPlaced]);
  };

  const handleUpdatePlacedSticker = (updated: PlacedSticker) => {
    setPlacedStickers(placedStickers.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleRemovePlacedSticker = (id: string) => {
    setPlacedStickers(placedStickers.filter((s) => s.id !== id));
  };

  // Custom sections update
  const handleUpdateCustomSection = (updated: CustomSection) => {
    setCustomSections(customSections.map((s) => (s.id === updated.id ? updated : s)));
  };

  const currentThemeConfig = THEMES[currentTheme];
  const activeSection = customSections.find((s) => s.id === activeSectionId) || customSections[0];

  return (
    <div className="min-h-screen bg-neutral-900 text-stone-800 flex flex-col font-sans overflow-x-hidden">
      {/* Top Application Bar */}
      <HeaderBar
        currentTheme={currentTheme}
        onChangeTheme={setCurrentTheme}
        activePage={activePage}
        onNavigate={handleSelectPage}
        onOpenStickers={() => setIsStickersOpen(true)}
        isDrawingMode={isDrawingMode}
        onToggleDrawingMode={() => setIsDrawingMode(!isDrawingMode)}
        onOpenUtilities={() => setIsUtilitiesOpen(true)}
      />

      {/* Main Binder Viewport */}
      <main className="flex-1 flex flex-col items-center justify-start py-3 px-2 sm:px-4 md:px-6 overflow-y-auto">
        <BinderLayout
          currentTheme={currentTheme}
          activePage={activePage}
          onSelectPage={handleSelectPage}
          currentMonth={currentMonth}
          onSelectMonth={handleSelectMonth}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          customSections={customSections}
          activeSectionId={activeSectionId}
          onSelectSection={handleSelectCustomSection}
        >
          {/* Overlays inside the binder: Drawing Canvas & Draggable Stickers */}
          <PlacedStickersLayer
            stickers={placedStickers}
            onUpdateSticker={handleUpdatePlacedSticker}
            onRemoveSticker={handleRemovePlacedSticker}
          />

          <CanvasAnnotationLayer
            isDrawingMode={isDrawingMode}
            onToggleDrawingMode={() => setIsDrawingMode(!isDrawingMode)}
          />

          {/* PAGE ROUTING */}
          {activePage === 'index' && (
            <IndexPage
              onNavigate={handleSelectPage}
              onSelectCategory={handleSelectCategory}
              onSelectCustomSection={handleSelectCustomSection}
              theme={currentThemeConfig}
              habits={habits}
              todos={todos}
              customSections={customSections}
              todayFocus={todayFocus}
            />
          )}

          {activePage === 'daily' && (
            <DailyPlannerPage
              currentDate={currentDate}
              onChangeDate={setCurrentDate}
              todayFocus={todayFocus}
              onChangeTodayFocus={setTodayFocus}
              reminders={reminders}
              onAddReminder={handleAddReminder}
              onRemoveReminder={handleRemoveReminder}
              expenses={expenses}
              onAddExpense={handleAddExpense}
              onRemoveExpense={handleRemoveExpense}
              todos={todos}
              onToggleTodo={handleToggleTodo}
              onAddTodo={handleAddTodo}
              onRemoveTodo={handleRemoveTodo}
              mealsHydration={mealsHydration}
              onChangeMealsHydration={setMealsHydration}
              moodSleep={moodSleep}
              onChangeMoodSleep={setMoodSleep}
              events={events}
              onOpenScheduleModal={handleOpenScheduleModal}
              onOpenAskAI={() => setIsAskAIOpen(true)}
              theme={currentThemeConfig}
            />
          )}

          {activePage === 'weekly' && (
            <WeeklyPlannerPage
              currentDate={currentDate}
              onChangeDate={setCurrentDate}
              habits={habits}
              onToggleHabitDay={handleToggleHabitDay}
              onAddHabit={handleAddHabit}
              onRemoveHabit={handleRemoveHabit}
              theme={currentThemeConfig}
            />
          )}

          {activePage === 'monthly' && (
            <MonthlyPlannerPage
              currentMonth={currentMonth}
              currentYear={currentDate.getFullYear()}
              onSelectMonth={setCurrentMonth}
              onNavigateToDay={(d) => {
                setCurrentDate(d);
                setActivePage('daily');
              }}
              onOpenBudgetSubpage={() => setActivePage('monthly-budget')}
              onOpenReviewSubpage={() => setActivePage('monthly-review')}
              theme={currentThemeConfig}
            />
          )}

          {activePage === 'monthly-budget' && (
            <MonthlyBudgetPage
              onBackToMonthly={() => setActivePage('monthly')}
              monthName={MONTH_NAMES[currentMonth]}
              theme={currentThemeConfig}
            />
          )}

          {activePage === 'monthly-review' && (
            <MonthlyReviewPage
              onBackToMonthly={() => setActivePage('monthly')}
              monthName={MONTH_NAMES[currentMonth]}
              theme={currentThemeConfig}
            />
          )}

          {(activePage === 'note-line' ||
            activePage === 'note-grid' ||
            activePage === 'note-table' ||
            activePage === 'note-graph' ||
            activePage === 'overview' ||
            activePage === 'quarterly') && (
            <NotesPage type={activePage} theme={currentThemeConfig} />
          )}

          {activePage === 'category' && (
            <CategoryPage category={activeCategory} theme={currentThemeConfig} />
          )}

          {activePage === 'custom-section' && (
            <CustomSectionPage
              section={activeSection}
              onUpdateSection={handleUpdateCustomSection}
              theme={currentThemeConfig}
            />
          )}
        </BinderLayout>
      </main>

      {/* MODALS */}
      <StickersLibraryModal
        isOpen={isStickersOpen}
        onClose={() => setIsStickersOpen(false)}
        onPlaceSticker={handlePlaceSticker}
      />

      <SmartScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        hour={scheduleModalHour}
        existingEvent={scheduleModalExistingEvent}
        onSaveEvent={handleSaveScheduledEvent}
        onDeleteEvent={handleDeleteScheduledEvent}
      />

      <AskAIModal
        isOpen={isAskAIOpen}
        onClose={() => setIsAskAIOpen(false)}
        todayFocus={todayFocus}
        pendingTodos={todos.filter((t) => !t.completed)}
        onApplySchedule={handleApplyAISchedule}
      />

      <UtilityShortcutsModal
        isOpen={isUtilitiesOpen}
        onClose={() => setIsUtilitiesOpen(false)}
        onQuickAddTodo={(text) => handleAddTodo(text, 'high')}
      />
    </div>
  );
}
