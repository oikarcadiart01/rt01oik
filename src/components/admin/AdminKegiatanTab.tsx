import React, { useState } from 'react';
import { CommunityEvent, EventStatus } from '../../types';
import { formatDateIndo } from '../../utils/formatters';
import { ConfirmDialog } from '../modals/ConfirmDialog';
import { AddEditKegiatanModal } from './AddEditKegiatanModal';
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  PlusCircle,
  Search,
  Trash2,
  Edit3,
  Calendar,
  Layers,
  Table as TableIcon,
} from 'lucide-react';

interface AdminKegiatanTabProps {
  events: CommunityEvent[];
  onSaveEvent: (event: CommunityEvent) => void;
  onDeleteEvent: (eventId: string) => void;
}

export const AdminKegiatanTab: React.FC<AdminKegiatanTabProps> = ({
  events,
  onSaveEvent,
  onDeleteEvent,
}) => {
  const [activeFilter, setActiveFilter] = useState<'Semua' | EventStatus>('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<CommunityEvent | null>(null);
  const [eventToDelete, setEventToDelete] = useState<CommunityEvent | null>(null);

  const filteredEvents = events.filter(e => {
    const matchesFilter = activeFilter === 'Semua' || e.status === activeFilter;
    const matchesSearch =
      e.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleEditClick = (event: CommunityEvent) => {
    setEventToEdit(event);
  };

  const handleCloseModal = () => {
    setEventToEdit(null);
    setIsAddModalOpen(false);
  };

  const handleSaveModal = (savedEvent: CommunityEvent) => {
    onSaveEvent(savedEvent);
    handleCloseModal();
  };

  const handleConfirmDelete = () => {
    if (eventToDelete) {
      onDeleteEvent(eventToDelete.id);
      setEventToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar - Bright & Radiant with Admin Management features */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-amber-500/15 rounded-3xl p-5 sm:p-7 border border-emerald-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md shrink-0">
              <CalendarDays className="w-6 h-6" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
                  Agenda Lingkungan (Admin)
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-900 px-2.5 py-0.5 rounded-full">
                  Tambah • Edit • Hapus
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Kelola Kegiatan Warga & Lingkungan
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Admin dapat membuat agenda baru, mengunggah foto poster, mengedit jadwal, atau menghapus kegiatan.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-start md:justify-end">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer min-h-[40px]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Buat Agenda Baru</span>
          </button>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-white/90 p-1 rounded-2xl text-xs font-bold border border-emerald-200 shadow-xs">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer min-h-[36px] ${
                viewMode === 'cards'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Kartu</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer min-h-[36px] ${
                viewMode === 'table'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-emerald-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl w-full sm:w-auto justify-start overflow-x-auto">
          {(['Semua', 'Akan Datang', 'Sedang Berlangsung', 'Selesai', 'Dibatalkan'] as const).map(
            cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all min-h-[36px] whitespace-nowrap cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat === 'Semua' ? `Semua (${events.length})` : cat}
              </button>
            )
          )}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari kegiatan, lokasi, PIC..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden transition-all"
          />
        </div>
      </div>

      {/* CARDS VIEW */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <div
                key={event.id}
                className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-emerald-300 transition-all group"
              >
                <div>
                  {/* Image Banner Header */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={
                        event.fotoUrl ||
                        'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&auto=format&fit=crop&q=80'
                      }
                      alt={event.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                    {/* Category & Status Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-emerald-800 shadow-xs border border-white/40">
                        {event.kategori}
                      </span>

                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs ${
                          event.status === 'Akan Datang'
                            ? 'bg-amber-400 text-slate-950'
                            : event.status === 'Sedang Berlangsung'
                            ? 'bg-cyan-500 text-white animate-pulse'
                            : event.status === 'Selesai'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-500 text-white'
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>

                    {/* Date on Banner */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                      <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 drop-shadow-sm">
                        <Calendar className="w-4 h-4 text-amber-300" />
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

                {/* Footer with Edit & Delete actions */}
                <div className="p-4 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <span className="truncate text-slate-600 text-[11px] font-medium max-w-[130px]">
                    Sasaran: <strong className="text-slate-800">{event.targetPeserta}</strong>
                  </span>

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
            ))
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
              onClick={() => setIsAddModalOpen(true)}
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
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredEvents.map(ev => (
                  <tr key={ev.id} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={ev.fotoUrl}
                          alt={ev.judul}
                          className="w-10 h-10 rounded-xl object-cover border border-emerald-200 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-xs sm:text-sm">
                            {ev.judul}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">
                            PIC: {ev.penanggungJawab}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg text-[11px]">
                        {ev.kategori}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div>{formatDateIndo(ev.tanggal)}</div>
                      <div className="text-[11px] text-slate-500">{ev.waktu}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{ev.lokasi}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          ev.status === 'Akan Datang'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : ev.status === 'Sedang Berlangsung'
                            ? 'bg-cyan-100 text-cyan-800 border border-cyan-300'
                            : ev.status === 'Selesai'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {ev.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleEditClick(ev)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer border border-emerald-200"
                        >
                          <Edit3 className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => setEventToDelete(ev)}
                          className="p-1 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors cursor-pointer border border-rose-200"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Add / Edit Agenda Kegiatan */}
      <AddEditKegiatanModal
        isOpen={isAddModalOpen || eventToEdit !== null}
        onClose={handleCloseModal}
        event={eventToEdit}
        onSave={handleSaveModal}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!eventToDelete}
        title="Hapus Agenda Kegiatan"
        message={`Apakah Anda yakin ingin menghapus agenda kegiatan "${eventToDelete?.judul}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus Agenda"
        onConfirm={handleConfirmDelete}
        onCancel={() => setEventToDelete(null)}
      />
    </div>
  );
};
