import React from 'react';
import { CATEGORY_NAMES } from '../../constants/initialData';
import { CategoryType, ActivePageType } from '../../types/planner';
import { ThemeConfig } from '../../styles/themes';

interface BottomTabsProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  activePage: ActivePageType;
  theme: ThemeConfig;
}

export const BottomTabs: React.FC<BottomTabsProps> = ({
  activeCategory,
  onSelectCategory,
  activePage,
  theme,
}) => {
  return (
    <div className="flex items-start justify-center gap-1.5 px-6 pb-2 overflow-x-auto max-w-full z-10 scrollbar-none">
      {CATEGORY_NAMES.map((cat, idx) => {
        const isSelected = activePage === 'category' && activeCategory === cat;
        const style = theme.tabStyles.bottom[idx % theme.tabStyles.bottom.length];

        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            title={`Category: ${cat}`}
            className={`
              relative px-3 py-1 text-[11px] font-semibold rounded-b-lg transition-all duration-150 transform select-none whitespace-nowrap shadow-xs
              ${isSelected
                ? `${style.activeBg} ${style.activeText} translate-y-1 shadow-md z-20`
                : `${style.bg} ${style.text} hover:translate-y-0.5 opacity-90`}
            `}
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 92% 100%, 8% 100%)',
              minWidth: '64px',
            }}
          >
            <span>{cat}</span>
          </button>
        );
      })}
    </div>
  );
};
