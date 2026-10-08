import React from 'react';
import {
  LayoutDashboard,
  Award,
  CalendarDays,
  Building2,
  FileText,
  PhoneCall,
} from 'lucide-react';

export type UserNavTab =
  | 'beranda'
  | 'pengurus'
  | 'kegiatan'
  | 'profil'
  | 'tatatertib'
  | 'darurat';

interface UserNavbarProps {
  activeTab: UserNavTab;
  setActiveTab: (tab: UserNavTab) => void;
}

export const UserNavbar: React.FC<UserNavbarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navItems = [
    {
      id: 'beranda' as UserNavTab,
      label: 'Beranda',
      icon: LayoutDashboard,
      color: 'from-emerald-500 to-teal-600',
      activeText: 'text-emerald-700',
      iconColor: 'text-emerald-600',
    },
    {
      id: 'pengurus' as UserNavTab,
      label: 'Pengurus RT',
      icon: Award,
      color: 'from-amber-500 to-orange-600',
      activeText: 'text-amber-700',
      iconColor: 'text-amber-600',
    },
    {
      id: 'kegiatan' as UserNavTab,
      label: 'Kegiatan Lingkungan',
      icon: CalendarDays,
      color: 'from-violet-500 to-purple-600',
      activeText: 'text-violet-700',
      iconColor: 'text-violet-600',
    },
    {
      id: 'profil' as UserNavTab,
      label: 'Profil Wilayah',
      icon: Building2,
      color: 'from-blue-500 to-indigo-600',
      activeText: 'text-blue-700',
      iconColor: 'text-blue-600',
    },
    {
      id: 'tatatertib' as UserNavTab,
      label: 'Tata Tertib',
      icon: FileText,
      color: 'from-teal-600 to-emerald-600',
      activeText: 'text-teal-700',
      iconColor: 'text-teal-600',
    },
    {
      id: 'darurat' as UserNavTab,
      label: 'Nomor Darurat',
      icon: PhoneCall,
      color: 'from-rose-500 to-red-600',
      activeText: 'text-rose-700',
      iconColor: 'text-rose-600',
    },
  ];

  return (
    <nav className="bg-white/95 border-b border-emerald-100/90 sticky top-0 z-40 shadow-xs backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none touch-pan-x">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer min-h-[42px] shrink-0 ${
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-md shadow-emerald-900/10 scale-102`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? 'text-white scale-110' : item.iconColor
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
