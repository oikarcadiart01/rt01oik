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

export type AdminNavTab =
  | 'beranda'
  | 'pengumuman'
  | 'warga'
  | 'keuangan'
  | 'pengurus'
  | 'kegiatan'
  | 'pengaduan'
  | 'administrasi'
  | 'profil'
  | 'darurat'
  | 'tatatertib';

interface AdminNavbarProps {
  activeTab: AdminNavTab;
  setActiveTab: (tab: AdminNavTab) => void;
  complaintCount: number;
  letterCount?: number;
}

interface AdminNavItemDef {
  id: AdminNavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  activeText: string;
  iconColor: string;
  badge?: number;
  isAdminBadge?: boolean;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({
  activeTab,
  setActiveTab,
  complaintCount,
  letterCount = 0,
}) => {
  const navItems: AdminNavItemDef[] = [
    {
      id: 'beranda',
      label: 'Beranda',
      icon: LayoutDashboard,
      color: 'from-emerald-500 to-teal-600',
      activeText: 'text-emerald-700',
      iconColor: 'text-emerald-600',
    },
    {
      id: 'warga',
      label: 'Data Warga',
      icon: Users,
      color: 'from-sky-500 to-blue-600',
      activeText: 'text-sky-700',
      iconColor: 'text-sky-600',
      isAdminBadge: true,
    },
    {
      id: 'keuangan',
      label: 'Keuangan',
      icon: Wallet,
      color: 'from-emerald-600 to-green-600',
      activeText: 'text-emerald-700',
      iconColor: 'text-emerald-600',
      isAdminBadge: true,
    },
    {
      id: 'pengurus',
      label: 'Pengurus RT',
      icon: Award,
      color: 'from-amber-500 to-orange-600',
      activeText: 'text-amber-700',
      iconColor: 'text-amber-600',
    },
    {
      id: 'kegiatan',
      label: 'Kegiatan Lingkungan',
      icon: CalendarDays,
      color: 'from-violet-500 to-purple-600',
      activeText: 'text-violet-700',
      iconColor: 'text-violet-600',
    },
    {
      id: 'pengaduan',
      label: 'Pengaduan Warga',
      icon: MessageSquareWarning,
      color: 'from-rose-500 to-pink-600',
      activeText: 'text-rose-700',
      iconColor: 'text-rose-600',
      badge: complaintCount,
      isAdminBadge: true,
    },
    {
      id: 'administrasi',
      label: 'Surat & Administrasi RT',
      icon: FileText,
      color: 'from-teal-500 to-cyan-600',
      activeText: 'text-teal-700',
      iconColor: 'text-teal-600',
      badge: letterCount > 0 ? letterCount : undefined,
      isAdminBadge: true,
    },
    {
      id: 'profil',
      label: 'Profil Wilayah',
      icon: Building2,
      color: 'from-blue-500 to-indigo-600',
      activeText: 'text-blue-700',
      iconColor: 'text-blue-600',
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

                {item.isAdminBadge && (
                  <span
                    className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded-md ${
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
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white text-rose-600 shadow-2xs'
                        : 'bg-rose-500 text-white shadow-2xs'
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
