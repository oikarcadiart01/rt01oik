import React, { useState, useEffect, useRef } from 'react';
import { EventDocumentation, DocumentationPhoto, CommunityEvent } from '../../types';
import { compressMultipleImages, formatDocumentationFolderName } from '../../utils/imageUtils';
import { formatDateIndo } from '../../utils/formatters';
import {
  X,
  FolderPlus,
  Edit3,
  Calendar,
  MapPin,
  FileText,
  Images,
  Plus,
  Trash2,
  Sparkles,
  Save,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Folder,
  Layers,
} from 'lucide-react';

interface AddEditDokumentasiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (doc: EventDocumentation) => void;
  documentationToEdit?: EventDocumentation | null;
  events?: CommunityEvent[];
}

export const AddEditDokumentasiModal: React.FC<AddEditDokumentasiModalProps> = ({
  isOpen,
  onClose,
  onSave,
  documentationToEdit,
  events = [],
}) => {
  const [kegiatanJudul, setKegiatanJudul] = useState('');
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [lokasi, setLokasi] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [fotoList, setFotoList] = useState<DocumentationPhoto[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditMode = !!documentationToEdit;

  // Folder name is computed dynamically following rule: nama kegiatan_tanggal
  const computedFolderName = formatDocumentationFolderName(kegiatanJudul, tanggal);

  useEffect(() => {
    if (documentationToEdit) {
      setKegiatanJudul(documentationToEdit.kegiatanJudul || '');
      setTanggal(documentationToEdit.tanggal || new Date().toISOString().split('T')[0]);
      setLokasi(documentationToEdit.lokasi || '');
      setKeterangan(documentationToEdit.keterangan || '');
      setFotoList(documentationToEdit.fotoList || []);
    } else {
      setKegiatanJudul('');
      setTanggal(new Date().toISOString().split('T')[0]);
      setLokasi('Cluster Arcadia RT 01 RW 12');
      setKeterangan('');
      setFotoList([]);
    }
    setErrorMsg('');
    setManualUrl('');
  }, [documentationToEdit, isOpen]);

  if (!isOpen) return null;

  // Handle Event Selection from Dropdown
  const handleSelectEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (!selectedId) return;
    const ev = events.find(item => item.id === selectedId);
    if (ev) {
      setKegiatanJudul(ev.judul);
      setTanggal(ev.tanggal);
      setLokasi(ev.lokasi);
      if (ev.deskripsi && !keterangan) {
        setKeterangan(`Dokumentasi ${ev.judul}: ${ev.deskripsi}`);
      }
    }
  };

  // Handle Multiple File Upload
  const handleFilesUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (fileArray.length === 0) {
      setErrorMsg('Hanya berkas gambar (JPG, PNG, WebP) yang diperbolehkan.');
      return;
    }

    setIsCompressing(true);
    setErrorMsg('');

    try {
      const results = await compressMultipleImages(fileArray, 900, 900, 0.78);
      const newPhotos: DocumentationPhoto[] = results.map((item, idx) => ({
        id: `foto-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 5)}`,
        url: item.url,
        caption: '',
        uploadedAt: new Date().toISOString(),
      }));

      setFotoList(prev => [...prev, ...newPhotos]);
    } catch (err) {
      console.error('Error uploading photos:', err);
      setErrorMsg('Terjadi kendala saat memproses beberapa foto.');
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFilesUpload(e.dataTransfer.files);
    }
  };

  // Add Photo via URL
  const handleAddManualUrl = () => {
    if (!manualUrl.trim()) return;
    const newPhoto: DocumentationPhoto[] = [
      {
        id: `foto-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        url: manualUrl.trim(),
        caption: '',
        uploadedAt: new Date().toISOString(),
      },
    ];
    setFotoList(prev => [...prev, ...newPhoto]);
    setManualUrl('');
  };

  // Remove Photo
  const handleRemovePhoto = (photoId: string) => {
    setFotoList(prev => prev.filter(p => p.id !== photoId));
  };

  // Update Photo Caption
  const handleUpdateCaption = (photoId: string, caption: string) => {
    setFotoList(prev =>
      prev.map(p => (p.id === photoId ? { ...p, caption } : p))
    );
  };

  // Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kegiatanJudul.trim()) {
      setErrorMsg('Nama atau judul kegiatan wajib diisi.');
      return;
    }
    if (!tanggal) {
      setErrorMsg('Tanggal kegiatan wajib ditentukan.');
      return;
    }

    const docItem: EventDocumentation = {
      id: documentationToEdit?.id || `doc-${Date.now()}`,
      folderName: computedFolderName,
      kegiatanJudul: kegiatanJudul.trim(),
      tanggal: tanggal.trim(),
      lokasi: lokasi.trim(),
      keterangan: keterangan.trim(),
      fotoList,
      createdAt: documentationToEdit?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(docItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-sm text-amber-200">
              {isEditMode ? <Edit3 className="w-6 h-6" /> : <FolderPlus className="w-6 h-6" />}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                  Dokumentasi Foto RT 01
                </span>
                <span className="text-xs text-teal-100">
                  {isEditMode ? 'Perbarui Folder' : 'Folder Dokumentasi Baru'}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black mt-0.5">
                {isEditMode ? 'Edit Dokumentasi Kegiatan' : 'Input Dokumentasi & Upload Foto'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-5 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Select from Existing Events */}
          {events.length > 0 && !isEditMode && (
            <div className="p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl border border-emerald-200/80">
              <label className="block text-[11px] font-black text-emerald-950 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Pilih Cepat dari Agenda Kegiatan Lingkungan (Opsional)</span>
              </label>
              <select
                onChange={handleSelectEvent}
                defaultValue=""
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-emerald-300 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">-- Ketik Sendiri atau Pilih Agenda Kegiatan Terdaftar --</option>
                {events.map(ev => (
                  <option key={ev.id} value={ev.id}>
                    [{ev.tanggal}] {ev.judul} ({ev.kategori})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Grid Informasi Pokok */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nama Kegiatan */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nama / Judul Kegiatan *
              </label>
              <input
                type="text"
                required
                value={kegiatanJudul}
                onChange={e => setKegiatanJudul(e.target.value)}
                placeholder="Contoh: Kerja Bakti Akbar Bersama Warga"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs sm:text-sm font-semibold transition-all"
              />
            </div>

            {/* Tanggal Kegiatan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tanggal Pelaksanaan *</span>
              </label>
              <input
                type="date"
                required
                value={tanggal}
                onChange={e => setTanggal(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs sm:text-sm font-semibold transition-all"
              />
            </div>

            {/* Lokasi Kegiatan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Lokasi Kegiatan</span>
              </label>
              <input
                type="text"
                value={lokasi}
                onChange={e => setLokasi(e.target.value)}
                placeholder="Contoh: Balai Warga & Bundaran Blok A"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs sm:text-sm transition-all"
              />
            </div>
          </div>

          {/* Info Integrasi Dokumentasi Kegiatan */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200 shadow-2xs flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-600 text-white shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <div>
                <span className="font-bold text-emerald-950 block">Dokumentasi Terhubung ke Database RT 01</span>
                <span className="text-[11px] text-emerald-800">
                  {kegiatanJudul ? kegiatanJudul : 'Nama Kegiatan'} • {tanggal ? formatDateIndo(tanggal) : 'Tanggal'}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
              Sinkronisasi Cloud
            </span>
          </div>

          {/* Keterangan / Deskripsi Kegiatan */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>Keterangan & Catatan Dokumentasi (Opsional)</span>
            </label>
            <textarea
              rows={2}
              value={keterangan}
              onChange={e => setKeterangan(e.target.value)}
              placeholder="Catatan jalannya acara, kehadiran warga, atau poin penting dokumentasi..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs leading-relaxed transition-all"
            />
          </div>

          {/* MULTI-PHOTO UPLOAD SECTION */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="block text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
                  <Images className="w-4 h-4 text-emerald-600" />
                  <span>Upload Foto Dokumentasi (Bisa Banyak Sekaligus)</span>
                </label>
                <p className="text-[11px] text-slate-500">
                  Dapat memilih atau menarik banyak foto sekaligus dari galeri/kamera perangkat Anda.
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
                {fotoList.length} Foto Siap Disimpan
              </span>
            </div>

            {/* Drag & Drop Multi-file Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-50 scale-101'
                  : 'border-emerald-300/80 bg-gradient-to-br from-emerald-50/40 via-teal-50/30 to-cyan-50/40 hover:bg-emerald-50/70 hover:border-emerald-400'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={e => handleFilesUpload(e.target.files)}
                className="hidden"
              />

              <div className="max-w-md mx-auto space-y-2">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  {isCompressing ? (
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <UploadCloud className="w-7 h-7" />
                  )}
                </div>

                <div className="font-extrabold text-sm sm:text-base text-slate-800">
                  {isCompressing ? (
                    <span>Sedang memproses & mengompresi foto...</span>
                  ) : (
                    <span>Klik untuk Pilih Banyak Foto atau Tarik & Lepas Foto ke Sini</span>
                  )}
                </div>

                <p className="text-xs text-slate-500">
                  Mendukung multi-select (JPG, PNG, JPEG, WebP). Foto otomatis dioptimalkan agar ringan dan aman di database.
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs">
                    <Plus className="w-3.5 h-3.5" />
                    Pilih File Foto
                  </span>
                </div>
              </div>
            </div>

            {/* Fallback Option: Tambah via URL Gambar */}
            <div className="flex gap-2 text-xs">
              <input
                type="url"
                value={manualUrl}
                onChange={e => setManualUrl(e.target.value)}
                placeholder="Atau tempel URL gambar web di sini (opsional)..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddManualUrl}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold transition-colors cursor-pointer shrink-0"
              >
                Tambah URL
              </button>
            </div>

            {/* PREVIEW DAFTAR FOTO YANG DIUPLOAD */}
            {fotoList.length > 0 && (
              <div className="space-y-3 pt-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Pratinjau Foto di Folder ({fotoList.length}):</span>
                  <button
                    type="button"
                    onClick={() => setFotoList([])}
                    className="text-rose-600 hover:text-rose-700 text-[11px] font-semibold cursor-pointer"
                  >
                    Hapus Semua Foto
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-72 overflow-y-auto p-1">
                  {fotoList.map((foto, index) => (
                    <div
                      key={foto.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs group relative flex flex-col justify-between"
                    >
                      <div className="relative aspect-video bg-slate-100 overflow-hidden">
                        <img
                          src={foto.url}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(foto.id)}
                          className="absolute top-2 right-2 p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md cursor-pointer transition-colors"
                          title="Hapus foto ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-mono">
                          #{index + 1}
                        </span>
                      </div>

                      <div className="p-2.5">
                        <input
                          type="text"
                          value={foto.caption || ''}
                          onChange={e => handleUpdateCaption(foto.id, e.target.value)}
                          placeholder="Tulis keterangan foto (opsional)..."
                          className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-slate-200 focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <span className="text-xs text-slate-500 order-2 sm:order-1">
              Data otomatis disimpan ke database Firestore
            </span>

            <div className="flex items-center gap-2.5 w-full sm:w-auto order-1 sm:order-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-bold transition-colors cursor-pointer min-h-[42px]"
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={isCompressing}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 min-h-[42px] disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Dokumentasi</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
