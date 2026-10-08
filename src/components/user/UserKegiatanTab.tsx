import React, { useState } from 'react';
import { CommunityEvent, EventStatus, EventDocumentation, DocumentationPhoto } from '../../types';
import { formatDateIndo } from '../../utils/formatters';
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Search,
  Images,
  Folder,
  Eye,
  ZoomIn,
  X,
  Sparkles,
} from 'lucide-react';

interface UserKegiatanTabProps {
  events: CommunityEvent[];
  documentations?: EventDocumentation[];
}

export const UserKegiatanTab: React.FC<UserKegiatanTabProps> = ({
  events,
  documentations = [],
}) => {
  const [subView, setSubView] = useState<'agenda' | 'dokumentasi'>('agenda');
  const [activeFilter, setActiveFilter] = useState<'Semua' | EventStatus>('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<EventDocumentation | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<DocumentationPhoto | null>(null);

  const filteredEvents = events.filter(e => {
    const matchesFilter = activeFilter === 'Semua' || e.status === activeFilter;
    const matchesSearch =
      e.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredDocs = documentations.filter(d => {
    const q = searchTerm.toLowerCase();
    return (
      d.folderName.toLowerCase().includes(q) ||
      d.kegiatanJudul.toLowerCase().includes(q) ||
      d.tanggal.toLowerCase().includes(q) ||
      (d.keterangan && d.keterangan.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-amber-500/15 rounded-3xl p-6 sm:p-7 border border-emerald-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md">
              <CalendarDays className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
                  Agenda & Dokumentasi Warga
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Kegiatan Lingkungan & Dokumentasi Foto
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Gotong royong, ronda malam, posyandu, dan arsip foto kebersamaan warga Cluster Arcadia
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher: Agenda vs Dokumentasi */}
        <div className="flex items-center gap-1.5 bg-white/90 p-1.5 rounded-2xl border border-emerald-200 shadow-xs self-stretch sm:self-auto">
          <button
            onClick={() => setSubView('agenda')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[38px] ${
              subView === 'agenda'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Agenda Kegiatan ({events.length})</span>
          </button>

          <button
            onClick={() => setSubView('dokumentasi')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[38px] ${
              subView === 'dokumentasi'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Images className="w-3.5 h-3.5" />
            <span>Foto & Album ({documentations.length})</span>
          </button>
        </div>
      </div>

      {/* SUBVIEW 1: AGENDA KEGIATAN */}
      {subView === 'agenda' && (
        <>
          {/* Filter & Search Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-emerald-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl w-full sm:w-auto justify-center overflow-x-auto">
              <button
                onClick={() => setActiveFilter('Semua')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeFilter === 'Semua'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setActiveFilter('Akan Datang')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeFilter === 'Akan Datang'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Akan Datang
              </button>
              <button
                onClick={() => setActiveFilter('Sedang Berlangsung')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeFilter === 'Sedang Berlangsung'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Berlangsung
              </button>
              <button
                onClick={() => setActiveFilter('Selesai')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeFilter === 'Selesai'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Selesai
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari kegiatan, lokasi, PIC..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Grid Cards Event */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <div
                  key={event.id}
                  className="bg-white rounded-3xl border border-emerald-100 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Event Banner Image */}
                    <div className="relative aspect-video overflow-hidden bg-slate-900">
                      <img
                        src={
                          event.fotoUrl ||
                          'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80'
                        }
                        alt={event.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                      <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-amber-300 border border-amber-300/30">
                          {event.kategori}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            event.status === 'Akan Datang'
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                              : 'bg-slate-700 text-slate-200'
                          }`}
                        >
                          {event.status}
                        </span>
                      </div>

                      <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                        <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 drop-shadow-sm">
                          <CalendarDays className="w-4 h-4 text-amber-300" />
                          {formatDateIndo(event.tanggal)}
                        </div>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 space-y-3">
                      <h3 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-2">
                        {event.judul}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {event.deskripsi}
                      </p>

                      <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600 font-medium">
                        <div className="flex items-center gap-2 text-slate-800 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{event.waktu}</span>
                        </div>

                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                          <span className="leading-tight">{event.lokasi}</span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <Users className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span>PIC: <strong>{event.penanggungJawab}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clean Footer */}
                  <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <span className="truncate">
                      Sasaran: <strong className="text-slate-800">{event.targetPeserta}</strong>
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold">RT 01 RW 12</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-200">
                Tidak ada agenda kegiatan yang sesuai filter saat ini.
              </div>
            )}
          </div>
        </>
      )}

      {/* SUBVIEW 2: DOKUMENTASI & ALBUM FOTO KEGIATAN */}
      {subView === 'dokumentasi' && (
        <div className="space-y-6">
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-emerald-100 shadow-xs flex items-center gap-3">
            <Search className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
            <input
              type="text"
              placeholder="Cari dokumentasi kegiatan berdasarkan nama acara, tanggal, atau folder..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none"
            />
          </div>

          {filteredDocs.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-2">
              <Images className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="font-extrabold text-slate-800 text-base">Belum Ada Dokumentasi Kegiatan</h4>
              <p className="text-xs text-slate-500">
                Dokumentasi foto kegiatan lingkungan akan ditampilkan di sini oleh pengurus RT.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDocs.map(doc => {
                const previewPhotos = doc.fotoList.slice(0, 4);

                return (
                  <div
                    key={doc.id}
                    className="bg-white rounded-3xl border border-emerald-100 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      {/* Folder Name Strip */}
                      <div className="p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border-b border-emerald-100/70 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Folder className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                          <span
                            title={doc.folderName}
                            className="font-mono text-xs font-bold text-emerald-950 truncate"
                          >
                            {doc.folderName}
                          </span>
                        </div>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white shrink-0">
                          {doc.fotoList.length} Foto
                        </span>
                      </div>

                      {/* Photo Collage Preview */}
                      <div
                        onClick={() => setSelectedFolder(doc)}
                        className="p-3 bg-slate-50 cursor-pointer"
                      >
                        {previewPhotos.length > 0 ? (
                          <div
                            className={`grid gap-1.5 rounded-2xl overflow-hidden aspect-video bg-slate-200 ${
                              previewPhotos.length === 1
                                ? 'grid-cols-1'
                                : previewPhotos.length === 2
                                ? 'grid-cols-2'
                                : previewPhotos.length === 3
                                ? 'grid-cols-3'
                                : 'grid-cols-2 grid-rows-2'
                            }`}
                          >
                            {previewPhotos.map((p, idx) => (
                              <div key={p.id} className="relative w-full h-full overflow-hidden">
                                <img
                                  src={p.url}
                                  alt={`Foto ${idx + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {idx === 3 && doc.fotoList.length > 4 && (
                                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold">
                                    +{doc.fotoList.length - 4} Foto
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="aspect-video rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                            Belum ada foto
                          </div>
                        )}
                      </div>

                      {/* Info Text */}
                      <div className="p-4 space-y-2">
                        <h4 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-2">
                          {doc.kegiatanJudul}
                        </h4>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                          <CalendarDays className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{formatDateIndo(doc.tanggal)}</span>
                        </div>
                        {doc.keterangan && (
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                            {doc.keterangan}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* View Button */}
                    <div className="p-4 bg-slate-50/80 border-t border-slate-100">
                      <button
                        onClick={() => setSelectedFolder(doc)}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Buka Galeri Foto ({doc.fotoList.length})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* MODAL USER: VIEW FOLDER GALLERY */}
      {selectedFolder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden my-4 max-h-[92vh] flex flex-col">
            <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-5 flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-mono font-bold bg-black/40 px-2.5 py-0.5 rounded-full text-amber-300">
                  📁 {selectedFolder.folderName}
                </span>
                <h3 className="text-lg sm:text-xl font-black mt-1">
                  {selectedFolder.kegiatanJudul}
                </h3>
                <span className="text-xs text-teal-100">
                  {formatDateIndo(selectedFolder.tanggal)} • {selectedFolder.fotoList.length} Foto
                </span>
              </div>
              <button
                onClick={() => setSelectedFolder(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {selectedFolder.fotoList.map((foto, idx) => (
                  <div
                    key={foto.id}
                    onClick={() => setSelectedPhoto(foto)}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md cursor-pointer group"
                  >
                    <div className="aspect-square relative overflow-hidden bg-slate-100">
                      <img
                        src={foto.url}
                        alt={`Foto ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <ZoomIn className="w-6 h-6" />
                      </div>
                    </div>
                    {foto.caption && (
                      <div className="p-2.5 text-xs text-slate-700 font-medium line-clamp-2">
                        {foto.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX PHOTO */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-60 bg-black/90 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-2.5 bg-white/20 hover:bg-white/30 text-white rounded-full cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedPhoto.url}
            alt={selectedPhoto.caption || 'Preview Foto'}
            className="max-h-[80vh] max-w-full object-contain mx-auto rounded-xl"
          />
          {selectedPhoto.caption && (
            <div className="mt-4 bg-slate-900/80 px-5 py-2.5 rounded-2xl text-center text-white text-xs sm:text-sm font-medium max-w-xl">
              {selectedPhoto.caption}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
