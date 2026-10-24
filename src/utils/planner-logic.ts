/**
 * Pure business logic and calculation helpers for the All-in-One Digital Planner
 */

export interface HabitItem {
  id: string;
  name: string;
  days: boolean[]; // 7 days (index 0 to 6)
  targetDays?: number;
}

export interface ExpenseItem {
  id: string;
  item: string;
  amount: number;
  category: string;
  date?: string;
}

export interface ScheduleEvent {
  id: string;
  hour: number; // 6 to 22 (6 AM to 10 PM)
  timeStr: string;
  title: string;
  type: 'event' | 'reminder';
  category?: 'work' | 'personal' | 'wellness' | 'meal' | 'break';
  completed?: boolean;
}

export interface BudgetItem {
  id: string;
  category: string;
  budgeted: number;
  actual: number;
  type: 'income' | 'fixed' | 'variable';
}

/**
 * Generate standard hourly schedule slots from startHour to endHour
 */
export function generateHourlySlots(startHour = 6, endHour = 22): Array<{ hour: number; label: string }> {
  const slots: Array<{ hour: number; label: string }> = [];
  for (let h = startHour; h <= endHour; h++) {
    const period = h < 12 ? 'AM' : 'PM';
    const displayHour = h % 12 === 0 ? 12 : h % 12;
    const label = `${displayHour}:00 ${period}`;
    slots.push({ hour: h, label });
  }
  return slots;
}

/**
 * Calculate habit completion stats
 */
export function calculateHabitStats(habits: HabitItem[]) {
  if (!habits || habits.length === 0) {
    return { overallPercentage: 0, completedCount: 0, totalPossible: 0, perfectDays: 0 };
  }

  let completedCount = 0;
  const totalPossible = habits.length * 7;

  // Day counts for checking full adherence
  const dayCompletionCounts = [0, 0, 0, 0, 0, 0, 0];

  for (const habit of habits) {
    for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
      if (habit.days[dayIdx]) {
        completedCount++;
        dayCompletionCounts[dayIdx]++;
      }
    }
  }

  const perfectDays = dayCompletionCounts.filter(count => count === habits.length).length;
  const overallPercentage = totalPossible > 0 ? Math.round((completedCount / totalPossible) * 100) : 0;

  return {
    overallPercentage,
    completedCount,
    totalPossible,
    perfectDays,
  };
}

/**
 * Calculate expenses total
 */
export function calculateExpensesTotal(expenses: ExpenseItem[]): number {
  if (!expenses || expenses.length === 0) return 0;
  const sum = expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  return Math.round(sum * 100) / 100;
}

/**
 * Calculate monthly budget summary
 */
export function calculateBudgetSummary(items: BudgetItem[]) {
  const summary = {
    totalIncome: 0,
    totalFixedBudgeted: 0,
    totalFixedActual: 0,
    totalVariableBudgeted: 0,
    totalVariableActual: 0,
    netSavings: 0,
    actualSavings: 0,
  };

  for (const item of items) {
    const budgeted = Number(item.budgeted) || 0;
    const actual = Number(item.actual) || 0;

    if (item.type === 'income') {
      summary.totalIncome += actual || budgeted;
    } else if (item.type === 'fixed') {
      summary.totalFixedBudgeted += budgeted;
      summary.totalFixedActual += actual;
    } else if (item.type === 'variable') {
      summary.totalVariableBudgeted += budgeted;
      summary.totalVariableActual += actual;
    }
  }

  summary.netSavings = summary.totalIncome - (summary.totalFixedBudgeted + summary.totalVariableBudgeted);
  summary.actualSavings = summary.totalIncome - (summary.totalFixedActual + summary.totalVariableActual);

  return summary;
}

/**
 * Generate weekly calendar days supporting Monday or Sunday start
 */
export function getWeekDays(referenceDate: Date, startOnMonday = true): Array<{ date: Date; dayName: string; dayNumber: number; isCurrentDay: boolean }> {
  const curr = new Date(referenceDate);
  const dayOfWeek = curr.getDay(); // 0 is Sunday, 1 is Monday...

  let diffToStart = 0;
  if (startOnMonday) {
    // If Sunday (0), diff is -6 to get previous Monday; if Monday (1), diff is 0
    diffToStart = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  } else {
    // Start on Sunday: diff is -dayOfWeek
    diffToStart = -dayOfWeek;
  }

  const startDate = new Date(curr);
  startDate.setDate(curr.getDate() + diffToStart);

  const days: Array<{ date: Date; dayName: string; dayNumber: number; isCurrentDay: boolean }> = [];
  const dayNamesMon = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayNamesSun = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const activeNames = startOnMonday ? dayNamesMon : dayNamesSun;

  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);

    const isCurrentDay =
      d.getDate() === referenceDate.getDate() &&
      d.getMonth() === referenceDate.getMonth() &&
      d.getFullYear() === referenceDate.getFullYear();

    days.push({
      date: d,
      dayName: activeNames[i],
      dayNumber: d.getDate(),
      isCurrentDay,
    });
  }

  return days;
}

/**
 * Generate monthly grid days including trailing and leading buffer days
 */
export function getMonthGrid(year: number, monthIndex: number): Array<{ dayNumber: number; isCurrentMonth: boolean; date: Date }> {
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);

  const totalDays = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay(); // 0 (Sun) to 6 (Sat)

  const days: Array<{ dayNumber: number; isCurrentMonth: boolean; date: Date }> = [];

  // Previous month filler
  const prevMonthLastDay = new Date(year, monthIndex, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const dayNum = prevMonthLastDay - i;
    days.push({
      dayNumber: dayNum,
      isCurrentMonth: false,
      date: new Date(year, monthIndex - 1, dayNum),
    });
  }

  // Current month
  for (let d = 1; d <= totalDays; d++) {
    days.push({
      dayNumber: d,
      isCurrentMonth: true,
      date: new Date(year, monthIndex, d),
    });
  }

  // Next month filler to complete 35 or 42 cells
  const remaining = (7 - (days.length % 7)) % 7;
  for (let nextDay = 1; nextDay <= remaining; nextDay++) {
    days.push({
      dayNumber: nextDay,
      isCurrentMonth: false,
      date: new Date(year, monthIndex + 1, nextDay),
    });
  }

  return days;
}
