import React, { useState } from 'react';
import { ProfilWilayahInfo, AreaFacilityPhoto } from '../../types';
import {
  Building2,
  Images,
  Edit2,
  Plus,
  Trash2,
  MapPin,
  ExternalLink,
  ZoomIn,
  X,
  Compass,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { EditProfilWilayahModal } from './EditProfilWilayahModal';
import { AddEditAreaPhotoModal } from './AddEditAreaPhotoModal';

interface AdminProfilTabProps {
  profilInfo: ProfilWilayahInfo;
  onSaveProfilInfo: (info: ProfilWilayahInfo) => void;
  areaPhotos: AreaFacilityPhoto[];
  onSaveAreaPhoto: (photo: AreaFacilityPhoto) => void;
  onDeleteAreaPhoto: (id: string) => void;
}

export const AdminProfilTab: React.FC<AdminProfilTabProps> = ({
  profilInfo,
  onSaveProfilInfo,
  areaPhotos,
  onSaveAreaPhoto,
  onDeleteAreaPhoto,
}) => {
  const [isEditProfilOpen, setIsEditProfilOpen] = useState(false);
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<AreaFacilityPhoto | null>(null);
  const [photoToDelete, setPhotoToDelete] = useState<AreaFacilityPhoto | null>(null);
  const [selectedPreviewPhoto, setSelectedPreviewPhoto] = useState<AreaFacilityPhoto | null>(null);

  const handleOpenAddPhoto = () => {
    setEditingPhoto(null);
    setIsAddPhotoOpen(true);
  };

  const handleOpenEditPhoto = (photo: AreaFacilityPhoto) => {
    setEditingPhoto(photo);
    setIsAddPhotoOpen(true);
  };

  const confirmDeletePhoto = () => {
    if (photoToDelete) {
      onDeleteAreaPhoto(photoToDelete.id);
      setPhotoToDelete(null);
    }
  };

  const gmapsQuery = encodeURIComponent(
    'Perumahan Oma Indah Kapuk Suwayuwo Sukorejo Pasuruan'
  );
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${gmapsQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const externalMapsUrl = `https://www.google.com/maps/search/?api=1&query=${gmapsQuery}`;

  return (
    <div className="space-y-6">
      {/* 1. SEKSI PROFIL LINGKUNGAN & WILAYAH */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-sky-500/15 rounded-3xl p-6 sm:p-8 border border-emerald-200/90 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs inline-block">
              {profilInfo.subJudul || 'Profil Lingkungan & Wilayah'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
              {profilInfo.namaWilayah || 'RT 01 RW 12 Cluster Arcadia'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl leading-relaxed">
              {profilInfo.alamatLengkap}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-3.5 bg-white/95 p-3.5 rounded-2xl border border-emerald-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-extrabold text-slate-900 block">Akses Strategis:</span>
                <span className="text-slate-600 font-medium">{profilInfo.aksesStrategis}</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditProfilOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer shrink-0"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Profil Wilayah</span>
            </button>
          </div>
        </div>

        {/* Pilar-Pilar Informasi Lingkungan */}
        <div className="mt-6 pt-6 border-t border-emerald-200/70 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {profilInfo.pilarList?.map(pilar => (
            <div
              key={pilar.id}
              className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-emerald-100 shadow-2xs space-y-1.5"
            >
              <span className="font-extrabold text-slate-900 block text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                {pilar.judul}
              </span>
              <p className="text-slate-600 leading-relaxed font-medium">
                {pilar.deskripsi}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. SEKSI DOKUMENTASI FISIK & FASILITAS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md shrink-0">
              <Images className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  Dokumentasi Fisik & Fasilitas
                </span>
                <span className="text-xs font-bold text-slate-500">
                  ({areaPhotos.length} Titik Fasilitas)
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                Kelola Foto Dokumentasi Area & Fasilitas Lingkungan
              </h3>
              <p className="text-xs text-slate-500">
                Tambah, edit judul, perbarui foto, atau hapus titik dokumentasi fasilitas bersama
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenAddPhoto}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer self-start sm:self-auto min-h-[42px]"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Foto Fasilitas</span>
          </button>
        </div>

        {/* Grid Foto Dokumentasi Fasilitas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {areaPhotos.map(photo => (
            <div
              key={photo.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video relative overflow-hidden bg-slate-900">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Category Chip */}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-emerald-300 backdrop-blur-md">
                    {photo.category}
                  </span>

                  {/* Zoom Preview Button */}
                  <button
                    onClick={() => setSelectedPreviewPhoto(photo)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-black/50 hover:bg-black/70 text-white backdrop-blur-xs transition-colors cursor-pointer"
                    title="Perbesar Foto"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 space-y-1.5">
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {photo.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons for each facility photo */}
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 font-medium">
                  {photo.category}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditPhoto(photo)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-100 hover:bg-teal-200 text-teal-800 text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setPhotoToDelete(photo)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. SEKSI PETA INTERAKTIF GOOGLE MAPS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl shadow-md shrink-0">
              <Compass className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Peta Satelit & Akses Navigasi Cluster
              </h3>
              <p className="text-xs text-slate-500">
                Koordinat presisi gerbang dan lingkungan perumahan Cluster Arcadia
              </p>
            </div>
          </div>

          <a
            href={externalMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-200 self-start sm:self-auto cursor-pointer"
          >
            <span>Buka di Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
          <iframe
            src={mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Peta Lokasi Cluster Arcadia RT 01"
          />
        </div>
      </div>

      {/* Edit Profil Modal */}
      <EditProfilWilayahModal
        isOpen={isEditProfilOpen}
        onClose={() => setIsEditProfilOpen(false)}
        profilInfo={profilInfo}
        onSave={onSaveProfilInfo}
      />

      {/* Add / Edit Photo Modal */}
      <AddEditAreaPhotoModal
        isOpen={isAddPhotoOpen}
        onClose={() => setIsAddPhotoOpen(false)}
        photoToEdit={editingPhoto}
        onSave={onSaveAreaPhoto}
      />

      {/* Delete Photo Confirmation Modal */}
      {photoToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-rose-200 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Hapus Foto Fasilitas?</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Apakah Anda yakin ingin menghapus dokumentasi foto <strong>"{photoToDelete.title}"</strong>?
            </p>
            <div className="mt-5 flex items-center justify-center gap-2.5">
              <button
                onClick={() => setPhotoToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={confirmDeletePhoto}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Ya, Hapus Foto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPreviewPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm"
          onClick={() => setSelectedPreviewPhoto(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-black">
              <img
                src={selectedPreviewPhoto.imageUrl}
                alt={selectedPreviewPhoto.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setSelectedPreviewPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 sm:p-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {selectedPreviewPhoto.category}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900">{selectedPreviewPhoto.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedPreviewPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
