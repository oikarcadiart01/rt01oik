import React from 'react';
import { RTAnnouncement } from '../../types';
import { formatDateIndo } from '../../utils/formatters';
import {
  Bell,
  Sparkles,
  Shield,
  PhoneCall,
  Clock,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

interface UserBerandaTabProps {
  announcements: RTAnnouncement[];
  onOpenEmergency: () => void;
}

export const UserBerandaTab: React.FC<UserBerandaTabProps> = ({
  announcements,
  onOpenEmergency,
}) => {
  return (
    <div className="space-y-6">
      {/* Sambutan Warga Cluster Arcadia (Bersih & Elegan) */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden border border-emerald-400/40">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-10 -bottom-10 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-amber-200 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Selamat Datang di Paguyuban Warga Cluster Arcadia</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-tight drop-shadow-xs">
            Mewujudkan Lingkungan Aman, Asri, Nyaman & Transparan
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-teal-50/95 leading-relaxed font-normal">
            Pusat informasi dan kerukunan warga <strong>RT 01 RW 12 Cluster Arcadia, Perumahan Oma Indah Kapuk, Desa Suwayuwo, Kecamatan Sukorejo, Kabupaten Pasuruan</strong>.
          </p>

          <div className="mt-4 pt-4 border-t border-teal-400/30 flex flex-wrap items-center gap-3 text-xs text-teal-100">
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
              <Shield className="w-3.5 h-3.5 text-cyan-300" />
              <span>Sistem Satu Pintu (One-Gate)</span>
            </span>
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Pos Jaga Satpam 24 Jam</span>
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Pengumuman Warga & Informasi Pos Jaga Lingkungan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri 2/3: Pengumuman Resmi Pengurus RT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-amber-200/80">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-amber-100">
              <div className="flex items-center gap-3">
                <span className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl shadow-xs">
                  <Bell className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Pengumuman Resmi Pengurus RT
                  </h3>
                  <p className="text-xs text-slate-500">
                    Informasi penting dan edaran untuk seluruh warga Cluster Arcadia
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                {announcements.length} Kabar
              </span>
            </div>

            <div className="space-y-4">
              {announcements.map(ann => (
                <div
                  key={ann.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    ann.prioritas === 'Darurat'
                      ? 'border-rose-200 bg-rose-50/50 hover:bg-rose-50 border-l-4 border-l-rose-500'
                      : ann.prioritas === 'Penting'
                      ? 'border-amber-200 bg-amber-50/50 hover:bg-amber-50 border-l-4 border-l-amber-500'
                      : 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 border-l-4 border-l-emerald-500'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        ann.prioritas === 'Darurat'
                          ? 'bg-rose-500 text-white'
                          : ann.prioritas === 'Penting'
                          ? 'bg-amber-500 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {ann.prioritas}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {formatDateIndo(ann.tanggal)}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900">{ann.judul}</h4>
                  <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">{ann.isi}</p>
                  <div className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-200/60 font-medium flex items-center justify-between">
                    <span>Sumber: <strong className="text-slate-800">{ann.dibuatOleh}</strong></span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Resmi RT 01
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan 1/3: Informasi Keamanan & Bantuan Darurat */}
        <div className="space-y-6">
          {/* Card Pos Satpam & Keamanan Cluster */}
          <div className="bg-gradient-to-br from-sky-50 via-cyan-50/80 to-white rounded-3xl p-5 sm:p-6 border border-sky-200 text-xs space-y-3.5 text-slate-700 shadow-sm">
            <div className="flex items-center gap-2.5 pb-3 border-b border-sky-200">
              <span className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl shadow-xs">
                <Shield className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">
                  Pos Satpam & Keamanan 24 Jam
                </h4>
                <p className="text-[11px] text-slate-500">Sistem Satu Gerbang Cluster Arcadia</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-600 font-medium">
              Penjagaan pos satpam 24 Jam dengan sistem satu pintu (one-gate system). Portal otomatis ditutup pukul 22.00 WIB demi keamanan seluruh keluarga penghuni.
            </p>

            <div className="space-y-2 pt-1 font-medium text-xs">
              <div className="p-2.5 bg-white/90 rounded-xl border border-sky-100 flex items-center justify-between">
                <span>Batas Kecepatan Kendaraan:</span>
                <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                  Maks. 20 km/jam
                </span>
              </div>

              <div className="p-2.5 bg-white/90 rounded-xl border border-sky-100 flex items-center justify-between">
                <span>Tamu Menginap &gt; 24 Jam:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Wajib Lapor Pos
                </span>
              </div>
            </div>
          </div>

          {/* Card Bantuan Darurat Cepat */}
          <div className="bg-gradient-to-br from-rose-50 to-red-50/80 rounded-3xl p-5 sm:p-6 border border-rose-200 text-xs space-y-3 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-xl shadow-xs">
                <PhoneCall className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">
                  Pusat Kontak Cepat & Darurat
                </h4>
                <p className="text-[11px] text-slate-500">Polsek, Medis & Satpam Sukorejo</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Butuh bantuan keamanan mendesak atau kendala fasilitas darurat di lingkungan Cluster Arcadia?
            </p>

            <button
              onClick={onOpenEmergency}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer min-h-[44px]"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>Buka Nomor Darurat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
