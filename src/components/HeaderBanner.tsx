import React from 'react';
import { PhoneCall, KeyRound, LogOut, ShieldCheck, MapPin, Sparkles, FileText } from 'lucide-react';

interface HeaderBannerProps {
  isAdminMode: boolean;
  onOpenAdminLogin: () => void;
  onLogoutAdmin: () => void;
  onOpenEmergency: () => void;
  onOpenCekIuran?: () => void;
  onNavigateTab?: (tab: 'administrasi' | 'keuangan' | 'beranda' | 'warga') => void;
  totalWarga: number;
  totalKK: number;
  saldoKas: number;
  aduanAktif: number;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  isAdminMode,
  onOpenAdminLogin,
  onLogoutAdmin,
  onOpenEmergency,
  onNavigateTab,
  totalWarga,
  totalKK,
  saldoKas,
  aduanAktif,
}) => {
  return (
    <header className="relative bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white overflow-hidden border-b border-emerald-800/70 shadow-lg">
      {/* Decorative gradient effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-emerald-400 blur-3xl"></div>
        <div className="absolute left-10 -bottom-24 w-80 h-80 rounded-full bg-teal-400 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/30 backdrop-blur-md border border-white/25 p-2 flex items-center justify-center shrink-0 shadow-inner group">
              <div className="text-center">
                <span className="block text-[10px] font-black uppercase tracking-wider text-emerald-300 leading-tight">
                  RT 01
                </span>
                <span className="block text-lg font-black text-white leading-tight">
                  RW 12
                </span>
                <span className="block text-[8px] font-extrabold text-teal-200 uppercase tracking-widest leading-none">
                  Arcadia
                </span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  Portal Komunitas Warga
                </span>
                <span className="text-[11px] text-emerald-200/80 font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" /> Suwayuwo, Sukorejo, Pasuruan
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                RT 01 RW 12 Cluster Arcadia
              </h1>

              <p className="text-xs text-emerald-100/90 font-medium">
                Perumahan Oma Indah Kapuk, Kabupaten Pasuruan
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-sm border border-rose-500/70 hover:scale-102 active:scale-98"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span>Nomor Darurat</span>
            </button>

            {/* Admin Login / Logout Switcher */}
            {isAdminMode ? (
              <div className="flex items-center gap-2">
                {onNavigateTab && (
                  <button
                    onClick={() => onNavigateTab('administrasi')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600/90 hover:bg-teal-500 text-white text-xs font-bold border border-teal-400/50 transition-all shadow-xs cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Layanan Surat RT</span>
                  </button>
                )}
                <div className="flex items-center gap-2 bg-amber-500/25 border border-amber-400/50 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-amber-200 font-bold">
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    <span>Admin RT Aktif</span>
                  </div>
                  <button
                    onClick={onLogoutAdmin}
                    className="flex items-center gap-1 text-[11px] bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Keluar</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-bold border border-emerald-500/50 transition-all shadow-sm hover:scale-102 active:scale-98"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-300" />
                <span>Masuk Admin</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Indicators Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-5 pt-4 border-t border-emerald-800/50 text-xs">
          <div className="bg-emerald-950/60 backdrop-blur-xs rounded-2xl p-3 border border-emerald-700/30">
            <span className="text-emerald-300/80 block text-[11px] font-medium">Kepala Keluarga (KK)</span>
            <span className="text-base sm:text-lg font-black text-white">{totalKK} KK Terdata</span>
          </div>

          <div className="bg-emerald-950/60 backdrop-blur-xs rounded-2xl p-3 border border-emerald-700/30">
            <span className="text-emerald-300/80 block text-[11px] font-medium">Total Penduduk / Jiwa</span>
            <span className="text-base sm:text-lg font-black text-white">{totalWarga} Jiwa</span>
          </div>

          <div className="bg-emerald-950/60 backdrop-blur-xs rounded-2xl p-3 border border-emerald-700/30">
            <span className="text-emerald-300/80 block text-[11px] font-medium">Saldo Kas RT Berjalan</span>
            <span className="text-base sm:text-lg font-black text-emerald-200">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0,
              }).format(saldoKas)}
            </span>
          </div>

          <div className="bg-emerald-950/60 backdrop-blur-xs rounded-2xl p-3 border border-emerald-700/30">
            <span className="text-emerald-300/80 block text-[11px] font-medium">Aduan Lingkungan Aktif</span>
            <span className="text-base sm:text-lg font-black text-amber-300">
              {aduanAktif} Masalah Dipantau
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
