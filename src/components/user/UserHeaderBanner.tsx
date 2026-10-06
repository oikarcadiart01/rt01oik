import React from 'react';
import { PhoneCall, KeyRound, MapPin, Sparkles } from 'lucide-react';

interface UserHeaderBannerProps {
  onOpenAdminLogin: () => void;
  onOpenEmergency: () => void;
  totalWarga: number;
  totalKK: number;
  saldoKas: number;
  aduanAktif: number;
}

export const UserHeaderBanner: React.FC<UserHeaderBannerProps> = ({
  onOpenAdminLogin,
  onOpenEmergency,
  totalWarga,
  totalKK,
  saldoKas,
  aduanAktif,
}) => {
  return (
    <header className="relative bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white overflow-hidden border-b border-teal-500/40 shadow-lg">
      {/* Decorative radiant ambient lights */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-amber-300 blur-3xl animate-pulse"></div>
        <div className="absolute left-1/3 -bottom-24 w-80 h-80 rounded-full bg-cyan-300 blur-3xl"></div>
        <div className="absolute -left-20 top-0 w-72 h-72 rounded-full bg-emerald-300 blur-3xl"></div>
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
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400/25 text-amber-200 border border-amber-300/40 flex items-center gap-1 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                  Portal Komunitas Warga
                </span>
                <span className="text-[11px] text-teal-100 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-300 shrink-0" /> Suwayuwo, Sukorejo, Pasuruan
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white mt-1 drop-shadow-xs">
                RT 01 RW 12 Cluster Arcadia
              </h1>

              <p className="text-xs sm:text-sm text-teal-100/90 font-medium">
                Perumahan Oma Indah Kapuk • Guyub, Transparan & Asri
              </p>
            </div>
          </div>

          {/* Action Buttons for User: Nomor Darurat & Masuk Admin */}
          <div className="flex flex-wrap items-center gap-2 pt-1 md:pt-0">
            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-md shadow-rose-900/20 border border-rose-400/50 hover:scale-102 active:scale-98 min-h-[42px] cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span>Nomor Darurat</span>
            </button>

            <button
              onClick={onOpenAdminLogin}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white text-xs font-bold border border-amber-300/50 transition-all shadow-sm hover:scale-102 active:scale-98 min-h-[42px] cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-200" />
              <span>Masuk Admin</span>
            </button>
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
