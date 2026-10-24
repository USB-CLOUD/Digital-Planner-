import React from 'react';
import { MONTH_NAMES } from '../../constants/initialData';
import { ThemeConfig } from '../../styles/themes';

interface RightTabsProps {
  currentMonth: number; // 0 to 11
  onSelectMonth: (monthIndex: number) => void;
  theme: ThemeConfig;
  activeViewIsMonthly: boolean;
}

export const RightTabs: React.FC<RightTabsProps> = ({
  currentMonth,
  onSelectMonth,
  theme,
  activeViewIsMonthly,
}) => {
  return (
    <div className="absolute top-8 bottom-8 -right-8.5 w-8 flex flex-col justify-between py-1 z-10 pointer-events-auto">
      {MONTH_NAMES.map((month, idx) => {
        const isSelected = currentMonth === idx && activeViewIsMonthly;
        const style = theme.tabStyles.right[idx % theme.tabStyles.right.length];

        return (
          <button
            key={month}
            onClick={() => onSelectMonth(idx)}
            title={`View ${month} Planner`}
            className={`
              group relative flex items-center justify-center h-7 text-[11px] font-bold rounded-r-md transition-all duration-150 transform select-none shadow-xs
              ${isSelected
                ? `${style.activeBg} ${style.activeText} translate-x-1.5 shadow-md z-20 w-10`
                : `${style.bg} ${style.text} hover:translate-x-1 opacity-95 w-8`}
            `}
            style={{
              clipPath: 'polygon(0% 0%, 85% 10%, 100% 50%, 85% 90%, 0% 100%)',
            }}
          >
            <span className="text-[10px] tracking-tight uppercase font-extrabold pr-0.5">
              {month}
            </span>
          </button>
        );
      })}
    </div>
  );
};
