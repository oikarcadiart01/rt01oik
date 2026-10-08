import React from 'react';
import { LogOut, ShieldCheck, MapPin } from 'lucide-react';

interface AdminHeaderBannerProps {
  onLogoutAdmin: () => void;
  onOpenEmergency?: () => void;
  onOpenCekIuran?: () => void;
  onNavigateTab?: (tab: any) => void;
  totalWarga?: number;
  totalKK?: number;
  saldoKas?: number;
  aduanAktif?: number;
}

export const AdminHeaderBanner: React.FC<AdminHeaderBannerProps> = ({
  onLogoutAdmin,
}) => {
  return (
    <header className="relative bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 text-white overflow-hidden border-b border-teal-500/40 shadow-lg">
      {/* Decorative radiant ambient lights */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-amber-400 blur-3xl animate-pulse"></div>
        <div className="absolute left-1/3 -bottom-24 w-80 h-80 rounded-full bg-cyan-400 blur-3xl"></div>
        <div className="absolute -left-20 top-0 w-72 h-72 rounded-full bg-emerald-400 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-gradient-to-br from-amber-400 via-emerald-400 to-teal-400 p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full rounded-[14px] bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-1">
                <span className="block text-[10px] font-black uppercase tracking-wider text-amber-300 leading-tight">
                  RT 01
                </span>
                <span className="block text-lg font-black text-white leading-tight">
                  RW 12
                </span>
                <span className="block text-[8px] font-extrabold text-cyan-300 uppercase tracking-widest leading-none">
                  Arcadia
                </span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400/30 text-amber-200 border border-amber-300/50 flex items-center gap-1 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  Mode Pengurus & Admin RT
                </span>
                <span className="text-[11px] text-teal-100 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-300 shrink-0" /> Suwayuwo, Sukorejo, Pasuruan
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white mt-1 drop-shadow-xs">
                RT 01 RW 12 Cluster Arcadia
              </h1>

              <p className="text-xs sm:text-sm text-teal-100/90 font-medium">
                Panel Tata Usaha & Pengelolaan Data Pengurus RT
              </p>
            </div>
          </div>

          {/* Action Buttons: Status Admin & Keluar */}
          <div className="flex items-center gap-2 pt-1 md:pt-0">
            <div className="flex items-center gap-2 bg-amber-400/25 border border-amber-300/60 px-3.5 py-2 rounded-xl backdrop-blur-md shadow-xs min-h-[42px]">
              <div className="flex items-center gap-1.5 text-xs text-amber-200 font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>Admin Aktif</span>
              </div>
              <button
                onClick={onLogoutAdmin}
                className="flex items-center gap-1 text-[11px] bg-amber-300 hover:bg-amber-200 text-slate-950 font-black px-2.5 py-1 rounded-lg transition-colors cursor-pointer ml-1"
                title="Keluar dari Panel Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

