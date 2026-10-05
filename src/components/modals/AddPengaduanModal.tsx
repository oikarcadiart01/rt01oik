import React, { useState } from 'react';
import { Complaint, ComplaintPriority } from '../../types';
import { X, Send, AlertTriangle, ShieldCheck } from 'lucide-react';

interface AddPengaduanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (complaint: Complaint) => void;
}

export const AddPengaduanModal: React.FC<AddPengaduanModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [namaPelapor, setNamaPelapor] = useState('');
  const [blokRumah, setBlokRumah] = useState('');
  const [noHp, setNoHp] = useState('');
  const [kategori, setKategori] = useState<Complaint['kategori']>('Lampu Jalan / PJU');
  const [prioritas, setPrioritas] = useState<ComplaintPriority>('Sedang');
  const [judul, setJudul] = useState('');
  const [lokasiSpesifik, setLokasiSpesifik] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [isAnonim, setIsAnonim] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !deskripsi || !lokasiSpesifik) return;

    const ticketSuffix = Math.floor(100 + Math.random() * 900);
    const dateStr = new Date().toISOString().split('T')[0];

    const newComplaint: Complaint = {
      id: `cmp-${Date.now()}`,
      tiketNo: `ARC-${dateStr.replace(/-/g, '')}-${ticketSuffix}`,
      namaPelapor: isAnonim ? 'Warga Peduli (Disamarkan)' : namaPelapor || 'Warga Cluster Arcadia',
      blokRumah: isAnonim ? 'Cluster Arcadia' : blokRumah || 'Blok Warga',
      noHp: isAnonim ? '-' : noHp || '-',
      kategori,
      prioritas,
      judul,
      deskripsi,
      lokasiSpesifik,
      status: 'Menunggu',
      tanggalLapor: dateStr,
      tanggapanPengurus: 'Laporan telah diterima sistem dan segera diteruskan ke Seksi terkait.',
      petugasTindakLanjut: 'Pengurus RT 01',
    };

    onSave(newComplaint);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-amber-600 to-rose-600 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Layanan Pengaduan & Aspirasi Lingkungan</h3>
              <p className="text-xs text-amber-100">RT 01 RW 12 Cluster Arcadia Suwayuwo</p>
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
          {/* Opsi Anonim */}
          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/80 flex items-start gap-2.5">
            <input
              type="checkbox"
              id="anonim"
              checked={isAnonim}
              onChange={e => setIsAnonim(e.target.checked)}
              className="mt-1 rounded-sm border-amber-400 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="anonim" className="text-xs text-amber-900 leading-relaxed cursor-pointer">
              <span className="font-bold block">Sembunyikan Identitas (Lapor Anonim)</span>
              Nama dan kontak Anda tidak akan ditampilkan ke publik, hanya nomor tiket aduan yang tercatat.
            </label>
          </div>

          {!isAnonim && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Anda *
                </label>
                <input
                  type="text"
                  required={!isAnonim}
                  placeholder="Nama Lengkap"
                  value={namaPelapor}
                  onChange={e => setNamaPelapor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Blok / No. *
                </label>
                <input
                  type="text"
                  required={!isAnonim}
                  placeholder="Blok B1 No. 04"
                  value={blokRumah}
                  onChange={e => setBlokRumah(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  No. WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="081234..."
                  value={noHp}
                  onChange={e => setNoHp(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kategori Masalah *
              </label>
              <select
                value={kategori}
                onChange={e => setKategori(e.target.value as Complaint['kategori'])}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="Lampu Jalan / PJU">Lampu Jalan / PJU Padam</option>
                <option value="Saluran Air / Drainase">Saluran Air / Gorong-gorong Mampet</option>
                <option value="Kebersihan & Sampah">Kebersihan Lingkungan & Sampah</option>
                <option value="Keamanan & Ketertiban">Keamanan, Tamu & Ketertiban</option>
                <option value="Fasilitas Umum & Taman">Fasilitas Taman & Gerbang</option>
                <option value="Hewan Peliharaan">Hewan Peliharaan / Kucing Liar</option>
                <option value="Lainnya">Aspirasi / Saran Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tingkat Urgensi / Prioritas
              </label>
              <select
                value={prioritas}
                onChange={e => setPrioritas(e.target.value as ComplaintPriority)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="Biasa">Biasa (Saran / Saran Berkala)</option>
                <option value="Sedang">Sedang (Perlu dicek minggu ini)</option>
                <option value="Mendesak / Darurat">Mendesak / Darurat (Bahaya & Gangguan)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Judul Pengaduan / Keluhan *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Lampu PJU depan Blok C3 berkedip dan padam"
              value={judul}
              onChange={e => setJudul(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Titik Lokasi Spesifik di Cluster *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Depan rumah Blok C3 No. 02 dekat tiang listrik"
              value={lokasiSpesifik}
              onChange={e => setLokasiSpesifik(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Uraian Rinci Pengaduan *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Jelaskan secara jelas kronologi masalah, sejak kapan terjadi, dan harapan penanganannya..."
              value={deskripsi}
              onChange={e => setDeskripsi(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            ></textarea>
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
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold shadow-sm transition-colors"
            >
              <Send className="w-4 h-4" />
              Kirimkan Laporan Aduan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
