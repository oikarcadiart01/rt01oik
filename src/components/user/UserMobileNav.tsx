import React, { useState } from 'react';
import { UserNavTab } from './UserNavbar';
import {
  LayoutDashboard,
  Award,
  CalendarDays,
  Building2,
  Menu,
  X,
  PhoneCall,
  KeyRound,
  FileText,
} from 'lucide-react';

interface UserMobileNavProps {
  activeTab: UserNavTab;
  setActiveTab: (tab: UserNavTab) => void;
  onOpenEmergency: () => void;
  onOpenAdminLogin: () => void;
}

export const UserMobileNav: React.FC<UserMobileNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenEmergency,
  onOpenAdminLogin,
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const mainTabs = [
    {
      id: 'beranda' as UserNavTab,
      label: 'Beranda',
      icon: LayoutDashboard,
      activeColor: 'text-emerald-600',
      activeBg: 'bg-emerald-50',
    },
    {
      id: 'pengurus' as UserNavTab,
      label: 'Pengurus',
      icon: Award,
      activeColor: 'text-amber-600',
      activeBg: 'bg-amber-50',
    },
    {
      id: 'kegiatan' as UserNavTab,
      label: 'Kegiatan',
      icon: CalendarDays,
      activeColor: 'text-violet-600',
      activeBg: 'bg-violet-50',
    },
    {
      id: 'profil' as UserNavTab,
      label: 'Profil',
      icon: Building2,
      activeColor: 'text-blue-600',
      activeBg: 'bg-blue-50',
    },
  ];

  const handleSelectTab = (tab: UserNavTab) => {
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
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">
                Menu Lengkap Warga
              </h3>
              <button
                onClick={() => setIsMoreMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              <button
                onClick={() => handleSelectTab('tatatertib')}
                className={`w-full p-3.5 rounded-2xl border font-bold text-xs flex items-center gap-3 transition-colors cursor-pointer min-h-[46px] ${
                  activeTab === 'tatatertib'
                    ? 'bg-teal-50 border-teal-300 text-teal-900'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-teal-50/50'
                }`}
              >
                <span className="p-2 bg-teal-100 text-teal-700 rounded-xl">
                  <FileText className="w-4 h-4 shrink-0" />
                </span>
                <div className="text-left">
                  <span className="block font-black">Tata Tertib & Peraturan</span>
                  <span className="text-[10px] text-slate-500 font-normal">Pedoman kenyamanan & ketertiban cluster</span>
                </div>
              </button>

              <button
                onClick={() => handleSelectTab('darurat')}
                className={`w-full p-3.5 rounded-2xl border font-bold text-xs flex items-center gap-3 transition-colors cursor-pointer min-h-[46px] ${
                  activeTab === 'darurat'
                    ? 'bg-rose-50 border-rose-300 text-rose-900'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-rose-50/50'
                }`}
              >
                <span className="p-2 bg-rose-100 text-rose-700 rounded-xl">
                  <PhoneCall className="w-4 h-4 shrink-0" />
                </span>
                <div className="text-left">
                  <span className="block font-black">Nomor Darurat & Kontak Satpam</span>
                  <span className="text-[10px] text-slate-500 font-normal">Polsek, medis, satpam, damkar & PLN</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  onOpenAdminLogin();
                }}
                className="w-full py-3.5 px-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer min-h-[46px] mt-2"
              >
                <KeyRound className="w-4 h-4 text-amber-300" />
                <span>Masuk Mode Admin Pengurus RT</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar on Mobile */}
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
              </button>
            );
          })}

          {/* 5th Tab: Lainnya */}
          <button
            onClick={() => setIsMoreMenuOpen(prev => !prev)}
            className={`flex flex-col items-center justify-center h-full relative transition-colors ${
              isMoreMenuOpen ? 'text-teal-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div
              className={`p-1 rounded-xl transition-all ${
                isMoreMenuOpen ? 'bg-teal-50 scale-110 shadow-2xs' : ''
              }`}
            >
              <Menu className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-0.5">Lainnya</span>
          </button>
        </div>
      </nav>
    </>
  );
};
