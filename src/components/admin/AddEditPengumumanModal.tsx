import React, { useState, useEffect } from 'react';
import { RTAnnouncement } from '../../types';
import { X, Bell, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

interface AddEditPengumumanModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcementToEdit?: RTAnnouncement | null;
  onSave: (announcement: RTAnnouncement) => void;
}

export const AddEditPengumumanModal: React.FC<AddEditPengumumanModalProps> = ({
  isOpen,
  onClose,
  announcementToEdit,
  onSave,
}) => {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [prioritas, setPrioritas] = useState<'Darurat' | 'Penting' | 'Normal'>('Penting');
  const [dibuatOleh, setDibuatOleh] = useState('Pengurus RT 01');

  useEffect(() => {
    if (announcementToEdit) {
      setJudul(announcementToEdit.judul);
      setIsi(announcementToEdit.isi);
      setTanggal(announcementToEdit.tanggal);
      setPrioritas(
        announcementToEdit.prioritas === 'Biasa'
          ? 'Normal'
          : (announcementToEdit.prioritas as 'Darurat' | 'Penting' | 'Normal')
      );
      setDibuatOleh(announcementToEdit.dibuatOleh || 'Pengurus RT 01');
    } else {
      setJudul('');
      setIsi('');
      setTanggal(new Date().toISOString().split('T')[0]);
      setPrioritas('Penting');
      setDibuatOleh('Pengurus RT 01 RW 12');
    }
  }, [announcementToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim() || !isi.trim()) return;

    const savedAnnouncement: RTAnnouncement = {
      id: announcementToEdit ? announcementToEdit.id : `ann-${Date.now()}`,
      judul: judul.trim(),
      isi: isi.trim(),
      tanggal: tanggal || new Date().toISOString().split('T')[0],
      prioritas,
      dibuatOleh: dibuatOleh.trim() || 'Pengurus RT 01',
    };

    onSave(savedAnnouncement);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-white/20 rounded-2xl">
              <Bell className="w-5 h-5 text-amber-200" />
            </span>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                {announcementToEdit ? 'Edit Pengumuman Warga' : 'Tambah Pengumuman Baru'}
              </h3>
              <p className="text-xs text-teal-100">
                Publikasikan edaran atau informasi penting untuk seluruh warga
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Judul Pengumuman <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={judul}
              onChange={e => setJudul(e.target.value)}
              placeholder="Contoh: Jadwal Fogging & Kerja Bakti Kebersihan Lingkungan"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs sm:text-sm outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Prioritas Pemberitahuan
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Normal', 'Penting', 'Darurat'] as const).map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPrioritas(p)}
                    className={`py-2 text-xs font-extrabold rounded-xl border transition-all cursor-pointer ${
                      prioritas === p
                        ? p === 'Darurat'
                          ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                          : p === 'Penting'
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                          : 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {p === 'Normal' ? 'Normal' : p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tanggal Pengumuman
              </label>
              <input
                type="date"
                required
                value={tanggal}
                onChange={e => setTanggal(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs sm:text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Diterbitkan Oleh (Instansi/Pengurus)
            </label>
            <input
              type="text"
              value={dibuatOleh}
              onChange={e => setDibuatOleh(e.target.value)}
              placeholder="Contoh: Ketua RT 01 RW 12 atau Sie. Keamanan"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs sm:text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Isi Detail Pengumuman <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={isi}
              onChange={e => setIsi(e.target.value)}
              placeholder="Tuliskan isi instruksi, himbauan, waktu pelaksanaan, atau detail lengkap untuk warga Cluster Arcadia..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs sm:text-sm outline-none resize-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{announcementToEdit ? 'Simpan Perubahan' : 'Terbitkan Pengumuman'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
