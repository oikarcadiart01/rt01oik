import React from 'react';
import { TataTertibRule } from '../../types';
import { INITIAL_TATATERTIB_RULES } from '../../data/initialData';
import {
  Shield,
  Trash2,
  Clock,
  Car,
  HeartHandshake,
  AlertCircle,
  Sparkles,
  Check,
  CheckCircle2,
} from 'lucide-react';

interface TataTertibTabProps {
  rules?: TataTertibRule[];
}

const getPasalTheme = (pasal: number) => {
  switch (pasal % 6) {
    case 1:
      return {
        badgeBg: 'bg-blue-50 text-blue-700',
        borderColor: 'border-blue-200',
        headerBorder: 'border-blue-100',
        iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
        checkColor: 'text-blue-600',
        icon: Shield,
      };
    case 2:
      return {
        badgeBg: 'bg-emerald-50 text-emerald-700',
        borderColor: 'border-emerald-200',
        headerBorder: 'border-emerald-100',
        iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
        checkColor: 'text-emerald-600',
        icon: Trash2,
      };
    case 3:
      return {
        badgeBg: 'bg-amber-50 text-amber-800',
        borderColor: 'border-amber-200',
        headerBorder: 'border-amber-100',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
        checkColor: 'text-amber-600',
        icon: Clock,
      };
    case 4:
      return {
        badgeBg: 'bg-rose-50 text-rose-700',
        borderColor: 'border-rose-200',
        headerBorder: 'border-rose-100',
        iconBg: 'bg-gradient-to-br from-rose-500 to-red-600',
        checkColor: 'text-rose-600',
        icon: CheckCircle2,
      };
    case 5:
      return {
        badgeBg: 'bg-violet-50 text-violet-700',
        borderColor: 'border-violet-200',
        headerBorder: 'border-violet-100',
        iconBg: 'bg-gradient-to-br from-violet-500 to-purple-600',
        checkColor: 'text-violet-600',
        icon: Car,
      };
    case 0:
    default:
      return {
        badgeBg: 'bg-teal-50 text-teal-700',
        borderColor: 'border-teal-200',
        headerBorder: 'border-teal-100',
        iconBg: 'bg-gradient-to-br from-teal-500 to-cyan-600',
        checkColor: 'text-teal-600',
        icon: HeartHandshake,
      };
  }
};

export const TataTertibTab: React.FC<TataTertibTabProps> = ({ rules = INITIAL_TATATERTIB_RULES }) => {
  const displayRules = rules && rules.length > 0 ? rules : INITIAL_TATATERTIB_RULES;

  return (
    <div className="space-y-6">
      {/* Header Banner - Radiant Emerald & Teal */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden border border-emerald-400/40">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-10 -bottom-10 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-amber-200 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Musyawarah Warga RT 01 RW 12 Cluster Arcadia</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-tight drop-shadow-xs">
            Tata Tertib & Peraturan Warga Cluster Arcadia
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-teal-50/95 leading-relaxed font-normal">
            Pedoman kerukunan, ketertiban, keamanan, dan kebersihan yang disepakati bersama oleh seluruh warga <strong>RT 01 RW 12 Cluster Arcadia, Perumahan Oma Indah Kapuk, Desa Suwayuwo, Sukorejo, Pasuruan</strong> demi mewujudkan hunian yang aman, nyaman, dan harmonis.
          </p>

          <div className="mt-4 pt-4 border-t border-teal-400/30 flex flex-wrap items-center gap-3 text-xs text-teal-100">
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>Berlaku untuk Warga Tetap, Kontrak & Tamu</span>
            </span>
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10 font-medium">
              <Shield className="w-3.5 h-3.5 text-cyan-300" />
              <span>Dijaga Bersama Pengurus RT & Pos Satpam 24 Jam</span>
            </span>
          </div>
        </div>
      </div>

      {/* Grid Kategori Tata Tertib Lengkap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {displayRules.map(rule => {
          const theme = getPasalTheme(rule.pasal);
          const IconComponent = theme.icon;

          return (
            <div
              key={rule.id || `rule-${rule.pasal}`}
              className={`bg-white rounded-3xl p-6 border ${theme.borderColor} shadow-sm space-y-3 hover:shadow-md transition-shadow`}
            >
              <div className={`flex items-center gap-3 pb-3 border-b ${theme.headerBorder}`}>
                <span className={`p-3 ${theme.iconBg} text-white rounded-2xl shadow-xs shrink-0`}>
                  <IconComponent className="w-6 h-6" />
                </span>
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${theme.badgeBg}`}>
                    Pasal {rule.pasal} • {rule.kategori}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base mt-0.5">
                    {rule.pasal}. {rule.judul}
                  </h3>
                </div>
              </div>

              {rule.deskripsiSingkat && (
                <p className="text-xs text-slate-500 italic pb-1">
                  {rule.deskripsiSingkat}
                </p>
              )}

              <ul className="space-y-2.5 text-xs text-slate-600 font-medium leading-relaxed">
                {rule.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${theme.checkColor} shrink-0 mt-0.5`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Catatan Sanksi & Pengaduan Pelanggaran */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-start gap-3.5">
          <span className="p-3 bg-amber-500 text-white rounded-2xl shadow-xs shrink-0 mt-0.5">
            <AlertCircle className="w-6 h-6" />
          </span>
          <div className="space-y-1.5">
            <h4 className="font-extrabold text-slate-900 text-base">
              Mekanisme Penyelesaian Masalah & Pelanggaran
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Pelanggaran terhadap tata tertib ini akan diselesaikan secara bertahap melalui pendekatan kekeluargaan dan musyawarah oleh Pengurus RT dan Tokoh Warga:
            </p>
            <ol className="list-decimal list-inside text-xs text-slate-700 space-y-1 pt-1 font-medium">
              <li><strong>Teguran Lisan Pertama:</strong> Pendekatan santun secara langsung oleh Ketua RT / Pengurus RT terkait.</li>
              <li><strong>Teguran Tertulis Kedua:</strong> Surat pemberitahuan resmi dari Pengurus RT jika pelanggaran berulang.</li>
              <li><strong>Musyawarah Paguyuban / Koordinasi Perangkat Desa:</strong> Apabila teguran tidak diindahkan dan mengganggu ketenteraman umum.</li>
            </ol>
            <p className="text-xs text-slate-500 pt-2">
              Untuk menyampaikan masukan atau keluhan lingkungan, warga dapat menggunakan menu <strong>Pengaduan Warga</strong> di portal RT 01.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
