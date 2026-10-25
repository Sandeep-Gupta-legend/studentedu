import React from 'react';
import { ActiveTab } from '../types';
import { Download } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenAddModal: () => void;
  onDownloadZip: () => void;
  isDownloading: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenAddModal,
  onDownloadZip,
  isDownloading
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (1 Primary Action) */}
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Single text element wordmark with crest */}
          <div className="flex items-center gap-3 shrink-0">
            <img
              src="/src/assets/images/university_crest_1792951474979.jpg"
              alt="EduManage University Crest"
              className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-xs"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback container if needed
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <button
              onClick={() => onTabChange('dashboard')}
              className="text-left cursor-pointer focus-visible:outline-hidden"
            >
              <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap block">
                EduManage SMS
              </span>
            </button>
          </div>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onTabChange('students')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                activeTab === 'students'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Students
            </button>
            <button
              onClick={onOpenAddModal}
              className="whitespace-nowrap shrink-0 text-slate-600 hover:text-slate-900 transition-colors py-1 cursor-pointer"
            >
              + Add Student
            </button>
            <button
              onClick={() => onTabChange('code-explorer')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                activeTab === 'code-explorer'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Java Source Files
            </button>
            <button
              onClick={() => onTabChange('viva-guide')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                activeTab === 'viva-guide'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Viva Voce Guide
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onDownloadZip}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? 'Packaging ZIP...' : 'Download Project ZIP'}</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer / Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 text-xs font-medium text-slate-600">
          <button
            onClick={() => onTabChange('dashboard')}
            className={`py-1 ${activeTab === 'dashboard' ? 'text-blue-600 font-semibold' : ''}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onTabChange('students')}
            className={`py-1 ${activeTab === 'students' ? 'text-blue-600 font-semibold' : ''}`}
          >
            Students
          </button>
          <button
            onClick={onOpenAddModal}
            className="py-1 text-blue-600"
          >
            + Add
          </button>
          <button
            onClick={() => onTabChange('code-explorer')}
            className={`py-1 ${activeTab === 'code-explorer' ? 'text-blue-600 font-semibold' : ''}`}
          >
            Java Code
          </button>
          <button
            onClick={() => onTabChange('viva-guide')}
            className={`py-1 ${activeTab === 'viva-guide' ? 'text-blue-600 font-semibold' : ''}`}
          >
            Viva Q&A
          </button>
        </div>
      </div>
    </header>
  );
};
