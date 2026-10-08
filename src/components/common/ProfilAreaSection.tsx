import React, { useState } from 'react';
import { AreaFacilityPhoto } from '../../types';
import { INITIAL_AREA_PHOTOS } from '../../data/initialData';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Compass,
  Images,
  ZoomIn,
  X,
  Sparkles,
  Building,
  CheckCircle2,
} from 'lucide-react';

interface ProfilAreaSectionProps {
  photos?: AreaFacilityPhoto[];
}

export const ProfilAreaSection: React.FC<ProfilAreaSectionProps> = ({
  photos = INITIAL_AREA_PHOTOS,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<AreaFacilityPhoto | null>(null);

  // Maps coordinates and URL
  const gmapsQuery = encodeURIComponent(
    'Perumahan Oma Indah Kapuk Suwayuwo Sukorejo Pasuruan'
  );
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${gmapsQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const externalMapsUrl = `https://www.google.com/maps/search/?api=1&query=${gmapsQuery}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${gmapsQuery}`;

  return (
    <div className="space-y-6">
      {/* 1. SEKSI FOTO DOKUMENTASI AREA RT 01 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md shrink-0">
              <Images className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  Dokumentasi Fisik & Fasilitas
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                Foto Dokumentasi Area Lingkungan RT 01
              </h3>
              <p className="text-xs text-slate-500">
                Gambaran fasilitas, gerbang keamanan, jalan lingkungan, dan ruang terbuka hijau Cluster Arcadia
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
            {photos.length} Titik Area Terdata
          </span>
        </div>

        {/* Grid Foto Dokumentasi Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {photos.map(photo => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video relative overflow-hidden bg-slate-900">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                    <span className="p-2.5 rounded-xl bg-white/90 text-slate-900 shadow-md opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
                      <ZoomIn className="w-5 h-5" />
                    </span>
                  </div>

                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-emerald-300 backdrop-blur-md">
                    {photo.category}
                  </span>
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

              <div className="p-3 bg-slate-50/80 border-t border-slate-100 text-[11px] font-semibold text-emerald-700 flex items-center justify-between">
                <span>Cluster Arcadia RT 01 RW 12</span>
                <span className="group-hover:translate-x-0.5 transition-transform">Lihat Foto →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. SEKSI PETA MAPS INTERAKTIF LOKASI WILAYAH RT 01 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl shadow-md shrink-0">
              <Compass className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full border border-teal-300">
                  Geolokasi & Peta Wilayah
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                Peta Lokasi Wilayah RT 01 RW 12 Cluster Arcadia
              </h3>
              <p className="text-xs text-slate-500">
                Peta interaktif perumahan Oma Indah Kapuk, Desa Suwayuwo, Sukorejo, Pasuruan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Petunjuk Rute</span>
            </a>

            <a
              href={externalMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka Google Maps</span>
            </a>
          </div>
        </div>

        {/* Embedded Interactive Map Frame */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs relative bg-slate-100">
          <iframe
            title="Peta Lokasi RT 01 RW 12 Cluster Arcadia Suwayuwo Sukorejo"
            src={mapsEmbedUrl}
            className="w-full h-80 sm:h-96 border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Informasi Akses & Detail Alamat */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
            <span className="font-extrabold text-emerald-950 block text-xs flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              Alamat Resmi
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">
              Perumahan Oma Indah Kapuk, Cluster Arcadia RT 01 RW 12, Desa Suwayuwo, Kec. Sukorejo, Kab. Pasuruan, Jawa Timur 67161.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-1">
            <span className="font-extrabold text-teal-950 block text-xs flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-teal-600 shrink-0" />
              Akses Jalan Utama
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">
              Hanya 300 meter dari poros jalan raya provinsi Surabaya - Malang KM 48. Akses mudah dilalui kendaraan roda dua & empat.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1">
            <span className="font-extrabold text-sky-950 block text-xs flex items-center gap-1.5">
              <Building className="w-4 h-4 text-sky-600 shrink-0" />
              Fasilitas Sekitar
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">
              Dekat Kantor Desa Suwayuwo, Polsek Sukorejo, SPBU Suwayuwo, Puskesmas Sukorejo, dan akses Tol Pandaan - Malang.
            </p>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL PREVIEW FOTO AREA */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-60 bg-black/90 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-2.5 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[75vh] overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.title}
              className="max-h-[72vh] max-w-full object-contain mx-auto rounded-xl"
            />
          </div>

          <div className="mt-4 bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-2xl text-center text-white max-w-xl border border-white/20">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-emerald-500/30">
              {selectedPhoto.category}
            </span>
            <h4 className="font-extrabold text-base text-white">{selectedPhoto.title}</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {selectedPhoto.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
