import React from 'react';
import {
  LayoutDashboard,
  Users,
  Award,
  Wallet,
  CalendarDays,
  MessageSquareWarning,
  Building2,
  FileText,
} from 'lucide-react';

export type NavTab =
  | 'beranda'
  | 'warga'
  | 'pengurus'
  | 'keuangan'
  | 'kegiatan'
  | 'pengaduan'
  | 'profil'
  | 'administrasi';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  complaintCount: number;
  isAdminMode?: boolean;
  letterCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  complaintCount,
  isAdminMode = false,
  letterCount = 0,
}) => {
  const navItems = [
    {
      id: 'beranda' as NavTab,
      label: 'Beranda',
      icon: LayoutDashboard,
    },
    {
      id: 'warga' as NavTab,
      label: 'Data Warga',
      icon: Users,
    },
    {
      id: 'pengurus' as NavTab,
      label: 'Pengurus RT',
      icon: Award,
    },
    {
      id: 'keuangan' as NavTab,
      label: 'Keuangan & Grafik',
      icon: Wallet,
    },
    {
      id: 'kegiatan' as NavTab,
      label: 'Kegiatan Lingkungan',
      icon: CalendarDays,
    },
    {
      id: 'pengaduan' as NavTab,
      label: 'Pengaduan Warga',
      icon: MessageSquareWarning,
      badge: complaintCount,
    },
    {
      id: 'profil' as NavTab,
      label: 'Profil Wilayah',
      icon: Building2,
    },
    ...(isAdminMode
      ? [
          {
            id: 'administrasi' as NavTab,
            label: 'Surat & Administrasi RT',
            icon: FileText,
            badge: letterCount > 0 ? letterCount : undefined,
            isAdminBadge: true,
          },
        ]
      : []),
  ];

  return (
    <nav className="bg-white/95 border-b border-emerald-100/80 sticky top-0 z-40 shadow-xs backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 relative cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm shadow-emerald-600/20'
                    : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-600'}`} />
                <span>{item.label}</span>
                {item.isAdminBadge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-md font-extrabold uppercase ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    Admin
                  </span>
                )}
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isActive
                        ? 'bg-rose-500 text-white'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
