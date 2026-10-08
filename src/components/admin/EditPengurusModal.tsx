import React, { useState, useEffect, useRef } from 'react';
import { Official } from '../../types';
import { compressImageFile } from '../../utils/imageUtils';
import {
  X,
  UserCheck,
  UserPlus,
  Save,
  Home,
  Phone,
  Briefcase,
  Calendar,
  Image as ImageIcon,
  Plus,
  Trash2,
  Sparkles,
  Upload,
  RefreshCw,
  Check,
} from 'lucide-react';

interface EditPengurusModalProps {
  isOpen: boolean;
  onClose: () => void;
  official: Official | null; // null means ADD NEW official
  onSave: (official: Official) => void;
  nextOrder?: number;
}

const AVATAR_PRESETS = [
  { label: 'Ketua / Formal 1', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80' },
  { label: 'Wakil / Formal 2', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80' },
  { label: 'Sekretaris / Muda', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80' },
  { label: 'Bendahara / Formal', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80' },
  { label: 'Keamanan / Tegas', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80' },
  { label: 'Sarpras / Teknik', url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80' },
  { label: 'Kebersihan / Warga', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80' },
  { label: 'Sosial / Humas', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80' },
  { label: 'Posyandu / Ibu RT', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80' },
];

export const EditPengurusModal: React.FC<EditPengurusModalProps> = ({
  isOpen,
  onClose,
  official,
  onSave,
  nextOrder = 10,
}) => {
  const isAddMode = official === null;

  const [formData, setFormData] = useState<Partial<Official>>({});
  const [tupoksiList, setTupoksiList] = useState<string[]>([]);
  const [newTupoksiText, setNewTupoksiText] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (official) {
      setFormData({ ...official });
      setTupoksiList(official.tupoksi ? [...official.tupoksi] : []);
    } else {
      // Default for Add mode
      setFormData({
        nama: '',
        jabatan: '',
        blokRumah: 'Blok ',
        noHp: '08',
        periode: '2026 - 2031',
        fotoUrl: AVATAR_PRESETS[0].url,
      });
      setTupoksiList([
        'Melayani urusan kerukunan dan ketertiban warga RT 01 RW 12.',
        'Membantu kelancaran program kerja lingkungan Cluster Arcadia.',
      ]);
    }
    setErrors({});
    setNewTupoksiText('');
    setUploadSuccess(false);
  }, [official, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const base64Url = await compressImageFile(file, 600, 600, 0.8);
      setFormData(prev => ({ ...prev, fotoUrl: base64Url }));
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

  const handleAddTupoksi = () => {
    if (newTupoksiText.trim()) {
      setTupoksiList(prev => [...prev, newTupoksiText.trim()]);
      setNewTupoksiText('');
    }
  };

  const handleRemoveTupoksi = (index: number) => {
    setTupoksiList(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateTupoksiItem = (index: number, val: string) => {
    setTupoksiList(prev => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.nama?.trim()) {
      newErrors.nama = 'Nama lengkap pengurus wajib diisi';
    }
    if (!formData.jabatan?.trim()) {
      newErrors.jabatan = 'Jabatan wajib diisi';
    }
    if (!formData.blokRumah?.trim()) {
      newErrors.blokRumah = 'Blok rumah domisili wajib diisi';
    }
    if (!formData.noHp?.trim()) {
      newErrors.noHp = 'Nomor HP / WhatsApp wajib diisi';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const savedOfficial: Official = {
      id: official ? official.id : `off-${Date.now()}`,
      jabatan: formData.jabatan || 'Pengurus RT 01',
      nama: formData.nama || '',
      blokRumah: formData.blokRumah || '',
      noHp: formData.noHp || '',
      fotoUrl:
        formData.fotoUrl ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      tupoksi:
        tupoksiList.length > 0
          ? tupoksiList
          : ['Melayani warga RT 01 RW 12 Cluster Arcadia.'],
      periode: formData.periode || '2026 - 2031',
      urutan: official ? official.urutan : nextOrder,
    };

    onSave(savedOfficial);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-emerald-100 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal - Bright Gradient */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-xs">
              {isAddMode ? (
                <UserPlus className="w-5 h-5 text-amber-300" />
              ) : (
                <UserCheck className="w-5 h-5 text-amber-300" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-sans">
                  {isAddMode ? 'Tambah Pengurus' : 'Edit Pengurus'}
                </span>
                {!isAddMode && (
                  <span className="text-xs text-teal-100 font-medium">
                    {official?.jabatan}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold">
                {isAddMode ? 'Tambah Pengurus RT Baru' : 'Edit Data Pengurus RT'}
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
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* Foto Profil & Upload Zone */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-cyan-50/30 p-4 sm:p-5 rounded-2xl border border-emerald-200/80 space-y-3.5">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="relative group shrink-0">
                <img
                  src={
                    formData.fotoUrl ||
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
                  }
                  alt="Preview"
                  className="w-20 h-20 rounded-2xl object-cover border-3 border-emerald-400 shadow-md"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload Foto Baru"
                  className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl shadow-md cursor-pointer transition-transform active:scale-90"
                >
                  <Upload className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 min-w-0 w-full">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                    Foto Profil Pengurus
                  </label>
                  {uploadSuccess && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Foto Berhasil Diunggah!
                    </span>
                  )}
                </div>

                {/* Upload File Input Hidden */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {/* Upload Button + File picker Trigger */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer min-h-[38px]"
                  >
                    {isUploading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Memproses Foto...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Unggah Foto dari Perangkat</span>
                      </>
                    )}
                  </button>

                  <span className="text-[11px] text-slate-500 font-medium">
                    (JPG, PNG, WebP otomatis dioptimalkan)
                  </span>
                </div>

                {/* Fallback Custom URL */}
                <input
                  type="url"
                  value={formData.fotoUrl || ''}
                  onChange={e => setFormData({ ...formData, fotoUrl: e.target.value })}
                  placeholder="Atau tempel URL gambar web (https://...)"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.foto && <p className="text-[11px] text-rose-500 mt-1">{errors.foto}</p>}
              </div>
            </div>

            {/* Quick Presets Picker */}
            <div>
              <span className="text-[11px] font-bold text-slate-700 block mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Atau Pilih Contoh Foto Profil:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {AVATAR_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, fotoUrl: preset.url })}
                    className={`text-[10px] px-2.5 py-1 rounded-lg border font-medium transition-all cursor-pointer ${
                      formData.fotoUrl === preset.url
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

          {/* Grid Informasi Utama */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Lengkap & Gelar <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nama || ''}
                onChange={e => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Contoh: Bambang Prasetyo, S.T."
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
              {errors.nama && <p className="text-[11px] text-rose-500 mt-1">{errors.nama}</p>}
            </div>

            {/* Jabatan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-teal-600" />
                Jabatan Pengurus <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.jabatan || ''}
                onChange={e => setFormData({ ...formData, jabatan: e.target.value })}
                placeholder="Contoh: Seksi Keamanan & Ketertiban"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
              {errors.jabatan && <p className="text-[11px] text-rose-500 mt-1">{errors.jabatan}</p>}
            </div>

            {/* Blok Rumah Domisili */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-emerald-600" />
                Domisili / Blok Rumah <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.blokRumah || ''}
                onChange={e => setFormData({ ...formData, blokRumah: e.target.value })}
                placeholder="Contoh: Blok A1 No. 02"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
              {errors.blokRumah && <p className="text-[11px] text-rose-500 mt-1">{errors.blokRumah}</p>}
            </div>

            {/* Nomor HP / WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                Nomor WhatsApp / HP <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.noHp || ''}
                onChange={e => setFormData({ ...formData, noHp: e.target.value })}
                placeholder="Contoh: 081234567890"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
              {errors.noHp && <p className="text-[11px] text-rose-500 mt-1">{errors.noHp}</p>}
            </div>

            {/* Periode Masa Bakti */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                Periode Masa Bakti
              </label>
              <input
                type="text"
                value={formData.periode || ''}
                onChange={e => setFormData({ ...formData, periode: e.target.value })}
                placeholder="Contoh: 2026 - 2031"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          {/* Tugas Pokok & Fungsi (Tupoksi) */}
          <div className="border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-700">
                Tugas Pokok & Tanggung Jawab (Tupoksi)
              </label>
              <span className="text-[11px] text-slate-500 font-medium">
                {tupoksiList.length} Poin Tanggung Jawab
              </span>
            </div>

            {/* List Existing Tupoksi */}
            <div className="space-y-2 mb-3">
              {tupoksiList.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 rounded-lg w-6 h-6 flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={e => handleUpdateTupoksiItem(idx, e.target.value)}
                    className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveTupoksi(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Hapus butir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Tupoksi Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newTupoksiText}
                onChange={e => setNewTupoksiText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTupoksi();
                  }
                }}
                placeholder="Tambah tugas/fungsi baru lalu klik Tambah..."
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddTupoksi}
                className="px-3.5 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah
              </button>
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
              {isAddMode ? 'Simpan Pengurus Baru' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
