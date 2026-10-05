import React, { useState } from 'react';
import { Complaint, ComplaintStatus } from '../../types';
import { formatDateIndo } from '../../utils/formatters';
import {
  MessageSquareWarning,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Home,
  MessageCircle,
  User,
  ShieldAlert,
  Send,
  Filter,
  Search,
  CheckCheck,
} from 'lucide-react';

interface PengaduanTabProps {
  complaints: Complaint[];
  isAdminMode: boolean;
  onOpenAddComplaint: () => void;
  onUpdateComplaintStatus: (
    id: string,
    status: ComplaintStatus,
    tanggapan: string,
    petugas: string
  ) => void;
  onDeleteComplaint?: (id: string) => void;
}

export const PengaduanTab: React.FC<PengaduanTabProps> = ({
  complaints,
  isAdminMode,
  onOpenAddComplaint,
  onUpdateComplaintStatus,
  onDeleteComplaint,
}) => {
  const [activeFilter, setActiveFilter] = useState<'Semua' | ComplaintStatus>('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComplaintForResponse, setSelectedComplaintForResponse] = useState<Complaint | null>(null);
  const [responseText, setResponseText] = useState('');
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('Diproses');
  const [petugasName, setPetugasName] = useState('Pengurus RT 01');

  const filteredComplaints = complaints.filter(c => {
    const matchesFilter = activeFilter === 'Semua' || c.status === activeFilter;
    const matchesSearch =
      c.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.tiketNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.blokRumah.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleOpenResponseModal = (c: Complaint) => {
    setSelectedComplaintForResponse(c);
    setResponseText(c.tanggapanPengurus || '');
    setNewStatus(c.status);
    setPetugasName(c.petugasTindakLanjut || 'Pengurus RT 01');
  };

  const handleSaveResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaintForResponse) return;

    onUpdateComplaintStatus(
      selectedComplaintForResponse.id,
      newStatus,
      responseText,
      petugasName
    );
    setSelectedComplaintForResponse(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-100 text-amber-800 rounded-xl">
              <MessageSquareWarning className="w-5 h-5 text-amber-700" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Pusat Pengaduan & Aspirasi Lingkungan
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Layanan cepat tanggap fasilitas, kebersihan, ketertiban & keamanan Cluster Arcadia
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenAddComplaint}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Buat Laporan Aduan</span>
        </button>
      </div>

      {/* Filter Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveFilter('Semua')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeFilter === 'Semua'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="text-xs font-semibold block opacity-80">Total Pengaduan</span>
          <span className="text-2xl font-black mt-1 block">{complaints.length}</span>
        </button>

        <button
          onClick={() => setActiveFilter('Menunggu')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeFilter === 'Menunggu'
              ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="text-xs font-semibold block opacity-80">Menunggu Verifikasi</span>
          <span className="text-2xl font-black mt-1 block text-amber-600">
            {complaints.filter(c => c.status === 'Menunggu').length}
          </span>
        </button>

        <button
          onClick={() => setActiveFilter('Diproses')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeFilter === 'Diproses'
              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="text-xs font-semibold block opacity-80">Sedang Ditangani</span>
          <span className="text-2xl font-black mt-1 block text-blue-600">
            {complaints.filter(c => c.status === 'Diproses').length}
          </span>
        </button>

        <button
          onClick={() => setActiveFilter('Selesai')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeFilter === 'Selesai'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="text-xs font-semibold block opacity-80">Selesai Dituntaskan</span>
          <span className="text-2xl font-black mt-1 block text-emerald-600">
            {complaints.filter(c => c.status === 'Selesai').length}
          </span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari berdasarkan nomor tiket, blok, atau masalah..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
          />
        </div>

        <div className="text-xs text-slate-500">
          Menampilkan <strong>{filteredComplaints.length}</strong> pengaduan
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map(cmp => (
            <div
              key={cmp.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 hover:border-slate-300 transition-all space-y-4"
            >
              {/* Ticket Top bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                    #{cmp.tiketNo}
                  </span>
                  <span className="text-xs font-semibold text-slate-800 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md border border-amber-200/60">
                    {cmp.kategori}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      cmp.prioritas === 'Mendesak / Darurat'
                        ? 'bg-rose-100 text-rose-700 border border-rose-200'
                        : cmp.prioritas === 'Sedang'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {cmp.prioritas}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-2xs ${
                      cmp.status === 'Selesai'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : cmp.status === 'Diproses'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {cmp.status === 'Selesai' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : cmp.status === 'Diproses' ? (
                      <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    )}
                    {cmp.status}
                  </span>

                  {isAdminMode && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenResponseModal(cmp)}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold"
                      >
                        Update Status
                      </button>
                      {onDeleteComplaint && (
                        <button
                          onClick={() => {
                            if (confirm(`Hapus tiket aduan #${cmp.tiketNo} (${cmp.judul})?`)) {
                              onDeleteComplaint(cmp.id);
                            }
                          }}
                          title="Hapus Aduan"
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-bold text-slate-900 text-base">{cmp.judul}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {cmp.deskripsi}
                </p>
              </div>

              {/* Metadata: Location, Reporter, Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">Lokasi: <strong>{cmp.lokasiSpesifik}</strong></span>
                </div>

                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Pelapor: {cmp.namaPelapor} ({cmp.blokRumah})</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Tanggal Lapor: {formatDateIndo(cmp.tanggalLapor)}</span>
                </div>
              </div>

              {/* Response from Pengurus RT */}
              {cmp.tanggapanPengurus && (
                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                    <span className="flex items-center gap-1.5">
                      <CheckCheck className="w-4 h-4 text-emerald-700" />
                      Tindak Lanjut & Tanggapan Pengurus RT:
                    </span>
                    <span className="text-[11px] font-normal text-emerald-700">
                      Petugas: {cmp.petugasTindakLanjut || 'Pengurus RT 01'}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-950 leading-relaxed font-normal">
                    {cmp.tanggapanPengurus}
                  </p>
                  {cmp.tanggalSelesai && (
                    <div className="text-[10px] text-emerald-700 font-semibold pt-1">
                      ✓ Dituntaskan pada: {formatDateIndo(cmp.tanggalSelesai)}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            Tidak ada pengaduan warga pada kategori atau filter ini.
          </div>
        )}
      </div>

      {/* Modal Update Status & Tanggapan Pengurus */}
      {selectedComplaintForResponse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base">Tindak Lanjut Pengaduan Warga</h3>
                <p className="text-xs text-slate-400">Tiket #{selectedComplaintForResponse.tiketNo}</p>
              </div>
              <button
                onClick={() => setSelectedComplaintForResponse(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveResponse} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Status Penanganan Aduan
                </label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value as ComplaintStatus)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                >
                  <option value="Menunggu">Menunggu Verifikasi</option>
                  <option value="Diproses">Sedang Diproses Pengurus</option>
                  <option value="Selesai">Selesai Ditangani</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Petugas / Seksi Penanggung Jawab
                </label>
                <input
                  type="text"
                  required
                  value={petugasName}
                  onChange={e => setPetugasName(e.target.value)}
                  placeholder="Contoh: Moch. Subhan (Seksi Kebersihan)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Uraian Tanggapan / Solusi untuk Warga *
                </label>
                <textarea
                  required
                  rows={4}
                  value={responseText}
                  onChange={e => setResponseText(e.target.value)}
                  placeholder="Tuliskan tindakan yang telah atau sedang diambil oleh pengurus..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedComplaintForResponse(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
                >
                  Simpan & Perbarui Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
