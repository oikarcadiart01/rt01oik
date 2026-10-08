import React from 'react';
import { ProfilAreaSection } from '../common/ProfilAreaSection';
import { MapPin } from 'lucide-react';

export const ProfilWilayahTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Profile - Radiant Emerald & Sky Gradient */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-sky-500/15 rounded-3xl p-6 sm:p-8 border border-emerald-200/90 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs inline-block">
              Profil Lingkungan & Wilayah
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
              RT 01 RW 12 Cluster Arcadia
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl">
              Perumahan Oma Indah Kapuk, Desa Suwayuwo, Kecamatan Sukorejo, Kabupaten Pasuruan, Jawa Timur (Kode Pos 67161)
            </p>
          </div>

          <div className="flex items-center gap-3.5 bg-white/90 p-4 rounded-2xl border border-emerald-200 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="text-xs">
              <span className="font-extrabold text-slate-900 block text-xs sm:text-sm">Akses Strategis:</span>
              <span className="text-slate-600 font-medium">Poros Surabaya - Malang KM 48 Sukorejo</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-emerald-200/70 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-emerald-100 shadow-2xs space-y-1.5">
            <span className="font-extrabold text-slate-900 block text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Blok Hunian
            </span>
            <p className="text-slate-600 leading-relaxed font-medium">
              Terdiri dari 4 Blok (Blok A, Blok B, Blok C, Blok D) dengan total lebih dari 45 unit rumah hunian berkonsep klaster asri dan modern.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-teal-100 shadow-2xs space-y-1.5">
            <span className="font-extrabold text-slate-900 block text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
              Fasilitas Bersama
            </span>
            <p className="text-slate-600 leading-relaxed font-medium">
              Gerbang One-Gate System dengan Pos Satpam 24 Jam, Taman Bundaran, Balai/Gazebo Warga, Lampu PJU mandiri, dan Saluran Drainase Resapan.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-sky-100 shadow-2xs space-y-1.5">
            <span className="font-extrabold text-slate-900 block text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              Prinsip Paguyuban
            </span>
            <p className="text-slate-600 leading-relaxed font-medium">
              Mengedepankan asas kekeluargaan, kegotongroyongan, transparansi pengelolaan kas, serta kenyamanan dan keamanan bagi seluruh penghuni.
            </p>
          </div>
        </div>
      </div>

      {/* Foto Dokumentasi Area RT 01 & Peta Maps Interaktif */}
      <ProfilAreaSection />
    </div>
  );
};
