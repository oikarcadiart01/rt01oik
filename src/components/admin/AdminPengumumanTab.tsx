import React, { useState } from 'react';
import { RTAnnouncement } from '../../types';
import { formatDateIndo } from '../../utils/formatters';
import {
  Bell,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  User,
  Megaphone,
} from 'lucide-react';
import { AddEditPengumumanModal } from './AddEditPengumumanModal';

interface AdminPengumumanTabProps {
  announcements: RTAnnouncement[];
  onSaveAnnouncement: (announcement: RTAnnouncement) => void;
  onDeleteAnnouncement: (id: string) => void;
}

export const AdminPengumumanTab: React.FC<AdminPengumumanTabProps> = ({
  announcements,
  onSaveAnnouncement,
  onDeleteAnnouncement,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrioritas, setSelectedPrioritas] = useState<string>('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<RTAnnouncement | null>(null);
  const [announcementToDelete, setAnnouncementToDelete] = useState<RTAnnouncement | null>(null);

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch =
      ann.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.isi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.dibuatOleh.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrioritas =
      selectedPrioritas === 'Semua' ||
      ann.prioritas === selectedPrioritas ||
      (selectedPrioritas === 'Normal' && (ann.prioritas === 'Biasa' || ann.prioritas === 'Normal'));

    return matchesSearch && matchesPrioritas;
  });

  const handleOpenAdd = () => {
    setEditingAnnouncement(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ann: RTAnnouncement) => {
    setEditingAnnouncement(ann);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (announcementToDelete) {
      onDeleteAnnouncement(announcementToDelete.id);
      setAnnouncementToDelete(null);
    }
  };

  const totalDarurat = announcements.filter(a => a.prioritas === 'Darurat').length;
  const totalPenting = announcements.filter(a => a.prioritas === 'Penting').length;
  const totalNormal = announcements.filter(a => a.prioritas === 'Normal' || a.prioritas === 'Biasa').length;

  return (
    <div className="space-y-6">
      {/* Header Banner Mode Admin */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden border border-emerald-400/40">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-10 -bottom-10 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-amber-200 text-xs font-bold mb-2 shadow-2xs">
              <Megaphone className="w-3.5 h-3.5 text-amber-300" />
              <span>Kelola Warta & Edaran Resmi</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              Pengumuman & Warta Warga
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-teal-100 max-w-2xl font-normal">
              Publikasikan instruksi gotong royong, info keamanan, tagihan iuran, maupun surat edaran resmi kepada seluruh warga Cluster Arcadia.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer min-h-[46px] shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Pengumuman Baru</span>
          </button>
        </div>

        {/* Quick Summary Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 pt-4 border-t border-teal-400/30 text-xs">
          <div className="bg-black/20 backdrop-blur-xs rounded-xl p-2.5 border border-white/10">
            <span className="text-teal-200 block text-[10px]">Total Terbit</span>
            <span className="text-base font-black text-white">{announcements.length} Kabar</span>
          </div>
          <div className="bg-black/20 backdrop-blur-xs rounded-xl p-2.5 border border-white/10">
            <span className="text-rose-200 block text-[10px]">Prioritas Darurat</span>
            <span className="text-base font-black text-rose-300">{totalDarurat}</span>
          </div>
          <div className="bg-black/20 backdrop-blur-xs rounded-xl p-2.5 border border-white/10">
            <span className="text-amber-200 block text-[10px]">Prioritas Penting</span>
            <span className="text-base font-black text-amber-300">{totalPenting}</span>
          </div>
          <div className="bg-black/20 backdrop-blur-xs rounded-xl p-2.5 border border-white/10">
            <span className="text-emerald-200 block text-[10px]">Informasi Normal</span>
            <span className="text-base font-black text-emerald-300">{totalNormal}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Cari judul, isi, atau penerbit pengumuman..."
            className="w-full pl-9 pr-3.5 py-2.5 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto justify-center">
          {['Semua', 'Darurat', 'Penting', 'Normal'].map(prioritas => (
            <button
              key={prioritas}
              onClick={() => setSelectedPrioritas(prioritas)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                selectedPrioritas === prioritas
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {prioritas}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-extrabold text-slate-800 text-base">Tidak ada pengumuman ditemukan</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchTerm || selectedPrioritas !== 'Semua'
                ? 'Coba ganti kata kunci pencarian atau ubah filter prioritas di atas.'
                : 'Belum ada pengumuman yang diterbitkan. Klik tombol Tambah Pengumuman di atas.'}
            </p>
          </div>
        ) : (
          filteredAnnouncements.map(ann => (
            <div
              key={ann.id}
              className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all shadow-xs hover:shadow-md ${
                ann.prioritas === 'Darurat'
                  ? 'border-rose-300 border-l-6 border-l-rose-500'
                  : ann.prioritas === 'Penting'
                  ? 'border-amber-300 border-l-6 border-l-amber-500'
                  : 'border-emerald-300 border-l-6 border-l-emerald-500'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
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
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDateIndo(ann.tanggal)}
                  </span>
                </div>

                {/* Edit & Delete Action Buttons */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <button
                    onClick={() => handleOpenEdit(ann)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setAnnouncementToDelete(ann)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>

              <div className="mt-3.5">
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                  {ann.judul}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed whitespace-pre-line">
                  {ann.isi}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Diterbitkan oleh: <strong className="text-slate-800">{ann.dibuatOleh}</strong>
                </span>

                <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Resmi Terbit
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      <AddEditPengumumanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        announcementToEdit={editingAnnouncement}
        onSave={onSaveAnnouncement}
      />

      {/* Delete Confirmation Modal */}
      {announcementToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-rose-200 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Hapus Pengumuman?</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Apakah Anda yakin ingin menghapus pengumuman <strong>"{announcementToDelete.judul}"</strong>? Warga tidak akan dapat melihat pengumuman ini lagi.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2.5">
              <button
                onClick={() => setAnnouncementToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Ya, Hapus Pengumuman
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
