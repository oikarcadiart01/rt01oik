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
  // Filter out any invalid, null, undefined, or empty-name officials
  const validOfficials = (officials || []).filter(
    o => o && typeof o.nama === 'string' && o.nama.trim().length > 0
  );

  // Dynamically determine leadership hierarchy
  // Level 1: Ketua RT (search for 'ketua' without 'wakil', or fallback to first valid official)
  const ketuaRT =
    validOfficials.find(
      o =>
        o.jabatan.toLowerCase().includes('ketua') &&
        !o.jabatan.toLowerCase().includes('wakil')
    ) || validOfficials[0];

  // Level 2: Core Executives (Wakil Ketua, Sekretaris, Bendahara)
  let coreLeaders: Official[] = [];
  let otherOfficials: Official[] = [];

  if (ketuaRT) {
    const candidates = validOfficials.filter(o => o.id !== ketuaRT.id);

    coreLeaders = candidates.filter(
      o =>
        o.jabatan.toLowerCase().includes('wakil') ||
        o.jabatan.toLowerCase().includes('sekretaris') ||
        o.jabatan.toLowerCase().includes('bendahara')
    );

    // If no roles matched keywords but other officials exist, pick the first 3
    if (coreLeaders.length === 0 && candidates.length > 0) {
      coreLeaders = candidates.slice(0, 3);
      otherOfficials = candidates.slice(3);
    } else {
      otherOfficials = candidates.filter(
        o => !coreLeaders.some(c => c.id === o.id)
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Info - Vibrant & Bright */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-cyan-500/15 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-emerald-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md shrink-0">
              <Award className="w-6 h-6" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-3 py-0.5 rounded-full border border-emerald-300">
                  Kepengurusan Rukun Tetangga
                </span>
                <span className="text-xs font-semibold text-slate-500">• Masa Bakti 2026 - 2031</span>
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

      {/* Empty State Guard */}
      {validOfficials.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm">
          <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700 text-base">Belum Ada Data Pengurus</h3>
          <p className="text-xs text-slate-500 mt-1">
            Data susunan pengurus RT 01 sedang disiapkan oleh pengurus lingkungan.
          </p>
        </div>
      ) : (
        /* Dynamic Visual Hierarchy Tree (Bagan Struktur) */
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
          {/* Mobile Swipe Hint */}
          <div className="block sm:hidden bg-amber-50 border border-amber-200 rounded-2xl p-2.5 text-center text-xs text-amber-900 font-medium flex items-center justify-center gap-1.5">
            <MoveRight className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>Geser bagan ke kanan-kiri untuk melihat seluruh pengurus</span>
          </div>

          <div className="text-center mb-6 max-w-xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Bagan Resmi Kepengurusan (2026 - 2031)
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
              {/* Level 1: Ketua RT (Hanya tampil jika ada data valid) */}
              {ketuaRT && (
                <div className="w-84 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-5 rounded-3xl shadow-xl text-center border-2 border-emerald-300 relative hover:scale-102 transition-transform duration-300">
                  <div className="w-18 h-18 mx-auto mb-2.5 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md">
                    <img
                      src={
                        ketuaRT.fotoUrl ||
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
                      }
                      alt={ketuaRT.nama}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-950 bg-amber-300 px-3.5 py-0.5 rounded-full inline-block mb-1 shadow-2xs">
                    {ketuaRT.jabatan || 'Ketua RT 01'}
                  </span>
                  <h4 className="font-black text-base sm:text-lg tracking-tight">
                    {ketuaRT.nama}
                  </h4>
                  <p className="text-xs text-emerald-100 font-medium mt-0.5 flex items-center justify-center gap-1">
                    <Home className="w-3 h-3 text-amber-300" /> {ketuaRT.blokRumah}
                  </p>
                  {(coreLeaders.length > 0 || otherOfficials.length > 0) && (
                    <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-0.5 h-7 bg-emerald-400"></div>
                  )}
                </div>
              )}

              {/* Level 2: Core Executives (Wakil Ketua, Sekretaris, Bendahara) */}
              {coreLeaders.length > 0 && (
                <div className="pt-7 w-full flex justify-center gap-5 sm:gap-6 relative">
                  {coreLeaders.length > 1 && (
                    <div className="absolute top-7 left-1/6 right-1/6 h-0.5 bg-emerald-300"></div>
                  )}

                  {coreLeaders.map(leader => (
                    <div
                      key={leader.id}
                      className="w-60 bg-gradient-to-br from-teal-700 via-teal-800 to-cyan-800 text-white p-4 rounded-2xl shadow-md text-center border border-teal-300/60 relative hover:scale-102 transition-transform"
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-0.5 h-7 bg-emerald-300"></div>
                      <div className="w-14 h-14 mx-auto mb-2 rounded-xl overflow-hidden border-2 border-white/50 shadow-xs">
                        <img
                          src={
                            leader.fotoUrl ||
                            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80'
                          }
                          alt={leader.nama}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase text-cyan-950 bg-cyan-200 px-2.5 py-0.5 rounded-full inline-block mb-1 truncate max-w-[200px]">
                        {leader.jabatan}
                      </span>
                      <h5 className="font-bold text-sm tracking-tight truncate">{leader.nama}</h5>
                      <p className="text-[11px] text-cyan-100 flex items-center justify-center gap-1 mt-0.5">
                        <Home className="w-3 h-3 text-cyan-300" /> {leader.blokRumah}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Level 3: Seksi-Seksi Lapangan & Pelayanan */}
              {otherOfficials.length > 0 && (
                <div className="mt-9 pt-7 border-t-2 border-dashed border-emerald-200 w-full">
                  <div className="text-center mb-5">
                    <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-300">
                      Koordinator Seksi Lapangan & Pelayanan Lingkungan
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                    {otherOfficials.map(sec => (
                      <div
                        key={sec.id}
                        className="bg-gradient-to-b from-emerald-50/50 to-white p-4 rounded-2xl border border-emerald-200 text-center shadow-xs flex flex-col justify-between hover:border-emerald-400 transition-all"
                      >
                        <div>
                          <div className="w-12 h-12 mx-auto mb-2 rounded-xl overflow-hidden border border-emerald-300 shadow-2xs">
                            <img
                              src={
                                sec.fotoUrl ||
                                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80'
                              }
                              alt={sec.nama}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full block mb-1 truncate">
                            {sec.jabatan}
                          </span>
                          <div className="font-bold text-xs text-slate-900 truncate">
                            {sec.nama}
                          </div>
                          <span className="text-[10px] text-slate-500 block mt-0.5 truncate">
                            {sec.blokRumah}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
