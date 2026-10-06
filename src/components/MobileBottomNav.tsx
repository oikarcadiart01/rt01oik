import React, { useState } from 'react';
import { NavTab } from './Navbar';
import {
  LayoutDashboard,
  Users,
  Wallet,
  MessageSquareWarning,
  Menu,
  X,
  Award,
  CalendarDays,
  Building2,
  FileText,
  Search,
  PhoneCall,
  ShieldCheck,
  KeyRound,
  LogOut,
} from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  complaintCount: number;
  letterCount?: number;
  isAdminMode: boolean;
  onOpenCekIuran: () => void;
  onOpenEmergency: () => void;
  onOpenAdminLogin: () => void;
  onLogoutAdmin: () => void;
}

interface MobileTabDef {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  activeColor: string;
  activeBg: string;
  badge?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  complaintCount,
  letterCount = 0,
  isAdminMode,
  onOpenCekIuran,
  onOpenEmergency,
  onOpenAdminLogin,
  onLogoutAdmin,
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const userTabs: MobileTabDef[] = [
    {
      id: 'beranda' as NavTab,
      label: 'Beranda',
      icon: LayoutDashboard,
      activeColor: 'text-emerald-600',
      activeBg: 'bg-emerald-50',
    },
    {
      id: 'pengurus' as NavTab,
      label: 'Pengurus',
      icon: Award,
      activeColor: 'text-amber-600',
      activeBg: 'bg-amber-50',
    },
    {
      id: 'kegiatan' as NavTab,
      label: 'Kegiatan',
      icon: CalendarDays,
      activeColor: 'text-violet-600',
      activeBg: 'bg-violet-50',
    },
    {
      id: 'profil' as NavTab,
      label: 'Profil',
      icon: Building2,
      activeColor: 'text-blue-600',
      activeBg: 'bg-blue-50',
    },
  ];

  const adminTabs: MobileTabDef[] = [
    {
      id: 'beranda' as NavTab,
      label: 'Beranda',
      icon: LayoutDashboard,
      activeColor: 'text-emerald-600',
      activeBg: 'bg-emerald-50',
    },
    {
      id: 'warga' as NavTab,
      label: 'Warga',
      icon: Users,
      activeColor: 'text-sky-600',
      activeBg: 'bg-sky-50',
    },
    {
      id: 'keuangan' as NavTab,
      label: 'Keuangan',
      icon: Wallet,
      activeColor: 'text-emerald-700',
      activeBg: 'bg-emerald-50',
    },
    {
      id: 'pengaduan' as NavTab,
      label: 'Aduan',
      icon: MessageSquareWarning,
      activeColor: 'text-rose-600',
      activeBg: 'bg-rose-50',
      badge: complaintCount,
    },
  ];

  const mainTabs = isAdminMode ? adminTabs : userTabs;

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    setIsMoreMenuOpen(false);
  };

  return (
    <>
      {/* Slide-up Bottom Drawer for "Lainnya" on Mobile */}
      {isMoreMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMoreMenuOpen(false)}
        >
          <div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-5 shadow-2xl border-t border-slate-200 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">
                Menu Lengkap Warga Arcadia
              </h3>
              <button
                onClick={() => setIsMoreMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-4">
              <button
                onClick={() => handleSelectTab('kegiatan')}
                className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  activeTab === 'kegiatan'
                    ? 'bg-violet-50 border-violet-300 text-violet-900'
                    : 'bg-slate-50/80 border-slate-200 hover:bg-violet-50/50 text-slate-800'
                }`}
              >
                <span className="p-2 bg-violet-100 text-violet-700 rounded-xl">
                  <CalendarDays className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-xs font-bold block">Kegiatan</span>
                  <span className="text-[10px] text-slate-500">Agenda RT</span>
                </div>
              </button>

              <button
                onClick={() => handleSelectTab('pengurus')}
                className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  activeTab === 'pengurus'
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-slate-50/80 border-slate-200 hover:bg-amber-50/50 text-slate-800'
                }`}
              >
                <span className="p-2 bg-amber-100 text-amber-700 rounded-xl">
                  <Award className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-xs font-bold block">Pengurus RT</span>
                  <span className="text-[10px] text-slate-500">Bagan Struktur</span>
                </div>
              </button>

              <button
                onClick={() => handleSelectTab('profil')}
                className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  activeTab === 'profil'
                    ? 'bg-blue-50 border-blue-300 text-blue-900'
                    : 'bg-slate-50/80 border-slate-200 hover:bg-blue-50/50 text-slate-800'
                }`}
              >
                <span className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                  <Building2 className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-xs font-bold block">Profil Wilayah</span>
                  <span className="text-[10px] text-slate-500">Tata Tertib RT</span>
                </div>
              </button>

              {isAdminMode && (
                <button
                  onClick={() => handleSelectTab('administrasi')}
                  className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    activeTab === 'administrasi'
                      ? 'bg-teal-50 border-teal-300 text-teal-900'
                      : 'bg-slate-50/80 border-slate-200 hover:bg-teal-50/50 text-slate-800'
                  }`}
                >
                  <span className="p-2 bg-teal-100 text-teal-700 rounded-xl">
                    <FileText className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-xs font-bold block">Surat & Arsip</span>
                    <span className="text-[10px] text-teal-700 font-semibold">{letterCount} Surat</span>
                  </div>
                </button>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-1">
                Layanan Cepat
              </span>

              <div className="grid grid-cols-2 gap-2">
                {isAdminMode && (
                  <button
                    onClick={() => {
                      setIsMoreMenuOpen(false);
                      onOpenCekIuran();
                    }}
                    className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 font-semibold text-xs flex items-center gap-2 hover:bg-teal-100 cursor-pointer"
                  >
                    <Search className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>Cek Iuran Rumah</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setIsMoreMenuOpen(false);
                    onOpenEmergency();
                  }}
                  className={`p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 font-semibold text-xs flex items-center gap-2 hover:bg-rose-100 cursor-pointer ${
                    isAdminMode ? '' : 'col-span-2 justify-center py-3.5'
                  }`}
                >
                  <PhoneCall className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Nomor Darurat Lingkungan</span>
                </button>
              </div>

              {/* Admin Toggle */}
              <div className="pt-2">
                {isAdminMode ? (
                  <button
                    onClick={() => {
                      setIsMoreMenuOpen(false);
                      onLogoutAdmin();
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-500/20 text-amber-950 font-bold text-xs flex items-center justify-center gap-2 border border-amber-400/40"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar Mode Admin Pengurus</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsMoreMenuOpen(false);
                      onOpenAdminLogin();
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
                  >
                    <KeyRound className="w-4 h-4 text-amber-300" />
                    <span>Masuk Mode Admin Pengurus RT</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar on Mobile/Tablet */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-lg md:hidden">
        <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto px-1">
          {mainTabs.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !isMoreMenuOpen;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`flex flex-col items-center justify-center h-full relative transition-colors ${
                  isActive ? item.activeColor : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div
                  className={`p-1 rounded-xl transition-all ${
                    isActive ? `${item.activeBg} scale-110 shadow-2xs` : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] font-bold tracking-tight mt-0.5 ${
                    isActive ? 'font-black' : ''
                  }`}
                >
                  {item.label}
                </span>

                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute top-1.5 right-3 text-[9px] bg-rose-500 text-white font-black px-1.5 py-0.2 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* 5th Tab: Lainnya / Menu Drawer */}
          <button
            onClick={() => setIsMoreMenuOpen(prev => !prev)}
            className={`flex flex-col items-center justify-center h-full relative transition-colors ${
              isMoreMenuOpen ||
              ['kegiatan', 'pengurus', 'profil', 'administrasi'].includes(activeTab)
                ? 'text-teal-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div
              className={`p-1 rounded-xl transition-all ${
                isMoreMenuOpen ||
                ['kegiatan', 'pengurus', 'profil', 'administrasi'].includes(activeTab)
                  ? 'bg-teal-50 scale-110 shadow-2xs'
                  : ''
              }`}
            >
              <Menu className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-0.5">Lainnya</span>

            {isAdminMode && letterCount > 0 && (
              <span className="absolute top-1.5 right-3 text-[9px] bg-teal-600 text-white font-black px-1.5 py-0.2 rounded-full">
                {letterCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
