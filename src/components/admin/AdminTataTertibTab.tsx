import React, { useState } from 'react';
import { TataTertibRule } from '../../types';
import { AddEditTataTertibModal } from './AddEditTataTertibModal';
import { ConfirmDialog } from '../modals/ConfirmDialog';
import {
  FileText,
  PlusCircle,
  Search,
  Edit3,
  Trash2,
  CheckCircle2,
  Shield,
  Trash,
  Clock,
  Car,
  HeartHandshake,
  AlertCircle,
  Layers,
} from 'lucide-react';

interface AdminTataTertibTabProps {
  rules: TataTertibRule[];
  onSaveRule: (rule: TataTertibRule) => void;
  onDeleteRule: (id: string) => void;
}

const getCategoryBadgeColor = (kategori: string) => {
  const k = kategori.toLowerCase();
  if (k.includes('keamanan')) return 'bg-blue-50 text-blue-700 border-blue-200';
  if (k.includes('kebersihan')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (k.includes('kenyamanan') || k.includes('tenang')) return 'bg-amber-50 text-amber-800 border-amber-200';
  if (k.includes('keuangan') || k.includes('iuran')) return 'bg-rose-50 text-rose-700 border-rose-200';
  if (k.includes('lintas') || k.includes('parkir')) return 'bg-violet-50 text-violet-700 border-violet-200';
  return 'bg-teal-50 text-teal-700 border-teal-200';
};

export const AdminTataTertibTab: React.FC<AdminTataTertibTabProps> = ({
  rules,
  onSaveRule,
  onDeleteRule,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('Semua');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [ruleToEdit, setRuleToEdit] = useState<TataTertibRule | null>(null);
  const [ruleToDelete, setRuleToDelete] = useState<TataTertibRule | null>(null);

  const categories = [
    'Semua',
    'Keamanan & Ketertiban',
    'Kebersihan Lingkungan',
    'Kenyamanan Hunian',
    'Keuangan & Fasilitas',
    'Lalu Lintas Lingkungan',
    'Sosial & Fasilitas Umum',
  ];

  const filteredRules = rules.filter(r => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      r.judul.toLowerCase().includes(q) ||
      `pasal ${r.pasal}`.includes(q) ||
      r.kategori.toLowerCase().includes(q) ||
      (r.deskripsiSingkat && r.deskripsiSingkat.toLowerCase().includes(q)) ||
      r.items.some(item => item.toLowerCase().includes(q));

    const matchCat =
      selectedKategori === 'Semua' ||
      r.kategori.toLowerCase().includes(selectedKategori.toLowerCase().split(' ')[0]);

    return matchSearch && matchCat;
  });

  const sortedRules = [...filteredRules].sort((a, b) => a.pasal - b.pasal);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-cyan-800 text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden border border-teal-500/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-bold mb-2.5">
              <FileText className="w-3.5 h-3.5 text-amber-300" />
              <span>Kelola Pedoman & Peraturan Warga</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Tata Tertib & Peraturan Warga
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 max-w-xl mt-0.5">
              Tambah, edit pasal, perbarui butir klausul aturan lingkungan, dan atur pedoman ketertiban Cluster Arcadia secara langsung.
            </p>
          </div>

          <button
            onClick={() => {
              setRuleToEdit(null);
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-teal-800 hover:bg-teal-50 text-xs sm:text-sm font-black shadow-md transition-all shrink-0 hover:scale-102 active:scale-98 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-teal-700" />
            <span>Tambah Pasal / Aturan Baru</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-teal-100 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nomor pasal, judul aturan, atau kata kunci butir..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedKategori(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedKategori === cat
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sortedRules.map(rule => {
          const badgeClass = getCategoryBadgeColor(rule.kategori);

          return (
            <div
              key={rule.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-xs shrink-0">
                      P.{rule.pasal}
                    </span>
                    <div>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${badgeClass}`}>
                        Pasal {rule.pasal} • {rule.kategori}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-base mt-0.5 leading-snug">
                        {rule.pasal}. {rule.judul}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setRuleToEdit(rule);
                        setIsAddModalOpen(true);
                      }}
                      className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                      title="Edit Pasal"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setRuleToDelete(rule)}
                      className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                      title="Hapus Pasal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {rule.deskripsiSingkat && (
                  <p className="text-xs text-slate-500 italic pb-1">
                    {rule.deskripsiSingkat}
                  </p>
                )}

                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Butir Aturan ({rule.items.length})
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700 font-medium leading-relaxed">
                    {rule.items.map((clause, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{clause}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Berlaku untuk seluruh warga & tamu</span>
                <button
                  onClick={() => {
                    setRuleToEdit(rule);
                    setIsAddModalOpen(true);
                  }}
                  className="font-bold text-teal-700 hover:underline cursor-pointer"
                >
                  Edit / Tambah Butir
                </button>
              </div>
            </div>
          );
        })}

        {sortedRules.length === 0 && (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 text-sm">Tidak ada pasal tata tertib ditemukan</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Silakan tambahkan pasal tata tertib baru atau sesuaikan kata kunci pencarian.
            </p>
          </div>
        )}
      </div>

      {/* Modal Add / Edit */}
      <AddEditTataTertibModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setRuleToEdit(null);
        }}
        onSave={onSaveRule}
        ruleToEdit={ruleToEdit}
      />

      {/* Dialog Konfirmasi Hapus */}
      <ConfirmDialog
        isOpen={!!ruleToDelete}
        title="Hapus Pasal Tata Tertib"
        message={`Apakah Anda yakin ingin menghapus "Pasal ${ruleToDelete?.pasal}: ${ruleToDelete?.judul}" beserta seluruh butir ketentuannya?`}
        confirmText="Ya, Hapus Pasal"
        isDestructive={true}
        onConfirm={() => {
          if (ruleToDelete) {
            onDeleteRule(ruleToDelete.id);
            setRuleToDelete(null);
          }
        }}
        onCancel={() => setRuleToDelete(null)}
      />
    </div>
  );
};
