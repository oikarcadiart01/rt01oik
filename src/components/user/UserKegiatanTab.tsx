import React, { useState } from 'react';
import { CommunityEvent, EventStatus } from '../../types';
import { formatDateIndo } from '../../utils/formatters';
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Search,
} from 'lucide-react';

interface UserKegiatanTabProps {
  events: CommunityEvent[];
}

export const UserKegiatanTab: React.FC<UserKegiatanTabProps> = ({ events }) => {
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
      <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-amber-500/15 rounded-3xl p-6 sm:p-7 border border-emerald-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md">
              <CalendarDays className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
                  Agenda Warga & Guyub Rukun
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Agenda Kegiatan Warga & Lingkungan
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Gotong royong, ronda malam, posyandu, dan kebersamaan Cluster Arcadia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-emerald-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl w-full sm:w-auto justify-center overflow-x-auto">
          <button
            onClick={() => setActiveFilter('Semua')}
            className={`px-4 py-2 rounded-xl font-bold transition-all min-h-[38px] ${
              activeFilter === 'Semua'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua ({events.length})
          </button>
          <button
            onClick={() => setActiveFilter('Akan Datang')}
            className={`px-4 py-2 rounded-xl font-bold transition-all min-h-[38px] ${
              activeFilter === 'Akan Datang'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Akan Datang ({events.filter(e => e.status === 'Akan Datang').length})
          </button>
          <button
            onClick={() => setActiveFilter('Selesai')}
            className={`px-4 py-2 rounded-xl font-bold transition-all min-h-[38px] ${
              activeFilter === 'Selesai'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Selesai ({events.filter(e => e.status === 'Selesai').length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Cari agenda kegiatan..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden min-h-[42px]"
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div
              key={event.id}
              className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-emerald-300 transition-all group"
            >
              <div>
                {/* Event Banner Image */}
                <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={event.fotoUrl || 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&auto=format&fit=crop&q=80'}
                    alt={event.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/95 text-slate-800 shadow-sm border border-slate-200">
                      {event.kategori}
                    </span>
                  </div>

                  <div className="absolute top-3.5 right-3.5">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black shadow-sm ${
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
    </div>
  );
};
