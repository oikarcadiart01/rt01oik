import React from 'react';
import {
  Resident,
  CashTransaction,
  CommunityEvent,
  Complaint,
  RTAnnouncement,
} from '../../types';
import { formatRupiah, formatDateIndo } from '../../utils/formatters';
import {
  Bell,
  Calendar,
  AlertTriangle,
  Wallet,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
  MapPin,
  Users,
  Shield,
  Send,
  CreditCard,
} from 'lucide-react';
import { NavTab } from '../Navbar';
import { FileText, Receipt, ShieldCheck as ShieldCheckIcon } from 'lucide-react';

interface DashboardTabProps {
  announcements: RTAnnouncement[];
  residents: Resident[];
  transactions: CashTransaction[];
  events: CommunityEvent[];
  complaints: Complaint[];
  setActiveTab: (tab: NavTab) => void;
  onOpenAddComplaint: () => void;
  onOpenCekIuran?: () => void;
  isAdminMode?: boolean;
  letterCount?: number;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  announcements,
  residents,
  transactions,
  events,
  complaints,
  setActiveTab,
  onOpenAddComplaint,
  isAdminMode = false,
  letterCount = 3,
}) => {
  // Financial summaries
  const totalIncome = transactions
    .filter(t => t.jenis === 'Pemasukan')
    .reduce((sum, t) => sum + t.nominal, 0);

  const totalExpense = transactions
    .filter(t => t.jenis === 'Pengeluaran')
    .reduce((sum, t) => sum + t.nominal, 0);

  const saldoKas = totalIncome - totalExpense;

  const upcomingEvents = events.filter(e => e.status === 'Akan Datang');
  const unresolvedComplaints = complaints.filter(
    c => c.status === 'Menunggu' || c.status === 'Diproses'
  );

  return (
    <div className="space-y-6">
      {/* Sambutan & Quick Action Hero */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/30 text-emerald-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Selamat Datang di Paguyuban Warga Cluster Arcadia</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-tight">
            Mewujudkan Lingkungan Aman, Asri, Nyaman & Transparan
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-light">
            Portal ini merupakan pusat informasi kependudukan, keterbukaan tata kelola kas RT, publikasi agenda gotong royong, serta wadah respon cepat pengaduan warga <strong>RT 01 RW 12 Cluster Arcadia, Oma Indah Kapuk, Suwayuwo, Sukorejo, Pasuruan</strong>.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('keuangan')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              <Wallet className="w-4 h-4 text-emerald-600" />
              Lihat Laporan Kas RT
            </button>

            <button
              onClick={onOpenAddComplaint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold border border-emerald-500/50 transition-all"
            >
              <Send className="w-4 h-4" />
              Lapor Pengaduan Lingkungan
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Pengumuman Penting & Status Kas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri 2/3: Pengumuman & Agenda */}
        <div className="lg:col-span-2 space-y-6">
          {/* Box Pengumuman RT */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                  <Bell className="w-4 h-4 text-amber-700" />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Pengumuman Resmi Pengurus RT
                  </h3>
                  <p className="text-xs text-slate-500">
                    Kabar dan instruksi penting untuk warga Cluster Arcadia
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {announcements.map(ann => (
                <div
                  key={ann.id}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        ann.prioritas === 'Darurat'
                          ? 'bg-rose-100 text-rose-700 border border-rose-200'
                          : ann.prioritas === 'Penting'
                          ? 'bg-amber-100 text-amber-700 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {ann.prioritas}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {formatDateIndo(ann.tanggal)}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{ann.judul}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ann.isi}</p>
                  <div className="text-[11px] text-slate-400 mt-2 italic">
                    Sumber: {ann.dibuatOleh}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agenda Mendatang */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Kegiatan Lingkungan Terdekat
                  </h3>
                  <p className="text-xs text-slate-500">
                    Jadwal kerja bakti, posyandu, dan ronda di perumahan
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('kegiatan')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {upcomingEvents.slice(0, 2).map(ev => (
                <div
                  key={ev.id}
                  className="p-4 rounded-xl border border-slate-200/80 bg-white hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {ev.kategori}
                      </span>
                      <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3" /> {ev.waktu}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{ev.judul}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{ev.deskripsi}</p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 flex items-center gap-1 text-[11px] truncate max-w-[180px]">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      {ev.lokasi}
                    </span>
                    <span className="font-bold text-emerald-700 text-[11px]">
                      {formatDateIndo(ev.tanggal)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan 1/3: Widget Keuangan Ringkas & Pengaduan Aktif */}
        <div className="space-y-6">
          {/* Card Khusus Mode Admin */}
          {isAdminMode && (
            <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-2xl p-5 shadow-sm border border-emerald-700/50 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-800/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  Panel Pengurus RT
                </span>
                <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
              </div>

              <div>
                <h4 className="font-bold text-sm text-white">Menu Persuratan & Iuran</h4>
                <p className="text-[11px] text-emerald-200/80 mt-0.5">
                  Akses cepat tata usaha persuratan dan sistem iuran bulanan
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <button
                  onClick={() => setActiveTab('administrasi')}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-left transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-emerald-300 mb-1" />
                  <span className="font-bold block text-white text-[11px]">Surat & Arsip</span>
                  <span className="text-[10px] text-emerald-200">{letterCount} surat aktif</span>
                </button>

                <button
                  onClick={() => setActiveTab('keuangan')}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-left transition-colors cursor-pointer"
                >
                  <Receipt className="w-4 h-4 text-teal-300 mb-1" />
                  <span className="font-bold block text-white text-[11px]">Sistem Iuran</span>
                  <span className="text-[10px] text-emerald-200">Matriks 12 Bulan</span>
                </button>
              </div>
            </div>
          )}

          {/* Card Keuangan Singkat */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Kas RT 01 Terkini
              </span>
              <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
                <Wallet className="w-4 h-4" />
              </span>
            </div>

            <div className="mt-4">
              <span className="text-xs text-slate-500 block">Total Saldo Kas Berjalan:</span>
              <div className="text-2xl font-black text-slate-900 mt-0.5">
                {formatRupiah(saldoKas)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 text-xs">
              <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                <span className="text-emerald-700 block text-[11px]">Pemasukan Bulan Ini</span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {formatRupiah(4000000)}
                </span>
              </div>
              <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-100">
                <span className="text-rose-700 block text-[11px]">Pengeluaran Bulan Ini</span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {formatRupiah(3435000)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('keuangan')}
              className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              Lihat Rincian & Grafik Transparan <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card Aduan Warga Berjalan */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-slate-900 text-sm">Status Pengaduan Warga</h3>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                {unresolvedComplaints.length} Aktif
              </span>
            </div>

            <div className="mt-3 divide-y divide-slate-100">
              {complaints.slice(0, 3).map(cmp => (
                <div key={cmp.id} className="py-2.5 text-xs">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-slate-800 truncate">{cmp.judul}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        cmp.status === 'Selesai'
                          ? 'bg-emerald-100 text-emerald-800'
                          : cmp.status === 'Diproses'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {cmp.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px] mt-1">
                    <span>{cmp.blokRumah}</span>
                    <span>{formatDateIndo(cmp.tanggalLapor)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={onOpenAddComplaint}
                className="w-full py-2.5 rounded-xl border border-amber-300 text-amber-800 hover:bg-amber-50 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Kirim Pengaduan Baru
              </button>
            </div>
          </div>

          {/* Quick Info Cluster */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs space-y-2 text-slate-600">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" /> Pos Satpam & Keamanan Cluster
            </h4>
            <p className="text-[11px] leading-relaxed">
              Penjagaan pos satpam 24 Jam dengan sistem satu pintu (one-gate system). Tamu wajib lapor dan meninggalkan identitas setelah pukul 22.00 WIB.
            </p>
            <div className="pt-2 border-t border-slate-200/60 font-semibold text-slate-800 text-[11px] flex justify-between">
              <span>Kecepatan Max di Cluster:</span>
              <span className="text-rose-600">20 km/jam</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
