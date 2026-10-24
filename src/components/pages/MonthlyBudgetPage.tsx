import React, { useState } from 'react';
import { Plus, Trash2, DollarSign, ArrowLeft, PiggyBank, PieChart } from 'lucide-react';
import { BudgetItem, calculateBudgetSummary } from '../../utils/planner-logic';
import { ThemeConfig } from '../../styles/themes';

interface MonthlyBudgetPageProps {
  onBackToMonthly: () => void;
  monthName: string;
  theme: ThemeConfig;
}

const INITIAL_BUDGET_ITEMS: BudgetItem[] = [
  { id: 'b1', category: 'Primary Salary / Income', budgeted: 5400, actual: 5400, type: 'income' },
  { id: 'b2', category: 'Freelance & Side Projects', budgeted: 800, actual: 950, type: 'income' },
  { id: 'b3', category: 'Apartment Rent / Mortgage', budgeted: 1850, actual: 1850, type: 'fixed' },
  { id: 'b4', category: 'High-speed Fiber & Mobile', budgeted: 120, actual: 115, type: 'fixed' },
  { id: 'b5', category: 'Health & Dental Insurance', budgeted: 280, actual: 280, type: 'fixed' },
  { id: 'b6', category: 'Gym & Studio Membership', budgeted: 140, actual: 140, type: 'fixed' },
  { id: 'b7', category: 'Organic Groceries & Market', budgeted: 650, actual: 610, type: 'variable' },
  { id: 'b8', category: 'Dining Out & Specialty Coffee', budgeted: 300, actual: 345, type: 'variable' },
  { id: 'b9', category: 'Transit & Rideshare', budgeted: 150, actual: 130, type: 'variable' },
  { id: 'b10', category: 'Personal Care & Books', budgeted: 200, actual: 180, type: 'variable' },
];

export const MonthlyBudgetPage: React.FC<MonthlyBudgetPageProps> = ({
  onBackToMonthly,
  monthName,
  theme,
}) => {
  const [items, setItems] = useState<BudgetItem[]>(INITIAL_BUDGET_ITEMS);
  const [newItemName, setNewItemName] = useState('');
  const [newBudgeted, setNewBudgeted] = useState('');
  const [newActual, setNewActual] = useState('');
  const [newType, setNewType] = useState<'income' | 'fixed' | 'variable'>('variable');

  const summary = calculateBudgetSummary(items);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || isNaN(Number(newBudgeted))) return;

    const newItem: BudgetItem = {
      id: Date.now().toString(),
      category: newItemName.trim(),
      budgeted: Number(newBudgeted),
      actual: Number(newActual) || Number(newBudgeted),
      type: newType,
    };

    setItems([...items, newItem]);
    setNewItemName('');
    setNewBudgeted('');
    setNewActual('');
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const incomeItems = items.filter((i) => i.type === 'income');
  const fixedItems = items.filter((i) => i.type === 'fixed');
  const variableItems = items.filter((i) => i.type === 'variable');

  return (
    <div className="w-full h-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-stone-200/60 text-stone-800 text-xs">
      {/* LEFT PAGE: Budget Summary KPI & Fixed/Variable Breakdown */}
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
              {monthName} Monthly Budget
            </h2>
          </div>
          <span className="font-semibold text-stone-500 uppercase tracking-wider text-[10px]">
            Financial Blueprint
          </span>
        </div>

        {/* Financial KPI Summary Cards */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">Total Income</span>
            <span className="text-base font-bold font-tabular text-emerald-700">
              ${summary.totalIncome.toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
            <span className="text-[10px] uppercase font-bold text-rose-800 block">Actual Expenses</span>
            <span className="text-base font-bold font-tabular text-rose-700">
              ${(summary.totalFixedActual + summary.totalVariableActual).toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
            <span className="text-[10px] uppercase font-bold text-sky-800 block">Net Savings</span>
            <span className="text-base font-bold font-tabular text-sky-700">
              ${summary.actualSavings.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Savings Rate Bar */}
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
          <div className="flex items-center justify-between mb-1.5 text-[11px]">
            <span className="font-semibold text-stone-600 flex items-center gap-1.5">
              <PiggyBank className="w-3.5 h-3.5 text-amber-600" />
              Savings Rate & Cash Flow Health
            </span>
            <span className="font-bold font-tabular text-emerald-700">
              {summary.totalIncome > 0
                ? Math.round((summary.actualSavings / summary.totalIncome) * 100)
                : 0}
              % Saved
            </span>
          </div>
          <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-500 transition-all duration-500"
              style={{
                width: `${Math.max(
                  0,
                  Math.min(
                    100,
                    summary.totalIncome > 0
                      ? (summary.actualSavings / summary.totalIncome) * 100
                      : 0
                  )
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Income Items Table */}
        <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-xs">
          <div className="px-3 py-1.5 bg-emerald-50/80 border-b border-emerald-100 flex items-center justify-between">
            <span className="font-bold text-[11px] text-emerald-900 uppercase">1. Inflow & Income</span>
            <span className="font-bold font-tabular text-emerald-800 text-[11px]">
              ${summary.totalIncome.toLocaleString()}
            </span>
          </div>
          <div className="divide-y divide-stone-100 max-h-36 overflow-y-auto">
            {incomeItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-3 py-1.5 hover:bg-stone-50 group">
                <span className="font-medium text-stone-800">{item.category}</span>
                <div className="flex items-center gap-3">
                  <span className="font-tabular font-bold text-stone-700">${item.actual.toLocaleString()}</span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PAGE: Fixed & Variable Expenses Detailed List & Add Row */}
      <div className="flex-1 p-5 md:p-7 flex flex-col overflow-y-auto space-y-4">
        {/* Fixed Expenses */}
        <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-xs">
          <div className="px-3 py-1.5 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
            <span className="font-bold text-[11px] text-stone-700 uppercase">2. Fixed Expenses</span>
            <span className="font-bold font-tabular text-stone-700 text-[11px]">
              ${summary.totalFixedActual.toLocaleString()}
            </span>
          </div>
          <div className="divide-y divide-stone-100 max-h-36 overflow-y-auto">
            {fixedItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-3 py-1.5 hover:bg-stone-50 group">
                <span className="font-medium text-stone-800">{item.category}</span>
                <div className="flex items-center gap-3">
                  <span className="font-tabular font-bold text-stone-700">${item.actual.toLocaleString()}</span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Variable Expenses */}
        <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-xs flex-1 flex flex-col">
          <div className="px-3 py-1.5 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
            <span className="font-bold text-[11px] text-stone-700 uppercase">3. Variable Expenses</span>
            <span className="font-bold font-tabular text-stone-700 text-[11px]">
              ${summary.totalVariableActual.toLocaleString()}
            </span>
          </div>
          <div className="divide-y divide-stone-100 flex-1 overflow-y-auto">
            {variableItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-3 py-1.5 hover:bg-stone-50 group">
                <span className="font-medium text-stone-800">{item.category}</span>
                <div className="flex items-center gap-3">
                  <span className="font-tabular text-stone-500 text-[10px]">Plan: ${item.budgeted}</span>
                  <span className="font-tabular font-bold text-stone-800">${item.actual.toLocaleString()}</span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Budget Entry Form */}
        <form onSubmit={handleAddItem} className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
          <span className="font-bold text-[11px] text-stone-700 uppercase block">
            Add New Budget Item
          </span>
          <div className="grid grid-cols-6 gap-2">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Category name"
              className="col-span-3 bg-white border border-stone-200 rounded px-2 py-1 text-xs"
            />
            <input
              type="number"
              value={newBudgeted}
              onChange={(e) => setNewBudgeted(e.target.value)}
              placeholder="Plan $"
              className="col-span-1 bg-white border border-stone-200 rounded px-1.5 py-1 text-xs font-tabular"
            />
            <input
              type="number"
              value={newActual}
              onChange={(e) => setNewActual(e.target.value)}
              placeholder="Act $"
              className="col-span-1 bg-white border border-stone-200 rounded px-1.5 py-1 text-xs font-tabular"
            />
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as any)}
              className="col-span-1 bg-white border border-stone-200 rounded px-1 py-1 text-[11px]"
            >
              <option value="variable">Var</option>
              <option value="fixed">Fixed</option>
              <option value="income">Income</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-1 bg-stone-800 text-white rounded text-xs font-semibold hover:bg-stone-700 transition"
          >
            Add Item to Budget
          </button>
        </form>
      </div>
    </div>
  );
};
