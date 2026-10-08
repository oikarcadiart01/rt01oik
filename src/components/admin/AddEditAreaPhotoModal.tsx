import React, { useState, useEffect } from 'react';
import { AreaFacilityPhoto } from '../../types';
import { X, Images, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

interface AddEditAreaPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoToEdit?: AreaFacilityPhoto | null;
  onSave: (photo: AreaFacilityPhoto) => void;
}

export const AddEditAreaPhotoModal: React.FC<AddEditAreaPhotoModalProps> = ({
  isOpen,
  onClose,
  photoToEdit,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Fasilitas Keamanan');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const categoryPresets = [
    'Keamanan Lingkungan',
    'Fasilitas Keamanan',
    'Ruang Terbuka Hijau',
    'Infrastruktur Jalan',
    'Fasilitas Umum',
    'Kebersihan & Sanitasi',
    'Balai & Gazebo',
    'Sarana Olahraga',
  ];

  useEffect(() => {
    if (photoToEdit) {
      setTitle(photoToEdit.title);
      setCategory(photoToEdit.category);
      setDescription(photoToEdit.description);
      setImageUrl(photoToEdit.imageUrl);
      setImagePreview(photoToEdit.imageUrl);
    } else {
      setTitle('');
      setCategory('Keamanan Lingkungan');
      setDescription('');
      setImageUrl('');
      setImagePreview('');
    }
  }, [photoToEdit, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageUrl(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    const saved: AreaFacilityPhoto = {
      id: photoToEdit ? photoToEdit.id : `area-${Date.now()}`,
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      urutan: photoToEdit?.urutan ?? Date.now(),
    };

    onSave(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-white/20 rounded-2xl">
              <Images className="w-5 h-5 text-amber-200" />
            </span>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                {photoToEdit ? 'Edit Dokumentasi Fasilitas' : 'Tambah Dokumentasi Fasilitas'}
              </h3>
              <p className="text-xs text-teal-100">
                Dokumentasi foto sarana & prasarana fisik lingkungan RT 01
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Judul Titik / Fasilitas <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Contoh: Gerbang Utama One-Gate System atau Pos Jaga Satpam"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs sm:text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Kategori Fasilitas
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {categoryPresets.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                    category === cat
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="Ketik kategori kustom jika tidak ada di pilihan"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Deskripsi Singkat Fasilitas
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Jelaskan fungsi, kondisi fisik, pemanfaatan bersama warga, atau aturan pemakaiannya..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs sm:text-sm outline-none resize-none"
            />
          </div>

          {/* Image Input Options */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Foto Fasilitas (URL atau Upload) <span className="text-rose-500">*</span>
            </label>

            <div className="flex items-center gap-2">
              <input
                type="url"
                value={imageUrl}
                onChange={e => {
                  setImageUrl(e.target.value);
                  setImagePreview(e.target.value);
                }}
                placeholder="https://images.unsplash.com/... atau paste link gambar"
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs outline-none"
              />

              <label className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer border border-slate-200 shrink-0">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Preview Box */}
            {imagePreview && (
              <div className="mt-3 relative rounded-2xl overflow-hidden border border-slate-200 aspect-video bg-slate-900 max-h-48">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setImagePreview('')}
                />
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
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
              <span>{photoToEdit ? 'Simpan Perubahan' : 'Tambah Dokumentasi'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
