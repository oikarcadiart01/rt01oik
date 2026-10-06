import React from 'react';
import { Official } from '../../types';
import {
  Award,
  Home,
  Sparkles,
  MoveRight,
} from 'lucide-react';

interface UserPengurusTabProps {
  officials: Official[];
}

export const UserPengurusTab: React.FC<UserPengurusTabProps> = ({ officials }) => {
  return (
    <div className="space-y-6">
      {/* Header Info - Vibrant & Bright */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-cyan-500/15 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-emerald-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md">
              <Award className="w-6 h-6" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-3 py-0.5 rounded-full border border-emerald-300">
                  Kepengurusan Rukun Tetangga
                </span>
                <span className="text-xs font-semibold text-slate-500">• Masa Bakti 2024 - 2027</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Struktur Organisasi Pengurus RT 01 RW 12
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Cluster Arcadia Perumahan Oma Indah Kapuk, Desa Suwayuwo Sukorejo Pasuruan
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Hierarchy Tree */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        {/* Mobile Swipe Hint */}
        <div className="block sm:hidden bg-amber-50 border border-amber-200 rounded-2xl p-2.5 text-center text-xs text-amber-900 font-medium flex items-center justify-center gap-1.5">
          <MoveRight className="w-4 h-4 text-amber-600 animate-pulse" />
          <span>Geser bagan ke kanan-kiri untuk melihat seluruh pengurus</span>
        </div>

        <div className="text-center mb-6 max-w-xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Bagan Resmi Kepengurusan
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            Bagan Organisasi RT 01 RW 12 Cluster Arcadia
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Melayani kerukunan, ketertiban, keamanan, kebersihan, dan kenyamanan seluruh warga cluster
          </p>
        </div>

        <div className="overflow-x-auto pb-4 touch-pan-x">
          <div className="min-w-[720px] flex flex-col items-center py-2">
            {/* Level 1: Ketua RT */}
            <div className="w-84 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-5 rounded-3xl shadow-xl text-center border-2 border-emerald-300 relative hover:scale-102 transition-transform duration-300">
              <div className="w-18 h-18 mx-auto mb-2.5 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md">
                <img
                  src={officials[0]?.fotoUrl}
                  alt={officials[0]?.nama}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-950 bg-amber-300 px-3.5 py-0.5 rounded-full inline-block mb-1 shadow-2xs">
                Ketua RT 01
              </span>
              <h4 className="font-black text-base sm:text-lg tracking-tight">
                {officials[0]?.nama || 'Bambang Prasetyo, S.T.'}
              </h4>
              <p className="text-xs text-emerald-100 font-medium mt-0.5 flex items-center justify-center gap-1">
                <Home className="w-3 h-3 text-amber-300" /> {officials[0]?.blokRumah || 'Blok A1 No. 02'}
              </p>
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-0.5 h-7 bg-emerald-400"></div>
            </div>

            {/* Level 2: Wakil Ketua, Sekretaris, Bendahara */}
            <div className="pt-7 w-full flex justify-center gap-6 relative">
              <div className="absolute top-7 left-1/6 right-1/6 h-0.5 bg-emerald-300"></div>

              {/* Wakil Ketua */}
              <div className="w-60 bg-gradient-to-br from-cyan-600 to-teal-700 text-white p-4 rounded-2xl shadow-md text-center border border-cyan-300/60 relative hover:scale-102 transition-transform">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-0.5 h-7 bg-emerald-300"></div>
                <div className="w-14 h-14 mx-auto mb-2 rounded-xl overflow-hidden border-2 border-white/50 shadow-xs">
                  <img
                    src={officials[1]?.fotoUrl}
                    alt={officials[1]?.nama}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] font-extrabold uppercase text-cyan-950 bg-cyan-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  {officials[1]?.jabatan || 'Wakil Ketua RT'}
                </span>
                <h5 className="font-bold text-sm tracking-tight">{officials[1]?.nama}</h5>
                <p className="text-[11px] text-cyan-100 flex items-center justify-center gap-1 mt-0.5">
                  <Home className="w-3 h-3 text-cyan-300" /> {officials[1]?.blokRumah}
                </p>
              </div>

              {/* Sekretaris */}
              <div className="w-60 bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-4 rounded-2xl shadow-md text-center border border-indigo-300/60 relative hover:scale-102 transition-transform">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-0.5 h-7 bg-emerald-300"></div>
                <div className="w-14 h-14 mx-auto mb-2 rounded-xl overflow-hidden border-2 border-white/50 shadow-xs">
                  <img
                    src={officials[2]?.fotoUrl}
                    alt={officials[2]?.nama}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] font-extrabold uppercase text-indigo-950 bg-indigo-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  {officials[2]?.jabatan || 'Sekretaris RT'}
                </span>
                <h5 className="font-bold text-sm tracking-tight">{officials[2]?.nama}</h5>
                <p className="text-[11px] text-indigo-100 flex items-center justify-center gap-1 mt-0.5">
                  <Home className="w-3 h-3 text-indigo-300" /> {officials[2]?.blokRumah}
                </p>
              </div>

              {/* Bendahara */}
              <div className="w-60 bg-gradient-to-br from-amber-500 to-orange-600 text-white p-4 rounded-2xl shadow-md text-center border border-amber-300/60 relative hover:scale-102 transition-transform">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-0.5 h-7 bg-emerald-300"></div>
                <div className="w-14 h-14 mx-auto mb-2 rounded-xl overflow-hidden border-2 border-white/50 shadow-xs">
                  <img
                    src={officials[3]?.fotoUrl}
                    alt={officials[3]?.nama}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] font-extrabold uppercase text-amber-950 bg-amber-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  {officials[3]?.jabatan || 'Bendahara RT'}
                </span>
                <h5 className="font-bold text-sm tracking-tight">{officials[3]?.nama}</h5>
                <p className="text-[11px] text-amber-100 flex items-center justify-center gap-1 mt-0.5">
                  <Home className="w-3 h-3 text-amber-200" /> {officials[3]?.blokRumah}
                </p>
              </div>
            </div>

            {/* Level 3: Seksi-Seksi Lapangan */}
            <div className="mt-9 pt-7 border-t-2 border-dashed border-emerald-200 w-full">
              <div className="text-center mb-5">
                <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-300">
                  Koordinator Seksi Lapangan & Pelayanan Lingkungan
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                {/* Seksi Keamanan */}
                <div className="bg-gradient-to-b from-blue-50 to-white p-4 rounded-2xl border border-blue-200 text-center shadow-xs">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-xl overflow-hidden border border-blue-300 shadow-2xs">
                    <img src={officials[4]?.fotoUrl} alt="Keamanan" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded-full block mb-1">
                    {officials[4]?.jabatan || 'Seksi Keamanan'}
                  </span>
                  <div className="font-bold text-xs text-slate-900">{officials[4]?.nama}</div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{officials[4]?.blokRumah}</span>
                </div>

                {/* Seksi Sarpras */}
                <div className="bg-gradient-to-b from-amber-50 to-white p-4 rounded-2xl border border-amber-200 text-center shadow-xs">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-xl overflow-hidden border border-amber-300 shadow-2xs">
                    <img src={officials[5]?.fotoUrl} alt="Sarpras" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full block mb-1">
                    {officials[5]?.jabatan || 'Seksi Sarpras'}
                  </span>
                  <div className="font-bold text-xs text-slate-900">{officials[5]?.nama}</div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{officials[5]?.blokRumah}</span>
                </div>

                {/* Seksi Kebersihan */}
                <div className="bg-gradient-to-b from-emerald-50 to-white p-4 rounded-2xl border border-emerald-200 text-center shadow-xs">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-xl overflow-hidden border border-emerald-300 shadow-2xs">
                    <img src={officials[6]?.fotoUrl} alt="Kebersihan" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full block mb-1">
                    {officials[6]?.jabatan || 'Seksi Kebersihan'}
                  </span>
                  <div className="font-bold text-xs text-slate-900">{officials[6]?.nama}</div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{officials[6]?.blokRumah}</span>
                </div>

                {/* Seksi Humas */}
                <div className="bg-gradient-to-b from-purple-50 to-white p-4 rounded-2xl border border-purple-200 text-center shadow-xs">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-xl overflow-hidden border border-purple-300 shadow-2xs">
                    <img src={officials[7]?.fotoUrl} alt="Humas" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded-full block mb-1">
                    {officials[7]?.jabatan || 'Seksi Humas'}
                  </span>
                  <div className="font-bold text-xs text-slate-900">{officials[7]?.nama}</div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{officials[7]?.blokRumah}</span>
                </div>

                {/* Seksi Dawis/Posyandu */}
                <div className="bg-gradient-to-b from-pink-50 to-white p-4 rounded-2xl border border-pink-200 text-center shadow-xs">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-xl overflow-hidden border border-pink-300 shadow-2xs">
                    <img src={officials[8]?.fotoUrl} alt="Dawis" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-pink-900 bg-pink-100 px-2 py-0.5 rounded-full block mb-1">
                    {officials[8]?.jabatan || 'Seksi Posyandu'}
                  </span>
                  <div className="font-bold text-xs text-slate-900">{officials[8]?.nama}</div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{officials[8]?.blokRumah}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
