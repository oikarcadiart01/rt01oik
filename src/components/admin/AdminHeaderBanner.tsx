import React from 'react';
import { PhoneCall, LogOut, ShieldCheck, MapPin, Sparkles, FileText, Search } from 'lucide-react';
import { AdminNavTab } from './AdminNavbar';

interface AdminHeaderBannerProps {
  onLogoutAdmin: () => void;
  onOpenEmergency: () => void;
  onOpenCekIuran: () => void;
  onNavigateTab: (tab: AdminNavTab) => void;
  totalWarga: number;
  totalKK: number;
  saldoKas: number;
  aduanAktif: number;
}

export const AdminHeaderBanner: React.FC<AdminHeaderBannerProps> = ({
  onLogoutAdmin,
  onOpenEmergency,
  onOpenCekIuran,
  onNavigateTab,
  totalWarga,
  totalKK,
  saldoKas,
  aduanAktif,
}) => {
  return (
    <header className="relative bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 text-white overflow-hidden border-b border-teal-500/40 shadow-lg">
      {/* Decorative radiant ambient lights */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-amber-400 blur-3xl animate-pulse"></div>
        <div className="absolute left-1/3 -bottom-24 w-80 h-80 rounded-full bg-cyan-400 blur-3xl"></div>
        <div className="absolute -left-20 top-0 w-72 h-72 rounded-full bg-emerald-400 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-emerald-400 to-teal-400 p-0.5 shadow-lg shrink-0">
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

          {/* Action Buttons with high touch target & colorful styling */}
          <div className="flex flex-wrap items-center gap-2 pt-1 md:pt-0">
            <button
              onClick={onOpenCekIuran}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-500/30 hover:bg-teal-500/40 text-teal-100 text-xs font-bold transition-all shadow-xs border border-teal-300/40 backdrop-blur-xs min-h-[42px] cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Cek Iuran</span>
            </button>

            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-md shadow-rose-900/20 border border-rose-400/50 hover:scale-102 active:scale-98 min-h-[42px] cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Nomor Darurat</span>
            </button>

            <button
              onClick={() => onNavigateTab('administrasi')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white text-xs font-bold border border-cyan-300/50 transition-all shadow-sm cursor-pointer min-h-[42px]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Layanan Surat</span>
            </button>

            <div className="flex items-center gap-2 bg-amber-400/25 border border-amber-300/60 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-xs min-h-[42px]">
              <div className="flex items-center gap-1.5 text-xs text-amber-200 font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline">Admin Aktif</span>
              </div>
              <button
                onClick={onLogoutAdmin}
                className="flex items-center gap-1 text-[11px] bg-amber-300 hover:bg-amber-200 text-slate-950 font-black px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Indicators Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-teal-400/30 text-xs">
          {/* Card 1: KK */}
          <div className="bg-gradient-to-br from-amber-500/20 via-yellow-600/10 to-amber-700/20 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-amber-300/40 shadow-xs">
            <span className="text-amber-200 block text-[11px] font-bold">Kepala Keluarga (KK)</span>
            <span className="text-base sm:text-xl font-black text-white mt-0.5 block">{totalKK} KK Terdata</span>
            <span className="text-[10px] text-amber-200/80 block mt-0.5">Blok A, B, C, D</span>
          </div>

          {/* Card 2: Jiwa */}
          <div className="bg-gradient-to-br from-sky-500/20 via-cyan-600/10 to-blue-700/20 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-sky-300/40 shadow-xs">
            <span className="text-sky-200 block text-[11px] font-bold">Total Penduduk / Jiwa</span>
            <span className="text-base sm:text-xl font-black text-white mt-0.5 block">{totalWarga} Jiwa</span>
            <span className="text-[10px] text-sky-200/80 block mt-0.5">Warga Tetap & Kontrak</span>
          </div>

          {/* Card 3: Saldo Kas */}
          <div className="bg-gradient-to-br from-emerald-500/20 via-teal-600/10 to-green-700/20 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-emerald-300/40 shadow-xs">
            <span className="text-emerald-200 block text-[11px] font-bold">Saldo Kas RT Berjalan</span>
            <span className="text-base sm:text-xl font-black text-emerald-100 mt-0.5 block">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0,
              }).format(saldoKas)}
            </span>
            <span className="text-[10px] text-emerald-200/80 block mt-0.5">Kas Transparan 100%</span>
          </div>

          {/* Card 4: Aduan */}
          <div className="bg-gradient-to-br from-rose-500/20 via-pink-600/10 to-rose-700/20 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-rose-300/40 shadow-xs">
            <span className="text-rose-200 block text-[11px] font-bold">Aduan Lingkungan Aktif</span>
            <span className="text-base sm:text-xl font-black text-white mt-0.5 block">
              {aduanAktif} Tiket Dipantau
            </span>
            <span className="text-[10px] text-rose-200/80 block mt-0.5">Respon Cepat Pengurus</span>
          </div>
        </div>
      </div>
    </header>
  );
};
