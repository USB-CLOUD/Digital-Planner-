import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateHourlySlots,
  calculateHabitStats,
  calculateExpensesTotal,
  calculateBudgetSummary,
  getWeekDays,
  getMonthGrid,
  type HabitItem,
  type BudgetItem,
  type ExpenseItem,
} from './planner-logic';

test('generateHourlySlots creates correct sequence from 6 AM to 10 PM', () => {
  const slots = generateHourlySlots(6, 22);
  assert.equal(slots.length, 17);
  assert.equal(slots[0].hour, 6);
  assert.equal(slots[0].label, '6:00 AM');
  assert.equal(slots[6].hour, 12);
  assert.equal(slots[6].label, '12:00 PM');
  assert.equal(slots[slots.length - 1].hour, 22);
  assert.equal(slots[slots.length - 1].label, '10:00 PM');
});

test('calculateHabitStats calculates completion percentage and perfect days', () => {
  const habits: HabitItem[] = [
    { id: '1', name: 'Morning Meditation', days: [true, true, true, true, true, true, true] },
    { id: '2', name: 'Drink 2L Water', days: [true, false, true, false, true, false, false] },
  ];

  const stats = calculateHabitStats(habits);
  // Total possible = 14. Completed = 7 + 3 = 10. Percentage = 10 / 14 = 71.4% -> 71%
  assert.equal(stats.totalPossible, 14);
  assert.equal(stats.completedCount, 10);
  assert.equal(stats.overallPercentage, 71);
  // Perfect days where both habits are true: days 0, 2, 4 = 3 days
  assert.equal(stats.perfectDays, 3);
});

test('calculateExpensesTotal calculates accurate sum with rounding', () => {
  const expenses: ExpenseItem[] = [
    { id: '1', item: 'Morning Matcha', amount: 5.75, category: 'Food' },
    { id: '2', item: 'Stationery Stickers', amount: 12.5, category: 'Personal' },
    { id: '3', item: 'Bus Fare', amount: 2.75, category: 'Transit' },
  ];

  const total = calculateExpensesTotal(expenses);
  assert.equal(total, 21.0);
});

test('calculateBudgetSummary calculates income, expenses, and savings', () => {
  const items: BudgetItem[] = [
    { id: '1', category: 'Salary', budgeted: 5000, actual: 5200, type: 'income' },
    { id: '2', category: 'Rent', budgeted: 1800, actual: 1800, type: 'fixed' },
    { id: '3', category: 'Groceries', budgeted: 600, actual: 650, type: 'variable' },
  ];

  const summary = calculateBudgetSummary(items);
  assert.equal(summary.totalIncome, 5200);
  assert.equal(summary.totalFixedActual, 1800);
  assert.equal(summary.totalVariableActual, 650);
  assert.equal(summary.netSavings, 5200 - (1800 + 600)); // 2800
  assert.equal(summary.actualSavings, 5200 - (1800 + 650)); // 2750
});

test('getWeekDays supports both Monday and Sunday starts', () => {
  const refWednesday = new Date(2026, 9, 21); // Oct 21, 2026 is a Wednesday

  const monWeek = getWeekDays(refWednesday, true);
  assert.equal(monWeek.length, 7);
  assert.equal(monWeek[0].dayName, 'Mon');
  assert.equal(monWeek[2].dayName, 'Wed');
  assert.equal(monWeek[2].isCurrentDay, true);

  const sunWeek = getWeekDays(refWednesday, false);
  assert.equal(sunWeek.length, 7);
  assert.equal(sunWeek[0].dayName, 'Sun');
  assert.equal(sunWeek[3].dayName, 'Wed');
  assert.equal(sunWeek[3].isCurrentDay, true);
});

test('getMonthGrid returns full weeks covering all days of the month', () => {
  const grid = getMonthGrid(2026, 9); // October 2026 has 31 days
  assert.equal(grid.length % 7, 0);
  const currentMonthDays = grid.filter(d => d.isCurrentMonth);
  assert.equal(currentMonthDays.length, 31);
});
