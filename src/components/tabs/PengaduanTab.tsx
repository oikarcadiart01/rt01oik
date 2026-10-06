import React, { useState } from 'react';
import { Complaint, ComplaintStatus } from '../../types';
import { formatDateIndo } from '../../utils/formatters';
import { ConfirmDialog } from '../modals/ConfirmDialog';
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
  Trash2,
  X,
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
  const [complaintToDelete, setComplaintToDelete] = useState<Complaint | null>(null);

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

  const handleConfirmDelete = () => {
    if (complaintToDelete && onDeleteComplaint) {
      onDeleteComplaint(complaintToDelete.id);
      setComplaintToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar - Vibrant & Bright */}
      <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-rose-500/15 rounded-3xl p-6 sm:p-7 border border-amber-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl shadow-md">
              <MessageSquareWarning className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full border border-amber-300">
                  Layanan Cepat Tanggap
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Pusat Pengaduan & Aspirasi Lingkungan
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Fasilitas, kebersihan, ketertiban, dan keamanan warga Cluster Arcadia
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenAddComplaint}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 min-h-[44px]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Buat Laporan Aduan</span>
        </button>
      </div>

      {/* Filter Stats - Bright, Radiant & Cheerful */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <button
          onClick={() => setActiveFilter('Semua')}
          className={`p-4 sm:p-5 rounded-3xl border text-left transition-all min-h-[88px] ${
            activeFilter === 'Semua'
              ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-900 shadow-md scale-102'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 shadow-xs'
          }`}
        >
          <span className="text-xs font-bold block opacity-80">Total Pengaduan</span>
          <span className="text-2xl sm:text-3xl font-black mt-1 block">{complaints.length}</span>
        </button>

        <button
          onClick={() => setActiveFilter('Menunggu')}
          className={`p-4 sm:p-5 rounded-3xl border text-left transition-all min-h-[88px] ${
            activeFilter === 'Menunggu'
              ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white border-amber-500 shadow-md scale-102'
              : 'bg-gradient-to-br from-amber-50 via-white to-amber-50/50 text-amber-950 border-amber-200 hover:border-amber-300 shadow-xs'
          }`}
        >
          <span className="text-xs font-bold block opacity-85">Menunggu Verifikasi</span>
          <span className="text-2xl sm:text-3xl font-black mt-1 block">
            {complaints.filter(c => c.status === 'Menunggu').length}
          </span>
        </button>

        <button
          onClick={() => setActiveFilter('Diproses')}
          className={`p-4 sm:p-5 rounded-3xl border text-left transition-all min-h-[88px] ${
            activeFilter === 'Diproses'
              ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white border-blue-600 shadow-md scale-102'
              : 'bg-gradient-to-br from-blue-50 via-white to-cyan-50/50 text-blue-950 border-blue-200 hover:border-blue-300 shadow-xs'
          }`}
        >
          <span className="text-xs font-bold block opacity-85">Sedang Ditangani</span>
          <span className="text-2xl sm:text-3xl font-black mt-1 block">
            {complaints.filter(c => c.status === 'Diproses').length}
          </span>
        </button>

        <button
          onClick={() => setActiveFilter('Selesai')}
          className={`p-4 sm:p-5 rounded-3xl border text-left transition-all min-h-[88px] ${
            activeFilter === 'Selesai'
              ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-emerald-600 shadow-md scale-102'
              : 'bg-gradient-to-br from-emerald-50 via-white to-teal-50/50 text-emerald-950 border-emerald-200 hover:border-emerald-300 shadow-xs'
          }`}
        >
          <span className="text-xs font-bold block opacity-85">Selesai Dituntaskan</span>
          <span className="text-2xl sm:text-3xl font-black mt-1 block">
            {complaints.filter(c => c.status === 'Selesai').length}
          </span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-amber-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Cari berdasarkan nomor tiket, blok, atau masalah..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden min-h-[42px]"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium self-end sm:self-auto">
          Menampilkan <strong className="text-slate-800">{filteredComplaints.length}</strong> pengaduan
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map(cmp => (
            <div
              key={cmp.id}
              className="bg-white rounded-3xl border border-amber-100 shadow-xs p-5 sm:p-6 hover:shadow-md hover:border-amber-300 transition-all space-y-4"
            >
              {/* Ticket Top bar */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-black text-slate-800 bg-slate-100 px-3 py-1 rounded-xl">
                    #{cmp.tiketNo}
                  </span>
                  <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-xl border border-amber-200">
                    {cmp.kategori}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      cmp.prioritas === 'Mendesak / Darurat'
                        ? 'bg-rose-100 text-rose-700 border border-rose-300'
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
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold shadow-2xs ${
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
                        className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-2xs transition-colors min-h-[36px]"
                      >
                        Update Status
                      </button>
                      {onDeleteComplaint && (
                        <button
                          onClick={() => setComplaintToDelete(cmp)}
                          title="Hapus Aduan"
                          className="p-1.5 text-rose-600 hover:text-rose-700 rounded-xl hover:bg-rose-50 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">{cmp.judul}</h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                  {cmp.deskripsi}
                </p>
              </div>

              {/* Metadata: Location, Reporter, Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-600 bg-slate-50/90 p-3.5 rounded-2xl border border-slate-200/70 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <span className="truncate">Lokasi: <strong className="text-slate-800">{cmp.lokasiSpesifik}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Pelapor: <strong className="text-slate-800">{cmp.namaPelapor}</strong> ({cmp.blokRumah})</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tanggal: {formatDateIndo(cmp.tanggalLapor)}</span>
                </div>
              </div>

              {/* Response from Pengurus RT */}
              {cmp.tanggapanPengurus && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                    <span className="flex items-center gap-1.5">
                      <CheckCheck className="w-4 h-4 text-emerald-600" />
                      Tindak Lanjut & Tanggapan Pengurus RT:
                    </span>
                    <span className="text-[11px] font-medium text-emerald-700">
                      Petugas: {cmp.petugasTindakLanjut || 'Pengurus RT 01'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-normal">
                    {cmp.tanggapanPengurus}
                  </p>
                  {cmp.tanggalSelesai && (
                    <div className="text-[11px] text-emerald-700 font-bold pt-1">
                      ✓ Dituntaskan pada: {formatDateIndo(cmp.tanggalSelesai)}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-200">
            Tidak ada pengaduan warga pada kategori atau filter ini.
          </div>
        )}
      </div>

      {/* Modal Update Status & Tanggapan Pengurus */}
      {selectedComplaintForResponse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-base">Tindak Lanjut & Tanggapan Pengurus</h3>
                <p className="text-xs text-slate-300">Tiket #{selectedComplaintForResponse.tiketNo}</p>
              </div>
              <button
                onClick={() => setSelectedComplaintForResponse(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveResponse} className="p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Update Status Aduan
                </label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value as ComplaintStatus)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-hidden min-h-[42px]"
                >
                  <option value="Menunggu">Menunggu Verifikasi</option>
                  <option value="Diproses">Diproses / Sedang Ditangani</option>
                  <option value="Selesai">Selesai Dituntaskan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nama Petugas Penanggung Jawab
                </label>
                <input
                  type="text"
                  required
                  value={petugasName}
                  onChange={e => setPetugasName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Uraian Tindak Lanjut & Tanggapan Pengurus
                </label>
                <textarea
                  required
                  rows={4}
                  value={responseText}
                  onChange={e => setResponseText(e.target.value)}
                  placeholder="Jelaskan tindakan yang diambil (misal: koordinasi dengan petugas satpam, pembersihan saluran selesai dikerjakan, dll)..."
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedComplaintForResponse(null)}
                  className="px-4 py-2.5 rounded-2xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 min-h-[42px]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 min-h-[42px]"
                >
                  Simpan Tindak Lanjut
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!complaintToDelete}
        title="Hapus Tiket Pengaduan"
        message={`Apakah Anda yakin ingin menghapus tiket #${complaintToDelete?.tiketNo} (${complaintToDelete?.judul})?`}
        confirmText="Ya, Hapus Pengaduan"
        onConfirm={handleConfirmDelete}
        onCancel={() => setComplaintToDelete(null)}
      />
    </div>
  );
};
