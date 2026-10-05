import React, { useState } from 'react';
import { Official } from '../../types';
import {
  Award,
  GitBranch,
  Layers,
  Home,
  Phone,
  Shield,
  Sparkles,
} from 'lucide-react';

interface PengurusTabProps {
  officials: Official[];
  isAdminMode?: boolean;
}

export const PengurusTab: React.FC<PengurusTabProps> = ({ officials, isAdminMode = false }) => {
  // If user mode (!isAdminMode), only show hierarchy. If admin, can toggle to contact cards.
  const [viewMode, setViewMode] = useState<'hierarchy' | 'cards'>('hierarchy');

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-sm">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                  Kepengurusan Rukun Tetangga
                </span>
                <span className="text-xs text-slate-400">• Masa Bakti 2024 - 2027</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Struktur Organisasi Pengurus RT 01 RW 12
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Cluster Arcadia Perumahan Oma Indah Kapuk, Desa Suwayuwo Sukorejo Pasuruan
              </p>
            </div>
          </div>
        </div>

        {/* View mode toggle ONLY visible in Admin Mode. In user mode, ONLY hierarchy is shown! */}
        {isAdminMode && (
          <div className="flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl text-xs font-semibold self-stretch sm:self-auto justify-center">
            <button
              onClick={() => setViewMode('hierarchy')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                viewMode === 'hierarchy'
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              Bagan Struktur
            </button>

            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                viewMode === 'cards'
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Daftar Kontak (Admin)
            </button>
          </div>
        )}
      </div>

      {/* For regular user (and default for admin): ONLY visual hierarchy tree! */}
      {(!isAdminMode || viewMode === 'hierarchy') ? (
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm overflow-x-auto">
          <div className="text-center mb-8 max-w-xl mx-auto">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Bagan Resmi Kepengurusan
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Bagan Organisasi RT 01 RW 12 Cluster Arcadia
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Melayani kerukunan, ketertiban, keamanan, kebersihan, dan kenyamanan seluruh warga cluster
            </p>
          </div>

          <div className="min-w-[700px] flex flex-col items-center">
            {/* Level 1: Ketua RT */}
            <div className="w-80 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white p-5 rounded-3xl shadow-lg text-center border-2 border-emerald-500/80 relative hover:scale-102 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-2.5 rounded-2xl overflow-hidden border-2 border-emerald-300/60 shadow-md">
                <img
                  src={officials[0]?.fotoUrl}
                  alt={officials[0]?.nama}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200 bg-white/10 px-3 py-0.5 rounded-full inline-block mb-1">
                Ketua RT 01
              </span>
              <h4 className="font-extrabold text-base sm:text-lg tracking-tight">
                {officials[0]?.nama || 'Bambang Prasetyo, S.T.'}
              </h4>
              <p className="text-xs text-emerald-100 font-medium mt-0.5 flex items-center justify-center gap-1">
                <Home className="w-3 h-3 text-emerald-300" /> {officials[0]?.blokRumah || 'Blok A1 No. 02'}
              </p>
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-0.5 h-7 bg-emerald-400"></div>
            </div>

            {/* Level 2: Wakil Ketua, Sekretaris, Bendahara */}
            <div className="pt-7 w-full flex justify-center gap-5 relative">
              <div className="absolute top-7 left-1/5 right-1/5 h-0.5 bg-emerald-300"></div>

              {/* Wakil Ketua */}
              <div className="w-60 bg-gradient-to-br from-teal-700 to-emerald-800 text-white p-4 rounded-2xl shadow-md text-center border border-teal-400/50 relative hover:scale-102 transition-transform">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-0.5 h-7 bg-emerald-300"></div>
                <div className="w-13 h-13 mx-auto mb-2 rounded-xl overflow-hidden border border-white/30 shadow-xs">
                  <img
                    src={officials[1]?.fotoUrl}
                    alt={officials[1]?.nama}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] font-bold uppercase text-teal-200 bg-white/10 px-2 py-0.5 rounded-full inline-block mb-1">
                  Wakil Ketua RT
                </span>
                <h5 className="font-bold text-sm tracking-tight">{officials[1]?.nama}</h5>
                <p className="text-[11px] text-teal-100 flex items-center justify-center gap-1 mt-0.5">
                  <Home className="w-3 h-3 text-teal-300" /> {officials[1]?.blokRumah}
                </p>
              </div>

              {/* Sekretaris */}
              <div className="w-60 bg-gradient-to-br from-slate-800 to-slate-900 text-white p-4 rounded-2xl shadow-md text-center border border-slate-700 relative hover:scale-102 transition-transform">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-0.5 h-7 bg-emerald-300"></div>
                <div className="w-13 h-13 mx-auto mb-2 rounded-xl overflow-hidden border border-white/30 shadow-xs">
                  <img
                    src={officials[2]?.fotoUrl}
                    alt={officials[2]?.nama}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] font-bold uppercase text-slate-300 bg-white/10 px-2 py-0.5 rounded-full inline-block mb-1">
                  Sekretaris RT
                </span>
                <h5 className="font-bold text-sm tracking-tight">{officials[2]?.nama}</h5>
                <p className="text-[11px] text-slate-300 flex items-center justify-center gap-1 mt-0.5">
                  <Home className="w-3 h-3 text-slate-400" /> {officials[2]?.blokRumah}
                </p>
              </div>

              {/* Bendahara */}
              <div className="w-60 bg-gradient-to-br from-slate-800 to-slate-900 text-white p-4 rounded-2xl shadow-md text-center border border-slate-700 relative hover:scale-102 transition-transform">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-0.5 h-7 bg-emerald-300"></div>
                <div className="w-13 h-13 mx-auto mb-2 rounded-xl overflow-hidden border border-white/30 shadow-xs">
                  <img
                    src={officials[3]?.fotoUrl}
                    alt={officials[3]?.nama}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] font-bold uppercase text-slate-300 bg-white/10 px-2 py-0.5 rounded-full inline-block mb-1">
                  Bendahara RT
                </span>
                <h5 className="font-bold text-sm tracking-tight">{officials[3]?.nama}</h5>
                <p className="text-[11px] text-slate-300 flex items-center justify-center gap-1 mt-0.5">
                  <Home className="w-3 h-3 text-slate-400" /> {officials[3]?.blokRumah}
                </p>
              </div>
            </div>

            {/* Level 3: Seksi-Seksi Lapangan */}
            <div className="mt-9 pt-7 border-t-2 border-dashed border-emerald-200/80 w-full">
              <div className="text-center mb-5">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-4 py-1.5 rounded-full border border-emerald-200">
                  Koordinator Seksi Lapangan & Pelayanan Lingkungan
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                {/* Seksi Keamanan */}
                <div className="bg-gradient-to-b from-blue-50/70 to-white p-3.5 rounded-2xl border border-blue-200/70 text-center shadow-2xs">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-xl overflow-hidden border border-blue-200">
                    <img src={officials[4]?.fotoUrl} alt="Keamanan" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded-full block mb-1">
                    Seksi Keamanan
                  </span>
                  <div className="font-bold text-xs text-slate-900">{officials[4]?.nama}</div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{officials[4]?.blokRumah}</span>
                </div>

                {/* Seksi Sarpras */}
                <div className="bg-gradient-to-b from-amber-50/70 to-white p-3.5 rounded-2xl border border-amber-200/70 text-center shadow-2xs">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-xl overflow-hidden border border-amber-200">
                    <img src={officials[5]?.fotoUrl} alt="Sarpras" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full block mb-1">
                    Seksi Sarpras
                  </span>
                  <div className="font-bold text-xs text-slate-900">{officials[5]?.nama}</div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{officials[5]?.blokRumah}</span>
                </div>

                {/* Seksi Kebersihan */}
                <div className="bg-gradient-to-b from-emerald-50/70 to-white p-3.5 rounded-2xl border border-emerald-200/70 text-center shadow-2xs">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-xl overflow-hidden border border-emerald-200">
                    <img src={officials[6]?.fotoUrl} alt="Kebersihan" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full block mb-1">
                    Seksi Kebersihan
                  </span>
                  <div className="font-bold text-xs text-slate-900">{officials[6]?.nama}</div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{officials[6]?.blokRumah}</span>
                </div>

                {/* Seksi Humas */}
                <div className="bg-gradient-to-b from-purple-50/70 to-white p-3.5 rounded-2xl border border-purple-200/70 text-center shadow-2xs">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-xl overflow-hidden border border-purple-200">
                    <img src={officials[7]?.fotoUrl} alt="Humas" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-purple-800 bg-purple-100/80 px-2 py-0.5 rounded-full block mb-1">
                    Seksi Humas
                  </span>
                  <div className="font-bold text-xs text-slate-900">{officials[7]?.nama}</div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{officials[7]?.blokRumah}</span>
                </div>

                {/* Seksi Dawis/Posyandu */}
                <div className="bg-gradient-to-b from-pink-50/70 to-white p-3.5 rounded-2xl border border-pink-200/70 text-center shadow-2xs">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-xl overflow-hidden border border-pink-200">
                    <img src={officials[8]?.fotoUrl} alt="Dawis" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-pink-800 bg-pink-100/80 px-2 py-0.5 rounded-full block mb-1">
                    Seksi Posyandu
                  </span>
                  <div className="font-bold text-xs text-slate-900">{officials[8]?.nama}</div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{officials[8]?.blokRumah}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Admin Card Contacts View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {officials.map(off => (
            <div
              key={off.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-xs transition-all"
            >
              <div className="p-4 sm:p-5 flex items-start gap-3.5">
                <img
                  src={off.fotoUrl}
                  alt={off.nama}
                  className="w-14 h-14 rounded-2xl object-cover border border-emerald-500/20 shadow-2xs shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-1">
                    {off.jabatan}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight truncate">
                    {off.nama}
                  </h3>
                  <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                    <Home className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{off.blokRumah}</span>
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4">
                <a
                  href={`https://wa.me/62${off.noHp.replace(/^0/, '')}?text=Halo%20${encodeURIComponent(
                    off.jabatan
                  )}%20${encodeURIComponent(off.nama)},%20saya%20warga%20Cluster%20Arcadia`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  Hubungi WhatsApp ({off.noHp})
                </a>
              </div>

              <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Periode: {off.periode}</span>
                <span className="font-semibold text-emerald-700">RT 01 RW 12</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
