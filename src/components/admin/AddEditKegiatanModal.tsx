import React, { useState, useEffect, useRef } from 'react';
import { CommunityEvent, EventStatus } from '../../types';
import { compressImageFile } from '../../utils/imageUtils';
import {
  X,
  CalendarPlus,
  Edit3,
  Calendar,
  Clock,
  MapPin,
  Users,
  Image as ImageIcon,
  Upload,
  RefreshCw,
  Check,
  Sparkles,
  Save,
} from 'lucide-react';

interface AddEditKegiatanModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CommunityEvent | null; // null means ADD NEW
  onSave: (event: CommunityEvent) => void;
}

const EVENT_PHOTO_PRESETS = [
  { label: 'Kerja Bakti', url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&auto=format&fit=crop&q=80' },
  { label: 'Posyandu & Balita', url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80' },
  { label: 'Ronda & Keamanan', url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80' },
  { label: 'Rapat Warga', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80' },
  { label: 'Senam & Olahraga', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80' },
  { label: 'HUT RI & Lomba', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80' },
  { label: 'Pengajian / Sosial', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80' },
];

export const AddEditKegiatanModal: React.FC<AddEditKegiatanModalProps> = ({
  isOpen,
  onClose,
  event,
  onSave,
}) => {
  const isAddMode = event === null;

  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [waktu, setWaktu] = useState('07:00 - 10:00 WIB');
  const [lokasi, setLokasi] = useState('Pos Satpam / Fasum Cluster Arcadia');
  const [kategori, setKategori] = useState<CommunityEvent['kategori']>('Kerja Bakti');
  const [status, setStatus] = useState<EventStatus>('Akan Datang');
  const [penanggungJawab, setPenanggungJawab] = useState('Ketua RT 01 (Bpk. Bambang Prasetyo)');
  const [targetPeserta, setTargetPeserta] = useState('Seluruh Warga Cluster Arcadia');
  const [fotoUrl, setFotoUrl] = useState(EVENT_PHOTO_PRESETS[0].url);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (event) {
      setJudul(event.judul);
      setDeskripsi(event.deskripsi);
      setTanggal(event.tanggal);
      setWaktu(event.waktu);
      setLokasi(event.lokasi);
      setKategori(event.kategori);
      setStatus(event.status);
      setPenanggungJawab(event.penanggungJawab);
      setTargetPeserta(event.targetPeserta);
      setFotoUrl(event.fotoUrl || EVENT_PHOTO_PRESETS[0].url);
    } else {
      setJudul('');
      setDeskripsi('');
      setTanggal(new Date().toISOString().split('T')[0]);
      setWaktu('07:00 - 10:00 WIB');
      setLokasi('Pos Satpam / Fasum Cluster Arcadia');
      setKategori('Kerja Bakti');
      setStatus('Akan Datang');
      setPenanggungJawab('Ketua RT 01 (Bpk. Bambang Prasetyo)');
      setTargetPeserta('Seluruh Warga Cluster Arcadia');
      setFotoUrl(EVENT_PHOTO_PRESETS[0].url);
    }
    setErrors({});
    setUploadSuccess(false);
  }, [event, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const compressedBase64 = await compressImageFile(file, 800, 600, 0.78);
      setFotoUrl(compressedBase64);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengunggah foto';
      setErrors(prev => ({ ...prev, foto: msg }));
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!judul.trim()) {
      newErrors.judul = 'Nama kegiatan / acara wajib diisi';
    }
    if (!tanggal) {
      newErrors.tanggal = 'Tanggal kegiatan wajib dipilih';
    }
    if (!lokasi.trim()) {
      newErrors.lokasi = 'Lokasi kegiatan wajib diisi';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const savedEvent: CommunityEvent = {
      id: event ? event.id : `ev-${Date.now()}`,
      judul: judul.trim(),
      deskripsi: deskripsi.trim(),
      tanggal,
      waktu: waktu.trim() || '07:00 - 10:00 WIB',
      lokasi: lokasi.trim(),
      kategori,
      status,
      penanggungJawab: penanggungJawab.trim() || 'Pengurus RT 01',
      targetPeserta: targetPeserta.trim() || 'Warga Cluster Arcadia',
      rsvpCount: event?.rsvpCount || 1,
      fotoUrl: fotoUrl || EVENT_PHOTO_PRESETS[0].url,
    };

    onSave(savedEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-emerald-100 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal - Vibrant & Bright */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-xs">
              {isAddMode ? (
                <CalendarPlus className="w-5 h-5 text-amber-300" />
              ) : (
                <Edit3 className="w-5 h-5 text-amber-300" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-sans">
                  {isAddMode ? 'Tambah Agenda' : 'Edit Agenda'}
                </span>
                <span className="text-xs text-teal-100 font-medium">RT 01 RW 12</span>
              </div>
              <h3 className="text-lg font-bold">
                {isAddMode ? 'Buat Agenda Kegiatan Warga' : 'Edit Agenda Kegiatan Lingkungan'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4.5 overflow-y-auto flex-1">
          {/* Foto Banner Kegiatan & Upload */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-cyan-50/30 p-4 rounded-2xl border border-emerald-200/80 space-y-3">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="relative group shrink-0 w-full sm:w-36 h-24 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-sm bg-slate-100">
                <img
                  src={fotoUrl || EVENT_PHOTO_PRESETS[0].url}
                  alt="Poster Kegiatan"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload Foto Poster"
                  className="absolute bottom-2 right-2 p-1.5 bg-emerald-700/90 hover:bg-emerald-800 text-white rounded-xl shadow-md cursor-pointer transition-transform"
                >
                  <Upload className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 min-w-0 w-full">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                    Poster / Foto Dokumentasi
                  </label>
                  {uploadSuccess && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Berhasil Diunggah!
                    </span>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer min-h-[36px]"
                  >
                    {isUploading ? (
                      <>
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        <span>Memproses Foto...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Unggah Foto dari Perangkat</span>
                      </>
                    )}
                  </button>
                  <span className="text-[11px] text-slate-500">(JPG, PNG, WebP)</span>
                </div>

                <input
                  type="url"
                  value={fotoUrl}
                  onChange={e => setFotoUrl(e.target.value)}
                  placeholder="Atau tautan URL poster gambar (https://...)"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.foto && <p className="text-[11px] text-rose-500 mt-1">{errors.foto}</p>}
              </div>
            </div>

            {/* Quick Photo Presets */}
            <div>
              <span className="text-[11px] font-bold text-slate-700 block mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Pilihan Cepat Gambar Kegiatan:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {EVENT_PHOTO_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFotoUrl(preset.url)}
                    className={`text-[10px] px-2.5 py-1 rounded-lg border font-medium transition-all cursor-pointer ${
                      fotoUrl === preset.url
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs font-bold'
                        : 'bg-white hover:bg-emerald-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Nama Kegiatan */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Kegiatan / Acara <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={judul}
              onChange={e => setJudul(e.target.value)}
              placeholder="Contoh: Kerja Bakti Massal & Fogging Nyamuk"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
            {errors.judul && <p className="text-[11px] text-rose-500 mt-1">{errors.judul}</p>}
          </div>

          {/* Kategori & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kategori Kegiatan
              </label>
              <select
                value={kategori}
                onChange={e => setKategori(e.target.value as CommunityEvent['kategori'])}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
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
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status Pelaksanaan
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as EventStatus)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="Akan Datang">Akan Datang</option>
                <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </select>
            </div>
          </div>

          {/* Tanggal & Waktu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                Tanggal Pelaksanaan <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={tanggal}
                onChange={e => setTanggal(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
              {errors.tanggal && <p className="text-[11px] text-rose-500 mt-1">{errors.tanggal}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                Jam / Waktu Pelaksanaan
              </label>
              <input
                type="text"
                value={waktu}
                onChange={e => setWaktu(e.target.value)}
                placeholder="Contoh: 07:00 - 10:00 WIB"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          {/* Lokasi / Titik Kumpul */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              Lokasi / Titik Kumpul <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={lokasi}
              onChange={e => setLokasi(e.target.value)}
              placeholder="Contoh: Balai Warga & Pos Satpam Blok A"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
            {errors.lokasi && <p className="text-[11px] text-rose-500 mt-1">{errors.lokasi}</p>}
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Deskripsi & Rincian Agenda
            </label>
            <textarea
              rows={3}
              value={deskripsi}
              onChange={e => setDeskripsi(e.target.value)}
              placeholder="Tuliskan peralatan yang perlu dibawa, agenda rinci, dan instruksi warga..."
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            ></textarea>
          </div>

          {/* Penanggung Jawab & Target Peserta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                Penanggung Jawab (PIC)
              </label>
              <input
                type="text"
                value={penanggungJawab}
                onChange={e => setPenanggungJawab(e.target.value)}
                placeholder="Contoh: Ketua RT 01"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Peserta
              </label>
              <input
                type="text"
                value={targetPeserta}
                onChange={e => setTargetPeserta(e.target.value)}
                placeholder="Contoh: Seluruh Warga Cluster Arcadia"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer min-h-[42px]"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer min-h-[42px]"
            >
              <Save className="w-4 h-4" />
              {isAddMode ? 'Publikasikan Kegiatan' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
