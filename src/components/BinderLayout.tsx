import React from 'react';
import { ActivePageType, CategoryType, CustomSection, ThemeMode } from '../types/planner';
import { THEMES } from '../styles/themes';
import { SpiralRings } from './SpiralRings';
import { TopTabs } from './tabs/TopTabs';
import { RightTabs } from './tabs/RightTabs';
import { BottomTabs } from './tabs/BottomTabs';
import { LeftTabs } from './tabs/LeftTabs';

interface BinderLayoutProps {
  currentTheme: ThemeMode;
  activePage: ActivePageType;
  onSelectPage: (page: ActivePageType) => void;
  currentMonth: number;
  onSelectMonth: (month: number) => void;
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  customSections: CustomSection[];
  activeSectionId: number;
  onSelectSection: (sectionId: number) => void;
  children: React.ReactNode;
}

export const BinderLayout: React.FC<BinderLayoutProps> = ({
  currentTheme,
  activePage,
  onSelectPage,
  currentMonth,
  onSelectMonth,
  activeCategory,
  onSelectCategory,
  customSections,
  activeSectionId,
  onSelectSection,
  children,
}) => {
  const theme = THEMES[currentTheme];
  const activeViewIsMonthly = activePage === 'monthly' || activePage === 'monthly-budget' || activePage === 'monthly-review';

  return (
    <div className="relative w-full max-w-6xl mx-auto my-auto px-4 py-2 flex flex-col items-center justify-center select-none">
      {/* TOP TABS ROW */}
      <TopTabs
        activePage={activePage}
        onSelectPage={onSelectPage}
        theme={theme}
      />

      {/* MAIN PHYSICAL BINDER CONTAINER */}
      <div className="relative w-full">
        {/* LEFT CUSTOM TABS 1-10 */}
        <LeftTabs
          customSections={customSections}
          activeSectionId={activeSectionId}
          onSelectSection={onSelectSection}
          activePage={activePage}
          theme={theme}
        />

        {/* RIGHT MONTH TABS (Jan-Dec) */}
        <RightTabs
          currentMonth={currentMonth}
          onSelectMonth={onSelectMonth}
          theme={theme}
          activeViewIsMonthly={activeViewIsMonthly}
        />

        {/* BINDER COVER BACKING (Leather / Linen Texture) */}
        <div
          className={`relative w-full rounded-3xl p-2.5 sm:p-3.5 md:p-4 shadow-2xl border-4 transition-colors duration-300 ${theme.coverBg} ${theme.coverBorder}`}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Inner perimeter stitching effect */}
          <div className={`absolute inset-2 rounded-2xl border-2 pointer-events-none ${theme.coverStitch}`} />

          {/* TWO-PAGE OPEN NOTEBOOK SPREAD */}
          <div
            className={`relative w-full rounded-2xl overflow-hidden shadow-xl border transition-colors duration-300 min-h-[540px] md:min-h-[600px] flex flex-col md:flex-row ${theme.paperBg} ${theme.paperBorder}`}
            style={{
              boxShadow:
                'inset 0 0 40px rgba(0,0,0,0.06), 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
            }}
          >
            {/* Skeuomorphic Center Spine Gutter Shadows */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-12 w-12 binder-gutter-shadow-right pointer-events-none z-10 hidden md:block" />
            <div className="absolute top-0 bottom-0 left-1/2 w-12 binder-gutter-shadow pointer-events-none z-10 hidden md:block" />

            {/* Central 3D Spiral Metallic Rings */}
            <SpiralRings theme={theme} count={19} />

            {/* Active Page Content Mounted Inside Spread */}
            <div className="relative w-full h-full flex-1 flex flex-col z-0">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CATEGORIES TABS ROW */}
      <BottomTabs
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
        activePage={activePage}
        theme={theme}
      />
    </div>
  );
};
