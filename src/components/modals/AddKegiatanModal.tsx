import React, { useState } from 'react';
import { CommunityEvent, EventStatus } from '../../types';
import { X, CalendarPlus, MapPin, Clock } from 'lucide-react';

interface AddKegiatanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CommunityEvent) => void;
}

export const AddKegiatanModal: React.FC<AddKegiatanModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [waktu, setWaktu] = useState('07:00 - 10:00 WIB');
  const [lokasi, setLokasi] = useState('Pos Satpam / Taman Cluster Arcadia');
  const [kategori, setKategori] = useState<CommunityEvent['kategori']>('Kerja Bakti');
  const [penanggungJawab, setPenanggungJawab] = useState('Ketua RT 01 (Bpk. Bambang Prasetyo)');
  const [targetPeserta, setTargetPeserta] = useState('Seluruh Warga Cluster Arcadia');
  const [fotoUrl, setFotoUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !tanggal || !lokasi) return;

    const newEv: CommunityEvent = {
      id: `ev-${Date.now()}`,
      judul,
      deskripsi,
      tanggal,
      waktu,
      lokasi,
      kategori,
      status: 'Akan Datang' as EventStatus,
      penanggungJawab,
      targetPeserta,
      rsvpCount: 1,
      fotoUrl: fotoUrl || 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&auto=format&fit=crop&q=80',
    };

    onSave(newEv);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <CalendarPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Buat Agenda Kegiatan RT</h3>
              <p className="text-xs text-emerald-100">Cluster Arcadia RT 01 RW 12 Suwayuwo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Kegiatan / Acara *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Kerja Bakti Massal Pembersihan Saluran Air"
              value={judul}
              onChange={e => setJudul(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kategori Kegiatan
              </label>
              <select
                value={kategori}
                onChange={e => setKategori(e.target.value as CommunityEvent['kategori'])}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="Kerja Bakti">Kerja Bakti</option>
                <option value="Ronda Malam">Ronda Malam</option>
                <option value="Posyandu">Posyandu</option>
                <option value="Sosial & Pengajian">Sosial & Pengajian</option>
                <option value="Olahraga">Olahraga</option>
                <option value="Rapat Warga">Rapat Warga</option>
                <option value="Peringatan Hari Besar">Peringatan Hari Besar</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tanggal Pelaksanaan *
              </label>
              <input
                type="date"
                required
                value={tanggal}
                onChange={e => setTanggal(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> Jam / Waktu Pelaksanaan
              </label>
              <input
                type="text"
                placeholder="Contoh: 07:00 - 10:00 WIB"
                value={waktu}
                onChange={e => setWaktu(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Lokasi / Titik Kumpul
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Balai Pertemuan Blok B"
                value={lokasi}
                onChange={e => setLokasi(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Deskripsi & Agenda Kegiatan
            </label>
            <textarea
              rows={3}
              placeholder="Jelaskan rincian kegiatan, perlengkapan yang perlu dibawa warga, dsb."
              value={deskripsi}
              onChange={e => setDeskripsi(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Penanggung Jawab / PIC
              </label>
              <input
                type="text"
                value={penanggungJawab}
                onChange={e => setPenanggungJawab(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Peserta
              </label>
              <input
                type="text"
                value={targetPeserta}
                onChange={e => setTargetPeserta(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              URL Foto / Poster Banner (Opsional)
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={fotoUrl}
              onChange={e => setFotoUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition-colors"
            >
              Publikasikan Agenda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
