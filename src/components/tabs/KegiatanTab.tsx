import React, { useState } from 'react';
import { CommunityEvent, EventStatus } from '../../types';
import { formatDateIndo } from '../../utils/formatters';
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  PlusCircle,
  Search,
  Trash2,
} from 'lucide-react';

interface KegiatanTabProps {
  events: CommunityEvent[];
  isAdminMode: boolean;
  onOpenAddEvent: () => void;
  onDeleteEvent?: (eventId: string) => void;
}

export const KegiatanTab: React.FC<KegiatanTabProps> = ({
  events,
  isAdminMode,
  onOpenAddEvent,
  onDeleteEvent,
}) => {
  const [activeFilter, setActiveFilter] = useState<'Semua' | EventStatus>('Semua');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(e => {
    const matchesFilter = activeFilter === 'Semua' || e.status === activeFilter;
    const matchesSearch =
      e.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <CalendarDays className="w-5 h-5 text-emerald-700" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Agenda Kegiatan Warga & Lingkungan
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Gotong royong, ronda malam, posyandu, dan kebersamaan Cluster Arcadia
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAdminMode && (
            <button
              onClick={onOpenAddEvent}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Buat Agenda Baru</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto justify-center">
          <button
            onClick={() => setActiveFilter('Semua')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeFilter === 'Semua'
                ? 'bg-white text-emerald-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua ({events.length})
          </button>
          <button
            onClick={() => setActiveFilter('Akan Datang')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeFilter === 'Akan Datang'
                ? 'bg-white text-emerald-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Akan Datang ({events.filter(e => e.status === 'Akan Datang').length})
          </button>
          <button
            onClick={() => setActiveFilter('Selesai')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeFilter === 'Selesai'
                ? 'bg-white text-emerald-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Selesai ({events.filter(e => e.status === 'Selesai').length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari agenda kegiatan..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Events Grid - Tanpa daftar kehadiran & konfirmasi kehadiran sesuai permintaan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-xs transition-all group"
            >
              <div>
                {/* Event Banner Image */}
                <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={event.fotoUrl || 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&auto=format&fit=crop&q=80'}
                    alt={event.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-slate-800 shadow-2xs">
                      {event.kategori}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-2xs ${
                        event.status === 'Akan Datang'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-700 text-slate-200'
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xs font-semibold text-emerald-300 flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {formatDateIndo(event.tanggal)}
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2">
                    {event.judul}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {event.deskripsi}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{event.waktu}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">{event.lokasi}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>PIC: {event.penanggungJawab}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clean Footer (Daftar kehadiran & konfirmasi kehadiran dihapus sesuai instruksi) */}
              <div className="p-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="truncate max-w-[220px]">
                  Sasaran: <strong className="text-slate-700">{event.targetPeserta}</strong>
                </span>

                {isAdminMode && onDeleteEvent && (
                  <button
                    onClick={() => {
                      if (confirm(`Hapus agenda kegiatan "${event.judul}"?`)) {
                        onDeleteEvent(event.id);
                      }
                    }}
                    title="Hapus Agenda"
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            Tidak ada agenda kegiatan yang sesuai filter saat ini.
          </div>
        )}
      </div>
    </div>
  );
};
