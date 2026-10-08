import React, { useState } from 'react';
import { Official } from '../../types';
import {
  Award,
  GitBranch,
  Layers,
  Home,
  Phone,
  Sparkles,
  MoveRight,
  Edit3,
  Trash2,
  PlusCircle,
  Table as TableIcon,
  RotateCcw,
  UserCheck,
} from 'lucide-react';
import { EditPengurusModal } from './EditPengurusModal';
import { ConfirmDialog } from '../modals/ConfirmDialog';

interface AdminPengurusTabProps {
  officials: Official[];
  onSaveOfficial: (updatedOfficial: Official) => void;
  onDeleteOfficial: (id: string) => void;
  onResetOfficials?: () => void;
}

export const AdminPengurusTab: React.FC<AdminPengurusTabProps> = ({
  officials,
  onSaveOfficial,
  onDeleteOfficial,
  onResetOfficials,
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'hierarchy' | 'table'>('cards');
  const [selectedOfficialForEdit, setSelectedOfficialForEdit] = useState<Official | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [officialToDelete, setOfficialToDelete] = useState<Official | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleEditClick = (official: Official) => {
    setSelectedOfficialForEdit(official);
  };

  const handleAddNewClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOfficialForEdit(null);
    setIsAddModalOpen(false);
  };

  const handleSaveModal = (savedOfficial: Official) => {
    onSaveOfficial(savedOfficial);
    handleCloseModal();
  };

  const handleConfirmDelete = () => {
    if (officialToDelete) {
      onDeleteOfficial(officialToDelete.id);
      setOfficialToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info - Vibrant & Bright with Admin Mode badge & Tambah button */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-cyan-500/15 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-emerald-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md shrink-0">
              <Award className="w-6 h-6" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-3 py-0.5 rounded-full border border-emerald-300">
                  Kepengurusan Rukun Tetangga (Admin)
                </span>
                <span className="text-xs font-semibold text-slate-500">• Masa Bakti 2026 - 2031</span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-900 px-2.5 py-0.5 rounded-full">
                  Tambah • Edit • Hapus
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Kelola & Edit Pengurus RT 01 RW 12
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Admin dapat menambah pengurus baru, mengubah nama, mengunggah foto profil, mengedit tupoksi, dan menghapus pengurus.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons: Tambah Pengurus Baru + Switcher */}
        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-start md:justify-end">
          {/* Button Tambah Pengurus Baru */}
          <button
            onClick={handleAddNewClick}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer min-h-[40px]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tambah Pengurus</span>
          </button>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-white/90 p-1.5 rounded-2xl text-xs font-bold border border-emerald-200 shadow-xs">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer min-h-[36px] ${
                viewMode === 'cards'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kartu Pengurus</span>
              <span className="sm:hidden">Kartu</span>
            </button>

            <button
              onClick={() => setViewMode('hierarchy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer min-h-[36px] ${
                viewMode === 'hierarchy'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bagan Struktur</span>
              <span className="sm:hidden">Bagan</span>
            </button>

            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer min-h-[36px] ${
                viewMode === 'table'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tabel Ringkas</span>
              <span className="sm:hidden">Tabel</span>
            </button>
          </div>

          {onResetOfficials && (
            <button
              onClick={() => setIsResetConfirmOpen(true)}
              title="Kembalikan data pengurus ke data awal"
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer min-h-[40px] flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: Cards View with Direct Edit & Delete Buttons */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {officials.map(off => (
            <div
              key={off.id}
              className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-emerald-300 transition-all group"
            >
              <div className="p-5 flex items-start gap-4">
                <div className="relative shrink-0">
                  <img
                    src={off.fotoUrl}
                    alt={off.nama}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-200 shadow-xs"
                  />
                  <button
                    onClick={() => handleEditClick(off)}
                    title="Ganti Foto atau Edit Data"
                    className="absolute -bottom-1.5 -right-1.5 p-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-lg inline-block mb-1">
                    {off.jabatan}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base leading-tight truncate">
                    {off.nama}
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1 font-medium">
                    <Home className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{off.blokRumah}</span>
                  </div>
                  <div className="text-[11px] text-teal-700 font-semibold mt-0.5">
                    WA: {off.noHp}
                  </div>
                </div>
              </div>

              {/* Tupoksi Preview */}
              {off.tupoksi && off.tupoksi.length > 0 && (
                <div className="px-5 pb-3">
                  <div className="text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-emerald-600" />
                    Tupoksi Utama:
                  </div>
                  <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside bg-slate-50/70 p-2.5 rounded-xl border border-slate-100 line-clamp-2">
                    {off.tupoksi.slice(0, 2).map((t, idx) => (
                      <li key={idx} className="truncate">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons: Edit & Hapus */}
              <div className="p-4 pt-1 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => handleEditClick(off)}
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer min-h-[38px]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Pengurus
                </button>

                <button
                  onClick={() => setOfficialToDelete(off)}
                  title="Hapus Pengurus"
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border border-rose-200 transition-colors cursor-pointer shrink-0 min-h-[38px] min-w-[38px] flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/62${off.noHp.replace(/^0/, '')}?text=Halo%20${encodeURIComponent(
                    off.jabatan
                  )}%20${encodeURIComponent(off.nama)},%20pesan%20dari%20Admin%20RT`}
                  target="_blank"
                  rel="noreferrer"
                  title="Hubungi via WhatsApp"
                  className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors cursor-pointer shrink-0 min-h-[38px] min-w-[38px] flex items-center justify-center"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: Hierarchy Tree with Edit & Delete */}
      {viewMode === 'hierarchy' && (
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
          {/* Mobile Swipe Hint */}
          <div className="block sm:hidden bg-amber-50 border border-amber-200 rounded-2xl p-2.5 text-center text-xs text-amber-900 font-medium flex items-center justify-center gap-1.5">
            <MoveRight className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>Geser bagan ke samping untuk melihat seluruh posisi</span>
          </div>

          <div className="text-center mb-6 max-w-xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Bagan Interaktif Pengurus (Mode Edit)
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Bagan Organisasi RT 01 RW 12 Cluster Arcadia
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Klik tombol &quot;Edit&quot; atau &quot;Hapus&quot; pada setiap posisi untuk memperbarui susunan pengurus.
            </p>
          </div>

          <div className="overflow-x-auto pb-4 touch-pan-x">
            <div className="min-w-[760px] flex flex-col items-center py-2">
              {/* Level 1: Ketua RT */}
              {officials[0] && (
                <div className="w-84 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-5 rounded-3xl shadow-xl text-center border-2 border-emerald-300 relative group">
                  <div className="w-18 h-18 mx-auto mb-2.5 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md">
                    <img
                      src={officials[0].fotoUrl}
                      alt={officials[0].nama}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-950 bg-amber-300 px-3.5 py-0.5 rounded-full inline-block mb-1 shadow-2xs">
                    {officials[0].jabatan}
                  </span>
                  <h4 className="font-black text-base sm:text-lg tracking-tight">
                    {officials[0].nama}
                  </h4>
                  <p className="text-xs text-emerald-100 font-medium mt-0.5 flex items-center justify-center gap-1">
                    <Home className="w-3 h-3 text-amber-300" /> {officials[0].blokRumah}
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEditClick(officials[0])}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/20 hover:bg-white text-white hover:text-emerald-950 text-xs font-bold transition-all cursor-pointer border border-white/30"
                    >
                      <Edit3 className="w-3 h-3" />
                      Edit
                    </button>
                    {officials.length > 1 && (
                      <button
                        onClick={() => setOfficialToDelete(officials[0])}
                        className="p-1 rounded-xl bg-rose-500/30 hover:bg-rose-600 text-white text-xs font-bold transition-all cursor-pointer border border-white/20"
                        title="Hapus"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-0.5 h-7 bg-emerald-400"></div>
                </div>
              )}

              {/* Level 2: Wakil Ketua, Sekretaris, Bendahara */}
              <div className="pt-7 w-full flex justify-center gap-6 relative">
                <div className="absolute top-7 left-1/6 right-1/6 h-0.5 bg-emerald-300"></div>

                {/* Wakil Ketua */}
                {officials[1] && (
                  <div className="w-60 bg-gradient-to-br from-cyan-600 to-teal-700 text-white p-4 rounded-2xl shadow-md text-center border border-cyan-300/60 relative">
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-0.5 h-7 bg-emerald-300"></div>
                    <div className="w-14 h-14 mx-auto mb-2 rounded-xl overflow-hidden border-2 border-white/50 shadow-xs">
                      <img
                        src={officials[1].fotoUrl}
                        alt={officials[1].nama}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase text-cyan-950 bg-cyan-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
                      {officials[1].jabatan}
                    </span>
                    <h5 className="font-extrabold text-sm truncate">{officials[1].nama}</h5>
                    <p className="text-[11px] text-cyan-100 mt-0.5">{officials[1].blokRumah}</p>
                    <div className="mt-2.5 flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleEditClick(officials[1])}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-cyan-950 text-[11px] font-bold transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => setOfficialToDelete(officials[1])}
                        className="p-1 rounded-lg bg-rose-500/30 hover:bg-rose-600 text-white text-[11px] font-bold transition-all cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Sekretaris */}
                {officials[2] && (
                  <div className="w-60 bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-4 rounded-2xl shadow-md text-center border border-emerald-300/60 relative">
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-0.5 h-7 bg-emerald-300"></div>
                    <div className="w-14 h-14 mx-auto mb-2 rounded-xl overflow-hidden border-2 border-white/50 shadow-xs">
                      <img
                        src={officials[2].fotoUrl}
                        alt={officials[2].nama}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase text-emerald-950 bg-emerald-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
                      {officials[2].jabatan}
                    </span>
                    <h5 className="font-extrabold text-sm truncate">{officials[2].nama}</h5>
                    <p className="text-[11px] text-emerald-100 mt-0.5">{officials[2].blokRumah}</p>
                    <div className="mt-2.5 flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleEditClick(officials[2])}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-emerald-950 text-[11px] font-bold transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => setOfficialToDelete(officials[2])}
                        className="p-1 rounded-lg bg-rose-500/30 hover:bg-rose-600 text-white text-[11px] font-bold transition-all cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Bendahara */}
                {officials[3] && (
                  <div className="w-60 bg-gradient-to-br from-amber-600 to-teal-800 text-white p-4 rounded-2xl shadow-md text-center border border-amber-300/60 relative">
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-0.5 h-7 bg-emerald-300"></div>
                    <div className="w-14 h-14 mx-auto mb-2 rounded-xl overflow-hidden border-2 border-white/50 shadow-xs">
                      <img
                        src={officials[3].fotoUrl}
                        alt={officials[3].nama}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase text-amber-950 bg-amber-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
                      {officials[3].jabatan}
                    </span>
                    <h5 className="font-extrabold text-sm truncate">{officials[3].nama}</h5>
                    <p className="text-[11px] text-amber-100 mt-0.5">{officials[3].blokRumah}</p>
                    <div className="mt-2.5 flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleEditClick(officials[3])}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-amber-950 text-[11px] font-bold transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => setOfficialToDelete(officials[3])}
                        className="p-1 rounded-lg bg-rose-500/30 hover:bg-rose-600 text-white text-[11px] font-bold transition-all cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Garis Penghubung ke Seksi-Seksi */}
              <div className="w-0.5 h-8 bg-emerald-300 my-2"></div>

              {/* Level 3: Seksi-Seksi Bidang */}
              <div className="w-full">
                <div className="text-center mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-100 px-3 py-1 rounded-full border border-teal-300">
                    Koordinator Seksi & Bidang Pelayanan
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {officials.slice(4).map((sec, idx) => (
                    <div
                      key={sec.id || idx}
                      className="bg-white p-3.5 rounded-2xl border-2 border-emerald-100 hover:border-emerald-300 text-center shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-11 h-11 mx-auto mb-2 rounded-xl overflow-hidden border border-slate-200">
                          <img
                            src={sec.fotoUrl}
                            alt={sec.nama}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[9px] font-black uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-1 line-clamp-1 border border-emerald-200">
                          {sec.jabatan}
                        </span>
                        <div className="font-bold text-xs text-slate-900 truncate">{sec.nama}</div>
                        <span className="text-[10px] text-slate-500 block mt-0.5">{sec.blokRumah}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleEditClick(sec)}
                          className="flex-1 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 text-[10px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1 border border-emerald-200"
                        >
                          <Edit3 className="w-2.5 h-2.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => setOfficialToDelete(sec)}
                          className="p-1 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 text-[10px] font-bold transition-colors cursor-pointer border border-rose-200"
                          title="Hapus"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Table View with Action Buttons */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-emerald-100 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
              Daftar Seluruh Pengurus RT
            </h3>
            <button
              onClick={handleAddNewClick}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Tambah
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-black tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Pengurus</th>
                  <th className="py-3 px-4">Jabatan</th>
                  <th className="py-3 px-4">Blok Domisili</th>
                  <th className="py-3 px-4">Nomor WhatsApp</th>
                  <th className="py-3 px-4">Periode</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {officials.map(off => (
                  <tr key={off.id} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={off.fotoUrl}
                          alt={off.nama}
                          className="w-9 h-9 rounded-xl object-cover border border-emerald-200 shrink-0"
                        />
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          {off.nama}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-lg text-[11px]">
                        {off.jabatan}
                      </span>
                    </td>
                    <td className="py-3 px-4">{off.blokRumah}</td>
                    <td className="py-3 px-4 font-mono text-emerald-700">{off.noHp}</td>
                    <td className="py-3 px-4 text-slate-500">{off.periode}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleEditClick(off)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer border border-emerald-200"
                        >
                          <Edit3 className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => setOfficialToDelete(off)}
                          className="p-1 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors cursor-pointer border border-rose-200"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Add / Edit Pengurus */}
      <EditPengurusModal
        isOpen={selectedOfficialForEdit !== null || isAddModalOpen}
        onClose={handleCloseModal}
        official={selectedOfficialForEdit}
        onSave={handleSaveModal}
        nextOrder={officials.length + 1}
      />

      {/* Modal Confirm Delete Pengurus */}
      <ConfirmDialog
        isOpen={!!officialToDelete}
        title="Hapus Pengurus RT?"
        message={`Apakah Anda yakin ingin menghapus data pengurus "${officialToDelete?.nama}" (${officialToDelete?.jabatan}) dari struktur RT 01 RW 12?`}
        confirmText="Ya, Hapus Pengurus"
        cancelText="Batal"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setOfficialToDelete(null)}
      />

      {/* Modal Confirm Reset to Defaults */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        title="Kembalikan Pengurus ke Awal?"
        message="Semua perubahan susunan pengurus RT akan dikembalikan ke data susunan standar awal RT 01 RW 12."
        confirmText="Ya, Reset Data"
        cancelText="Batal"
        isDestructive={true}
        onConfirm={() => {
          if (onResetOfficials) onResetOfficials();
          setIsResetConfirmOpen(false);
        }}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
};
