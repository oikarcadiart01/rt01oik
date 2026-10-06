import React from 'react';
import {
  Resident,
  CashTransaction,
  Complaint,
  RTAnnouncement,
} from '../../types';
import { formatRupiah, formatDateIndo } from '../../utils/formatters';
import {
  Bell,
  Wallet,
  ArrowRight,
  Sparkles,
  Users,
  Send,
  CreditCard,
  FileText,
  Receipt,
  ShieldCheck as ShieldCheckIcon,
  AlertTriangle,
  Shield,
} from 'lucide-react';
import { AdminNavTab } from './AdminNavbar';

interface AdminBerandaTabProps {
  announcements: RTAnnouncement[];
  residents: Resident[];
  transactions: CashTransaction[];
  complaints: Complaint[];
  setActiveTab: (tab: AdminNavTab) => void;
  onOpenAddComplaint: () => void;
  onOpenCekIuran: () => void;
  letterCount?: number;
}

export const AdminBerandaTab: React.FC<AdminBerandaTabProps> = ({
  announcements,
  residents,
  transactions,
  complaints,
  setActiveTab,
  onOpenAddComplaint,
  onOpenCekIuran,
  letterCount = 0,
}) => {
  // Financial summaries
  const totalIncome = transactions
    .filter(t => t.jenis === 'Pemasukan')
    .reduce((sum, t) => sum + t.nominal, 0);

  const totalExpense = transactions
    .filter(t => t.jenis === 'Pengeluaran')
    .reduce((sum, t) => sum + t.nominal, 0);

  const saldoKas = totalIncome - totalExpense;

  const unresolvedComplaints = complaints.filter(
    c => c.status === 'Menunggu' || c.status === 'Diproses'
  );

  return (
    <div className="space-y-6">
      {/* Sambutan & Quick Action Hero Mode Admin */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden border border-emerald-400/40">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-10 -bottom-10 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-amber-200 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Panel Kendali Pengurus RT 01 RW 12</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-tight drop-shadow-xs">
            Pusat Pengelolaan Lingkungan & Pelayanan Warga
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-teal-50/95 leading-relaxed font-normal">
            Kelola data kependudukan, transparansi kas masuk & keluar, arsip surat pengantar, dan tindak lanjut aduan warga Cluster Arcadia.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setActiveTab('warga')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-50 text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all min-h-[44px] cursor-pointer"
            >
              <Users className="w-4 h-4 text-sky-600" />
              <span>Data Warga</span>
            </button>

            <button
              onClick={() => setActiveTab('keuangan')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all min-h-[44px] cursor-pointer"
            >
              <Wallet className="w-4 h-4 text-emerald-600" />
              <span>Lihat Laporan Kas</span>
            </button>

            <button
              onClick={onOpenCekIuran}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all min-h-[44px] cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-slate-900" />
              <span>Cek Iuran Rumah</span>
            </button>

            <button
              onClick={onOpenAddComplaint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-900/80 hover:bg-teal-900 text-white text-xs sm:text-sm font-bold border border-teal-400/40 transition-all min-h-[44px] cursor-pointer"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>Lapor Aduan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Pengumuman & Widget Pengurus */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri 2/3: Pengumuman Resmi RT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-amber-200/80">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-amber-100">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl shadow-xs">
                  <Bell className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Pengumuman Resmi Pengurus RT
                  </h3>
                  <p className="text-xs text-slate-500">
                    Kabar dan instruksi penting untuk warga Cluster Arcadia
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3.5">
              {announcements.map(ann => (
                <div
                  key={ann.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    ann.prioritas === 'Darurat'
                      ? 'border-rose-200 bg-rose-50/50 hover:bg-rose-50 border-l-4 border-l-rose-500'
                      : ann.prioritas === 'Penting'
                      ? 'border-amber-200 bg-amber-50/50 hover:bg-amber-50 border-l-4 border-l-amber-500'
                      : 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 border-l-4 border-l-emerald-500'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        ann.prioritas === 'Darurat'
                          ? 'bg-rose-500 text-white'
                          : ann.prioritas === 'Penting'
                          ? 'bg-amber-500 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {ann.prioritas}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {formatDateIndo(ann.tanggal)}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{ann.judul}</h4>
                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">{ann.isi}</p>
                  <div className="text-[11px] text-slate-500 mt-2 font-medium">
                    Sumber: <strong className="text-slate-800">{ann.dibuatOleh}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan 1/3: Widget Administrasi & Keuangan */}
        <div className="space-y-6">
          {/* Card Khusus Panel Pengurus RT */}
          <div className="bg-gradient-to-br from-teal-700 via-emerald-800 to-teal-900 text-white rounded-3xl p-5 shadow-md border border-emerald-400/50 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
                Panel Pengurus RT
              </span>
              <ShieldCheckIcon className="w-4 h-4 text-emerald-300" />
            </div>

            <div>
              <h4 className="font-extrabold text-sm text-white">Menu Persuratan & Iuran</h4>
              <p className="text-[11px] text-emerald-100/90 mt-0.5">
                Akses cepat tata usaha persuratan dan sistem iuran bulanan
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <button
                onClick={() => setActiveTab('administrasi')}
                className="p-3 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 text-left transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-cyan-300 mb-1" />
                <span className="font-bold block text-white text-[11px]">Surat & Arsip</span>
                <span className="text-[10px] text-teal-200">{letterCount} surat aktif</span>
              </button>

              <button
                onClick={() => setActiveTab('keuangan')}
                className="p-3 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 text-left transition-colors cursor-pointer"
              >
                <Receipt className="w-4 h-4 text-amber-300 mb-1" />
                <span className="font-bold block text-white text-[11px]">Sistem Iuran</span>
                <span className="text-[10px] text-teal-200">Matriks 12 Bulan</span>
              </button>
            </div>
          </div>

          {/* Card Keuangan Singkat */}
          <div className="bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/50 rounded-3xl p-5 sm:p-6 shadow-sm border border-emerald-200">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                Kas RT 01 Terkini
              </span>
              <span className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-xs">
                <Wallet className="w-4 h-4" />
              </span>
            </div>

            <div className="mt-4">
              <span className="text-xs text-slate-500 font-medium block">Total Saldo Kas Berjalan:</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-800 mt-0.5">
                {formatRupiah(saldoKas)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-emerald-100 text-xs">
              <div className="bg-emerald-100/70 p-3 rounded-2xl border border-emerald-200">
                <span className="text-emerald-800 block text-[11px] font-bold">Pemasukan Bulan Ini</span>
                <span className="font-black text-emerald-950 mt-0.5 block text-xs sm:text-sm">
                  {formatRupiah(4000000)}
                </span>
              </div>
              <div className="bg-rose-100/70 p-3 rounded-2xl border border-rose-200">
                <span className="text-rose-800 block text-[11px] font-bold">Pengeluaran Bulan Ini</span>
                <span className="font-black text-rose-950 mt-0.5 block text-xs sm:text-sm">
                  {formatRupiah(3435000)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('keuangan')}
              className="mt-4 w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer min-h-[44px]"
            >
              Lihat Rincian & Grafik Keuangan <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card Aduan Warga Berjalan */}
          <div className="bg-gradient-to-br from-white via-amber-50/30 to-rose-50/30 rounded-3xl p-5 sm:p-6 shadow-sm border border-amber-200">
            <div className="flex items-center justify-between pb-3 border-b border-amber-100">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-gradient-to-br from-amber-400 to-rose-500 text-white rounded-xl shadow-xs">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-slate-900 text-sm">Status Pengaduan Warga</h3>
              </div>
              <span className="text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                {unresolvedComplaints.length} Aktif
              </span>
            </div>

            <div className="mt-3 divide-y divide-amber-100/80">
              {complaints.slice(0, 3).map(cmp => (
                <div key={cmp.id} className="py-2.5 text-xs">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-slate-800 truncate">{cmp.judul}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        cmp.status === 'Selesai'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : cmp.status === 'Diproses'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {cmp.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[11px] mt-1 font-medium">
                    <span>{cmp.blokRumah}</span>
                    <span>{formatDateIndo(cmp.tanggalLapor)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-amber-100">
              <button
                onClick={onOpenAddComplaint}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer min-h-[44px]"
              >
                <Send className="w-3.5 h-3.5" />
                Kirim Pengaduan Baru
              </button>
            </div>
          </div>

          {/* Quick Info Cluster */}
          <div className="bg-gradient-to-br from-sky-50 to-cyan-50/70 rounded-3xl p-5 border border-sky-200 text-xs space-y-2 text-slate-700 shadow-2xs">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-cyan-600" /> Pos Satpam & Keamanan Cluster
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-600">
              Penjagaan pos satpam 24 Jam dengan sistem satu pintu (one-gate system). Tamu wajib lapor dan meninggalkan identitas setelah pukul 22.00 WIB.
            </p>
            <div className="pt-2 border-t border-sky-200/80 font-bold text-slate-800 text-[11px] flex justify-between">
              <span>Kecepatan Max di Cluster:</span>
              <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                20 km/jam
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
