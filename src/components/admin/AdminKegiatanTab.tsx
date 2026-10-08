import React, { useState } from 'react';
import { CommunityEvent, EventStatus, EventDocumentation } from '../../types';
import { formatDateIndo } from '../../utils/formatters';
import { ConfirmDialog } from '../modals/ConfirmDialog';
import { AddEditKegiatanModal } from './AddEditKegiatanModal';
import { AddEditDokumentasiModal } from './AddEditDokumentasiModal';
import { FolderDetailModal } from './FolderDetailModal';
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  PlusCircle,
  Search,
  Trash2,
  Edit3,
  Layers,
  Table as TableIcon,
  Images,
  FolderPlus,
  Eye,
  Camera,
  Sparkles,
} from 'lucide-react';

interface AdminKegiatanTabProps {
  events: CommunityEvent[];
  onSaveEvent: (event: CommunityEvent) => void;
  onDeleteEvent: (eventId: string) => void;
  documentations?: EventDocumentation[];
  onSaveDocumentation?: (doc: EventDocumentation) => void;
  onDeleteDocumentation?: (id: string) => void;
}

export const AdminKegiatanTab: React.FC<AdminKegiatanTabProps> = ({
  events,
  onSaveEvent,
  onDeleteEvent,
  documentations = [],
  onSaveDocumentation,
  onDeleteDocumentation,
}) => {
  // Navigation between Agenda and Dokumentasi within Kegiatan Lingkungan
  const [activeSection, setActiveSection] = useState<'agenda' | 'dokumentasi'>('agenda');

  // Agenda states
  const [activeFilter, setActiveFilter] = useState<'Semua' | EventStatus>('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<CommunityEvent | null>(null);
  const [eventToDelete, setEventToDelete] = useState<CommunityEvent | null>(null);

  // Documentation states
  const [isAddDocModalOpen, setIsAddDocModalOpen] = useState(false);
  const [docToEdit, setDocToEdit] = useState<EventDocumentation | null>(null);
  const [activeFolderView, setActiveFolderView] = useState<EventDocumentation | null>(null);

  // Filtered Events
  const filteredEvents = events.filter(e => {
    const matchesFilter = activeFilter === 'Semua' || e.status === activeFilter;
    const matchesSearch =
      e.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Filtered Documentations
  const filteredDocs = documentations.filter(doc => {
    const q = searchTerm.toLowerCase();
    return (
      doc.kegiatanJudul.toLowerCase().includes(q) ||
      doc.tanggal.toLowerCase().includes(q) ||
      doc.folderName.toLowerCase().includes(q) ||
      (doc.lokasi && doc.lokasi.toLowerCase().includes(q)) ||
      (doc.keterangan && doc.keterangan.toLowerCase().includes(q))
    );
  });

  const totalPhotos = documentations.reduce(
    (sum, d) => sum + (d.fotoList?.length || 0),
    0
  );

  // Helper to find docs related to an event
  const getDocumentationForEvent = (event: CommunityEvent) => {
    return documentations.find(
      d =>
        d.kegiatanJudul.toLowerCase().trim() === event.judul.toLowerCase().trim() ||
        (d.tanggal === event.tanggal && d.kegiatanJudul.toLowerCase().includes(event.judul.toLowerCase().slice(0, 10)))
    );
  };

  const handleEditClick = (event: CommunityEvent) => {
    setEventToEdit(event);
  };

  const handleCloseEventModal = () => {
    setEventToEdit(null);
    setIsAddEventModalOpen(false);
  };

  const handleSaveEventModal = (savedEvent: CommunityEvent) => {
    onSaveEvent(savedEvent);
    handleCloseEventModal();
  };

  const handleConfirmDeleteEvent = () => {
    if (eventToDelete) {
      onDeleteEvent(eventToDelete.id);
      setEventToDelete(null);
    }
  };

  // Open documentation for a specific event
  const handleOpenEventDocumentation = (event: CommunityEvent) => {
    const existingDoc = getDocumentationForEvent(event);
    if (existingDoc) {
      setActiveFolderView(existingDoc);
    } else {
      // Create new documentation pre-filled with this event's info
      setDocToEdit({
        id: `doc-${Date.now()}`,
        folderName: `${event.judul.trim().replace(/[/\\?%*:|"<>]/g, '-')}_${event.tanggal}`,
        kegiatanJudul: event.judul,
        tanggal: event.tanggal,
        lokasi: event.lokasi,
        keterangan: event.deskripsi,
        fotoList: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setIsAddDocModalOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar - Bright & Radiant */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-amber-500/15 rounded-3xl p-5 sm:p-7 border border-emerald-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md shrink-0">
              <CalendarDays className="w-6 h-6" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
                  Kegiatan & Dokumentasi RT 01
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-900 px-2.5 py-0.5 rounded-full">
                  Agenda & Galeri Foto
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Kegiatan Lingkungan & Dokumentasi Foto
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Kelola jadwal agenda lingkungan, rincian kegiatan warga, serta unggah dan dokumentasikan arsip foto acara.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button: Tergantung Tab Aktif */}
        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-start md:justify-end">
          {activeSection === 'agenda' ? (
            <button
              onClick={() => setIsAddEventModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer min-h-[42px]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Buat Agenda Baru</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setDocToEdit(null);
                setIsAddDocModalOpen(true);
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer min-h-[42px]"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Upload Dokumentasi Foto</span>
            </button>
          )}
        </div>
      </div>

      {/* TOP UNIFIED SWITCHER: Agenda Kegiatan vs Dokumentasi Foto */}
      <div className="bg-white p-2 rounded-2xl border border-emerald-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setActiveSection('agenda')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer min-h-[40px] ${
              activeSection === 'agenda'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>Agenda Kegiatan ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('dokumentasi')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer min-h-[40px] ${
              activeSection === 'dokumentasi'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Images className="w-4 h-4" />
            <span>Dokumentasi Foto ({totalPhotos} Foto)</span>
          </button>
        </div>

        {/* View Mode Toggle (Untuk Agenda) */}
        {activeSection === 'agenda' && (
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold self-end sm:self-auto">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white text-emerald-800 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Kartu</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-emerald-800 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel</span>
            </button>
          </div>
        )}
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className="bg-white p-3.5 sm:p-4 rounded-3xl border border-emerald-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {activeSection === 'agenda' && (
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
        )}

        <div className={`relative ${activeSection === 'agenda' ? 'w-full sm:w-80' : 'w-full'}`}>
          <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              activeSection === 'agenda'
                ? 'Cari nama acara, kategori, PIC, lokasi...'
                : 'Cari dokumentasi foto berdasarkan nama kegiatan atau tanggal...'
            }
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* SECTION 1: AGENDA KEGIATAN VIEW */}
      {activeSection === 'agenda' && (
        <>
          {/* CARDS VIEW */}
          {viewMode === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => {
                  const eventDoc = getDocumentationForEvent(event);
                  const docPhotoCount = eventDoc?.fotoList?.length || 0;

                  return (
                    <div
                      key={event.id}
                      className="bg-white rounded-3xl border border-emerald-100 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                    >
                      <div>
                        {/* Event Banner Image with Badges */}
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

                          {/* Foto Dokumentasi Badge if exists */}
                          {docPhotoCount > 0 && (
                            <div className="absolute top-3 right-3">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-teal-500/90 text-white backdrop-blur-md flex items-center gap-1 shadow-md">
                                <Camera className="w-3 h-3" />
                                {docPhotoCount} Foto
                              </span>
                            </div>
                          )}

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
                              <span>
                                PIC: <strong>{event.penanggungJawab}</strong>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions: Dokumentasi Foto, Edit, Delete */}
                      <div className="p-4 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                        {/* Tombol Dokumentasi Foto Terpadu */}
                        <button
                          onClick={() => handleOpenEventDocumentation(event)}
                          title="Dokumentasi & Unggah Foto Kegiatan"
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer min-h-[36px] ${
                            docPhotoCount > 0
                              ? 'bg-teal-100 hover:bg-teal-200 text-teal-900 border border-teal-300'
                              : 'bg-white hover:bg-teal-50 text-teal-700 border border-teal-200'
                          }`}
                        >
                          <Camera className="w-3.5 h-3.5 text-teal-600" />
                          <span>{docPhotoCount > 0 ? `${docPhotoCount} Foto` : 'Tambah Foto'}</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleEditClick(event)}
                            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer min-h-[36px]"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => setEventToDelete(event)}
                            title="Hapus Agenda"
                            className="p-2 text-rose-600 hover:text-rose-700 rounded-xl hover:bg-rose-100 border border-rose-200 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-200">
                  Tidak ada agenda kegiatan yang sesuai filter saat ini.
                </div>
              )}
            </div>
          )}

          {/* TABLE VIEW */}
          {viewMode === 'table' && (
            <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-emerald-100 flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Daftar Seluruh Agenda Kegiatan ({filteredEvents.length} Acara)
                </h3>
                <button
                  onClick={() => setIsAddEventModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Buat Agenda
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-black tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Nama Kegiatan</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Tanggal & Waktu</th>
                      <th className="py-3 px-4">Lokasi</th>
                      <th className="py-3 px-4">PIC</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-center">Foto</th>
                      <th className="py-3 px-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEvents.map(event => {
                      const doc = getDocumentationForEvent(event);
                      const photoCount = doc?.fotoList?.length || 0;

                      return (
                        <tr key={event.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs truncate">
                            {event.judul}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[10px]">
                              {event.kategori}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            <div>{formatDateIndo(event.tanggal)}</div>
                            <div className="text-[10px] text-slate-400">{event.waktu}</div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">{event.lokasi}</td>
                          <td className="py-3.5 px-4 font-medium text-slate-800">
                            {event.penanggungJawab}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                event.status === 'Akan Datang'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {event.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={() => handleOpenEventDocumentation(event)}
                              className="px-2 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Camera className="w-3 h-3 text-teal-600" />
                              <span>{photoCount}</span>
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleEditClick(event)}
                                className="p-1.5 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                                title="Edit Agenda"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEventToDelete(event)}
                                className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                                title="Hapus Agenda"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* SECTION 2: DOKUMENTASI FOTO KEGIATAN VIEW (TERPADU) */}
      {activeSection === 'dokumentasi' && (
        <div className="space-y-6">
          {filteredDocs.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
              <Images className="w-14 h-14 text-slate-300 mx-auto" />
              <h3 className="font-extrabold text-slate-800 text-base">
                Belum Ada Dokumentasi Foto Kegiatan
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Unggah hasil foto kegiatan lingkungan (kerja bakti, peringatan 17 Agustus, rembug warga, dll).
              </p>
              <button
                onClick={() => {
                  setDocToEdit(null);
                  setIsAddDocModalOpen(true);
                }}
                className="mt-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
              >
                <FolderPlus className="w-4 h-4" />
                Upload Foto Sekarang
              </button>
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
                      {/* Top Strip with Event Title & Photo Count */}
                      <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border-b border-emerald-100/70 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <span className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-wider block">
                            Dokumentasi Kegiatan
                          </span>
                          <h3 className="font-black text-slate-900 text-sm sm:text-base leading-snug truncate">
                            {doc.kegiatanJudul}
                          </h3>
                        </div>

                        <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shrink-0 shadow-2xs">
                          {doc.fotoList.length} Foto
                        </span>
                      </div>

                      {/* Photo Collage Preview */}
                      <div
                        onClick={() => setActiveFolderView(doc)}
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
                                  alt={`Preview ${idx + 1}`}
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
                          <div className="aspect-video rounded-2xl bg-slate-100 border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 p-4">
                            <Images className="w-8 h-8 mb-1" />
                            <span className="text-xs font-medium">Belum ada foto</span>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="p-4 sm:p-5 space-y-2">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                          <span className="flex items-center gap-1.5 font-semibold text-emerald-800">
                            <CalendarDays className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{formatDateIndo(doc.tanggal)}</span>
                          </span>

                          {doc.lokasi && (
                            <span className="flex items-center gap-1 text-slate-600 truncate max-w-[180px]">
                              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                              <span className="truncate">{doc.lokasi}</span>
                            </span>
                          )}
                        </div>

                        {doc.keterangan && (
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-1">
                            {doc.keterangan}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActiveFolderView(doc)}
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Lihat & Kelola Foto</span>
                      </button>

                      <button
                        onClick={() => {
                          setDocToEdit(doc);
                          setIsAddDocModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                        title="Edit data dokumentasi"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              `Yakin ingin menghapus dokumentasi "${doc.kegiatanJudul}"?`
                            )
                          ) {
                            if (onDeleteDocumentation) onDeleteDocumentation(doc.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                        title="Hapus dokumentasi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Modal Tambah/Edit Agenda Kegiatan */}
      <AddEditKegiatanModal
        isOpen={isAddEventModalOpen || !!eventToEdit}
        onClose={handleCloseEventModal}
        onSave={handleSaveEventModal}
        event={eventToEdit}
      />

      {/* Modal Dialog Konfirmasi Hapus Agenda */}
      <ConfirmDialog
        isOpen={!!eventToDelete}
        title="Hapus Agenda Kegiatan?"
        message={`Apakah Anda yakin ingin menghapus agenda kegiatan "${eventToDelete?.judul}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus Kegiatan"
        cancelText="Batal"
        onConfirm={handleConfirmDeleteEvent}
        onCancel={() => setEventToDelete(null)}
      />

      {/* Modal Tambah/Edit Dokumentasi Foto (Organized strictly as nama kegiatan_tanggal in code) */}
      {onSaveDocumentation && (
        <AddEditDokumentasiModal
          isOpen={isAddDocModalOpen || !!docToEdit}
          onClose={() => {
            setIsAddDocModalOpen(false);
            setDocToEdit(null);
          }}
          onSave={onSaveDocumentation}
          documentationToEdit={docToEdit}
          events={events}
        />
      )}

      {/* Modal Detail & Viewer Foto Dokumentasi */}
      {onSaveDocumentation && onDeleteDocumentation && (
        <FolderDetailModal
          isOpen={!!activeFolderView}
          onClose={() => setActiveFolderView(null)}
          folder={activeFolderView}
          onUpdateFolder={updated => {
            onSaveDocumentation(updated);
            setActiveFolderView(updated);
          }}
          onDeleteFolder={folderId => {
            onDeleteDocumentation(folderId);
            setActiveFolderView(null);
          }}
        />
      )}
    </div>
  );
};
