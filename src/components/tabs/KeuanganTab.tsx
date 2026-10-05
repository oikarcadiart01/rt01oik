import React, { useState } from 'react';
import { CashTransaction, TransactionType, Resident, PaymentStatus } from '../../types';
import { formatRupiah, formatDateIndo, exportToCSV } from '../../utils/formatters';
import { FinanceCharts } from '../charts/FinanceCharts';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PlusCircle,
  Download,
  Printer,
  Search,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  X,
  Trash2,
  Home,
  Check,
  Calendar,
  Receipt,
  FileCheck,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface KeuanganTabProps {
  transactions: CashTransaction[];
  residents: Resident[];
  isAdminMode: boolean;
  onOpenAddTransaction: () => void;
  onOpenCekIuran: () => void;
  onDeleteTransaction: (id: string) => void;
  onUpdateResidentPaymentStatus: (residentId: string, status: PaymentStatus, month: string) => void;
  onToggleMonthPayment?: (residentId: string, month: string, isPaid: boolean) => void;
  onAddTransaction?: (transaction: CashTransaction) => void;
}

export const KeuanganTab: React.FC<KeuanganTabProps> = ({
  transactions,
  residents,
  isAdminMode,
  onOpenAddTransaction,
  onOpenCekIuran,
  onDeleteTransaction,
  onUpdateResidentPaymentStatus,
  onToggleMonthPayment,
  onAddTransaction,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'bukuKas' | 'statusIuran' | 'sistemIuran'>('bukuKas');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'Semua' | TransactionType>('Semua');
  const [selectedMonth, setSelectedMonth] = useState<string>('Semua');
  const [isPrintPreview, setIsPrintPreview] = useState(false);

  // Iuran specific filters
  const [iuranSearch, setIuranSearch] = useState('');
  const [iuranStatusFilter, setIuranStatusFilter] = useState<'Semua' | PaymentStatus>('Semua');
  const [iuranBlockFilter, setIuranBlockFilter] = useState<string>('Semua');

  // Sistem Iuran Matriks Admin specific filters
  const [sistemIuranSearch, setSistemIuranSearch] = useState('');
  const [sistemIuranBlockFilter, setSistemIuranBlockFilter] = useState<string>('Semua');
  const [sistemIuranStatusFilter, setSistemIuranStatusFilter] = useState<'Semua' | PaymentStatus>('Semua');

  // Kwitansi / Payment Modal State
  const [isKwitansiModalOpen, setIsKwitansiModalOpen] = useState(false);
  const [kwitansiResidentId, setKwitansiResidentId] = useState('');
  const [kwitansiMonths, setKwitansiMonths] = useState<string[]>(['Okt']);
  const [kwitansiMetode, setKwitansiMetode] = useState('Transfer BSI / QRIS RT');
  const [selectedKwitansiForPrint, setSelectedKwitansiForPrint] = useState<{
    noKwitansi: string;
    namaWarga: string;
    blokRumah: string;
    jumlahUang: number;
    bulanBayar: string;
    tanggal: string;
    metode: string;
  } | null>(null);

  // Totals calculation
  const totalIncome = transactions
    .filter(t => t.jenis === 'Pemasukan')
    .reduce((sum, t) => sum + t.nominal, 0);

  const totalExpense = transactions
    .filter(t => t.jenis === 'Pengeluaran')
    .reduce((sum, t) => sum + t.nominal, 0);

  const saldoKas = totalIncome - totalExpense;

  // Iuran stats
  const totalKK = residents.length;
  const totalLunas = residents.filter(r => r.statusIuran === 'Lunas').length;
  const totalBelum = totalKK - totalLunas;
  const persenLunas = totalKK > 0 ? Math.round((totalLunas / totalKK) * 100) : 0;
  const realisasiIuranBulanIni = totalLunas * 100000;

  // 12 Months List for Matrix
  const monthLabels = [
    { key: 'Jan', name: 'Januari' },
    { key: 'Feb', name: 'Februari' },
    { key: 'Mar', name: 'Maret' },
    { key: 'Apr', name: 'April' },
    { key: 'Mei', name: 'Mei' },
    { key: 'Jun', name: 'Juni' },
    { key: 'Jul', name: 'Juli' },
    { key: 'Agu', name: 'Agustus' },
    { key: 'Sep', name: 'September' },
    { key: 'Okt', name: 'Oktober' },
    { key: 'Nov', name: 'November' },
    { key: 'Des', name: 'Desember' },
  ];

  // Filtered transactions
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch =
      t.keterangan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.dicatatOleh.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'Semua' || t.jenis === selectedType;
    const matchesMonth = selectedMonth === 'Semua' || t.tanggal.startsWith(selectedMonth);

    return matchesSearch && matchesType && matchesMonth;
  });

  // Filtered residents for Iuran
  const filteredIuranResidents = residents.filter(r => {
    const matchesSearch =
      r.namaLengkap.toLowerCase().includes(iuranSearch.toLowerCase()) ||
      r.blokRumah.toLowerCase().includes(iuranSearch.toLowerCase());

    const matchesStatus =
      iuranStatusFilter === 'Semua' || r.statusIuran === iuranStatusFilter;

    const matchesBlock =
      iuranBlockFilter === 'Semua' || r.blokRumah.toUpperCase().includes(iuranBlockFilter.toUpperCase());

    return matchesSearch && matchesStatus && matchesBlock;
  });

  // Helper to check if month is paid for a resident
  const isMonthPaid = (resident: Resident, monthKey: string) => {
    if (resident.bulanTerbayar) {
      return resident.bulanTerbayar.includes(monthKey);
    }
    // Fallback baseline: If resident is 'Lunas', they've paid Jan - Okt
    const defaultMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep'];
    if (resident.statusIuran === 'Lunas') {
      defaultMonths.push('Okt');
    }
    return defaultMonths.includes(monthKey);
  };

  const handleToggleMonth = (resident: Resident, monthKey: string) => {
    if (!isAdminMode) return;
    const currentlyPaid = isMonthPaid(resident, monthKey);
    if (onToggleMonthPayment) {
      onToggleMonthPayment(resident.id, monthKey, !currentlyPaid);
    } else {
      // Direct fallback
      const currentList = resident.bulanTerbayar || [
        'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep',
        ...(resident.statusIuran === 'Lunas' ? ['Okt'] : [])
      ];
      const updated = currentlyPaid
        ? currentList.filter(m => m !== monthKey)
        : [...currentList, monthKey];
      
      const newStatus = updated.includes('Okt') ? 'Lunas' : 'Belum Lunas';
      onUpdateResidentPaymentStatus(resident.id, newStatus, newStatus === 'Lunas' ? 'Oktober 2026' : 'September 2026');
    }
  };

  const handleGenerateKwitansi = (e: React.FormEvent) => {
    e.preventDefault();
    const resident = residents.find(r => r.id === kwitansiResidentId);
    if (!resident || kwitansiMonths.length === 0) return;

    const totalBayar = kwitansiMonths.length * 100000;
    const receiptNum = `KW-2026-${Math.floor(100 + Math.random() * 900)}`;
    const bulanStr = kwitansiMonths.join(', ') + ' 2026';

    const kwitansiData = {
      noKwitansi: receiptNum,
      namaWarga: resident.namaLengkap,
      blokRumah: resident.blokRumah,
      jumlahUang: totalBayar,
      bulanBayar: bulanStr,
      tanggal: new Date().toISOString().split('T')[0],
      metode: kwitansiMetode,
    };

    // Mark paid
    kwitansiMonths.forEach(m => {
      handleToggleMonth(resident, m);
    });

    // Auto-record to RT Cash Ledger
    if (onAddTransaction) {
      onAddTransaction({
        id: `tx-iuran-${Date.now()}`,
        tanggal: new Date().toISOString().split('T')[0],
        jenis: 'Pemasukan',
        kategori: 'Iuran Warga Bulanan',
        nominal: totalBayar,
        keterangan: `Pembayaran Iuran Kas RT ${resident.namaLengkap} (${resident.blokRumah}) bulan ${bulanStr} (${kwitansiMetode})`,
        blokRumah: resident.blokRumah,
        dicatatOleh: 'Bendahara RT (Dian Ratnasari)',
      });
    }

    setIsKwitansiModalOpen(false);
    setSelectedKwitansiForPrint(kwitansiData);
  };

  const handleExportCSV = () => {
    if (activeSubTab === 'bukuKas') {
      const dataToExport = filteredTransactions.map(t => ({
        'Tanggal': t.tanggal,
        'Jenis': t.jenis,
        'Kategori': t.kategori,
        'Nominal (Rp)': t.nominal,
        'Keterangan': t.keterangan,
        'Pencatat': t.dicatatOleh,
      }));
      exportToCSV(`Laporan_Kas_RT01_Arcadia_${new Date().toISOString().split('T')[0]}`, dataToExport);
    } else {
      const dataToExport = filteredIuranResidents.map(r => ({
        'Nama Kepala Keluarga': r.namaLengkap,
        'Blok Rumah': r.blokRumah,
        'Status Rumah': r.statusTinggal,
        'Nominal Iuran': 'Rp 100.000',
        'Status Pembayaran': r.statusIuran,
        'Bulan Terakhir Bayar': r.iuranTerakhirBulan,
        'No WhatsApp': r.noHp,
      }));
      exportToCSV(`Rekap_Iuran_Warga_Oktober_2026_${new Date().toISOString().split('T')[0]}`, dataToExport);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveSubTab('bukuKas')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeSubTab === 'bukuKas'
                ? 'bg-white text-emerald-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wallet className="w-4 h-4 text-emerald-600" />
            <span>Buku Kas & Grafik</span>
          </button>

          <button
            onClick={() => setActiveSubTab('statusIuran')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all relative ${
              activeSubTab === 'statusIuran'
                ? 'bg-white text-emerald-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>Data Status Iuran</span>
            {totalBelum > 0 && (
              <span className="ml-1 text-[10px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full font-bold">
                {totalBelum}
              </span>
            )}
          </button>

          {/* Sistem Iuran Bulanan Admin */}
          {isAdminMode && (
            <button
              onClick={() => setActiveSubTab('sistemIuran')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all relative ${
                activeSubTab === 'sistemIuran'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                  : 'text-emerald-800 hover:bg-emerald-50'
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>Sistem Iuran Bulanan RT</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={onOpenCekIuran}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold border border-teal-200 transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-teal-600" />
            <span>Cek Iuran Rumah</span>
          </button>

          {isAdminMode && (
            <button
              onClick={() => setIsPrintPreview(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Cetak Laporan</span>
            </button>
          )}
        </div>
      </div>

      {activeSubTab === 'bukuKas' && (
        /* Tab 1: Buku Kas & Grafik */
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Saldo Kas Berjalan
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {formatRupiah(saldoKas)}
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Kas RT dalam kondisi aman & sehat
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Wallet className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                  Total Kas Masuk
                </span>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {formatRupiah(totalIncome)}
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Iuran wajib warga, donasi, & sewa fasum
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block">
                  Total Kas Keluar
                </span>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {formatRupiah(totalExpense)}
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Operasional satpam, sampah, PJU & taman
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <TrendingDown className="w-6 h-6" />
              </div>
            </div>
          </div>

          <FinanceCharts transactions={transactions} residents={residents} />

          {/* Ledger Header & Action Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Buku Kas & Riwayat Transaksi</h3>
                <p className="text-xs text-slate-500">
                  Catatan mutasi kas RT 01 RW 12 Cluster Arcadia secara kronologis & transparan
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {isAdminMode && (
                  <>
                    <button
                      onClick={handleExportCSV}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Ekspor CSV</span>
                    </button>

                    <button
                      onClick={onOpenAddTransaction}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Catat Transaksi Kas</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Cari transaksi berdasarkan uraian atau kategori..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value as 'Semua' | TransactionType)}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-700 font-medium focus:outline-hidden"
              >
                <option value="Semua">Semua Arus Kas</option>
                <option value="Pemasukan">Pemasukan Saja</option>
                <option value="Pengeluaran">Pengeluaran Saja</option>
              </select>

              <select
                value={selectedMonth}
                onChange={e => setSelectedMonth(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-700 font-medium focus:outline-hidden"
              >
                <option value="Semua">Semua Bulan</option>
                <option value="2026-10">Oktober 2026</option>
                <option value="2026-09">September 2026</option>
                <option value="2026-08">Agustus 2026</option>
              </select>

              {(searchTerm || selectedType !== 'Semua' || selectedMonth !== 'Semua') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('Semua');
                    setSelectedMonth('Semua');
                  }}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold px-2 py-1"
                >
                  Reset
                </button>
              )}

              <div className="ml-auto text-slate-400">
                {filteredTransactions.length} transaksi
              </div>
            </div>
          </div>

          {/* Transaction Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/80 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Tanggal</th>
                    <th className="py-3 px-4">Jenis & Kategori</th>
                    <th className="py-3 px-4">Uraian / Keterangan</th>
                    <th className="py-3 px-4 text-right">Nominal</th>
                    <th className="py-3 px-4">Pencatat</th>
                    {isAdminMode && <th className="py-3 px-4 text-center">Aksi</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 font-medium">
                          {formatDateIndo(tx.tanggal)}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                tx.jenis === 'Pemasukan'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {tx.jenis}
                            </span>
                            <span className="font-semibold text-slate-800">{tx.kategori}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-slate-700 font-normal max-w-sm">
                          {tx.keterangan}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap text-right font-bold text-sm">
                          <span
                            className={
                              tx.jenis === 'Pemasukan' ? 'text-emerald-700' : 'text-rose-600'
                            }
                          >
                            {tx.jenis === 'Pemasukan' ? '+' : '-'} {formatRupiah(tx.nominal)}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-500">
                          {tx.dicatatOleh}
                        </td>

                        {isAdminMode && (
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <button
                              onClick={() => {
                                if (confirm('Hapus transaksi ini dari buku kas?')) {
                                  onDeleteTransaction(tx.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                              title="Hapus Transaksi"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={isAdminMode ? 6 : 5} className="py-8 text-center text-slate-500">
                        Tidak ada transaksi kas yang sesuai filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'statusIuran' && (
        /* Tab 2: Status Iuran Warga */
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-slate-500 font-semibold block">Total Kepala Keluarga</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{totalKK} KK</div>
              <span className="text-[11px] text-slate-400 mt-0.5 block">Cluster Arcadia</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-emerald-700 font-semibold block">Sudah Lunas (Okt 2026)</span>
              <div className="text-2xl font-black text-emerald-700 mt-1">{totalLunas} KK</div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">{formatRupiah(realisasiIuranBulanIni)} terkumpul</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-rose-700 font-semibold block">Belum / Menunggak</span>
              <div className="text-2xl font-black text-rose-700 mt-1">{totalBelum} KK</div>
              <span className="text-[11px] text-rose-500 mt-0.5 block">Perlu konfirmasi</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-blue-700 font-semibold block">Persentase Kepatuhan</span>
              <div className="text-2xl font-black text-blue-700 mt-1">{persenLunas}%</div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Target 100% tgl 10</span>
            </div>
          </div>

          {/* Iuran Control Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Cari warga atau blok rumah untuk cek iuran..."
                  value={iuranSearch}
                  onChange={e => setIuranSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              {isAdminMode && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    <Download className="w-4 h-4 text-slate-500" />
                    <span>Ekspor Rekap Iuran</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
              <select
                value={iuranStatusFilter}
                onChange={e => setIuranStatusFilter(e.target.value as 'Semua' | PaymentStatus)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 font-medium focus:outline-hidden"
              >
                <option value="Semua">Semua Status Iuran</option>
                <option value="Lunas">Lunas (Oktober 2026)</option>
                <option value="Belum Lunas">Belum Lunas</option>
                <option value="Menunggak">Menunggak</option>
              </select>

              <select
                value={iuranBlockFilter}
                onChange={e => setIuranBlockFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 font-medium focus:outline-hidden"
              >
                <option value="Semua">Semua Blok</option>
                <option value="Blok A">Blok A</option>
                <option value="Blok B">Blok B</option>
                <option value="Blok C">Blok C</option>
                <option value="Blok D">Blok D</option>
              </select>

              {(iuranSearch || iuranStatusFilter !== 'Semua' || iuranBlockFilter !== 'Semua') && (
                <button
                  onClick={() => {
                    setIuranSearch('');
                    setIuranStatusFilter('Semua');
                    setIuranBlockFilter('Semua');
                  }}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold px-2 py-1"
                >
                  Reset
                </button>
              )}

              <div className="ml-auto text-slate-400">
                Menampilkan <strong>{filteredIuranResidents.length}</strong> KK
              </div>
            </div>
          </div>

          {/* Iuran Resident Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/80 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 w-12 text-center text-slate-400">No.</th>
                    <th className="py-3 px-4">Nama Kepala Keluarga</th>
                    <th className="py-3 px-4">Blok / Rumah</th>
                    <th className="py-3 px-4">Besaran Iuran</th>
                    <th className="py-3 px-4">Status Pembayaran</th>
                    <th className="py-3 px-4">Bulan Terakhir</th>
                    {isAdminMode && <th className="py-3 px-4 text-center">Aksi Bendahara</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredIuranResidents.length > 0 ? (
                    filteredIuranResidents.map((r, index) => (
                      <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 text-center text-slate-400 font-mono text-xs">
                          {index + 1}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 block">{r.namaLengkap}</span>
                          <span className="text-[11px] text-slate-400">{r.statusTinggal}</span>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold">
                            <Home className="w-3.5 h-3.5 text-emerald-600" />
                            {r.blokRumah}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap font-bold text-slate-800">
                          {formatRupiah(100000)}
                          <span className="text-[10px] text-slate-400 block font-normal">/ bln</span>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              r.statusIuran === 'Lunas'
                                ? 'bg-emerald-100 text-emerald-800'
                                : r.statusIuran === 'Belum Lunas'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {r.statusIuran === 'Lunas' ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                            )}
                            {r.statusIuran}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 font-medium">
                          {r.iuranTerakhirBulan}
                        </td>

                        {isAdminMode && (
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-2">
                              {r.statusIuran === 'Lunas' ? (
                                <button
                                  onClick={() =>
                                    onUpdateResidentPaymentStatus(r.id, 'Belum Lunas', 'September 2026')
                                  }
                                  title="Ubah status jadi belum bayar"
                                  className="px-2.5 py-1 text-xs rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
                                >
                                  Batalkan Lunas
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    onUpdateResidentPaymentStatus(r.id, 'Lunas', 'Oktober 2026')
                                  }
                                  title="Tandai sudah bayar bulan ini"
                                  className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-colors"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  Tandai Lunas
                                </button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={isAdminMode ? 7 : 6} className="py-8 text-center text-slate-500">
                        Tidak ada data status iuran yang sesuai filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Sistem Iuran Bulanan RT & Matriks 12 Bulan (Khusus Admin) */}
      {activeSubTab === 'sistemIuran' && isAdminMode && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top Banner Stats for Monthly Dues */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-slate-500 font-semibold block">Target Iuran Bulanan</span>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {formatRupiah(totalKK * 100000)}
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block">{totalKK} KK x Rp 100.000</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-emerald-700 font-semibold block">Realisasi Bulan Ini (Okt)</span>
              <div className="text-2xl font-black text-emerald-700 mt-1">
                {formatRupiah(realisasiIuranBulanIni)}
              </div>
              <span className="text-[11px] text-emerald-600 mt-0.5 block font-medium">
                {totalLunas} dari {totalKK} KK ({persenLunas}%) Lunas
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-rose-600 font-semibold block">Tunggakan Bulan Ini</span>
              <div className="text-2xl font-black text-rose-600 mt-1">
                {formatRupiah(totalBelum * 100000)}
              </div>
              <span className="text-[11px] text-rose-500 mt-0.5 block font-medium">
                {totalBelum} KK belum membayar
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-blue-700 font-semibold block">Alokasi Kas Bulanan</span>
              <div className="text-xs font-bold text-slate-800 space-y-0.5 mt-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Satpam 24 Jam:</span>
                  <span>Rp 50.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sampah & Kebersihan:</span>
                  <span>Rp 30.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kas Sosial RT:</span>
                  <span>Rp 20.000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Header Action Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2.5 bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-xl shadow-xs">
                  <Receipt className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    Sistem Matriks Iuran Bulanan Warga 2026
                  </h3>
                  <p className="text-xs text-slate-500">
                    Kelola dan pantau iuran 12 bulan per KK, toggle lunas instan, serta terbitkan kwitansi resmi
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  if (confirm('Tandai lunas iuran bulan Oktober 2026 untuk semua warga?')) {
                    residents.forEach(r => {
                      if (r.statusIuran !== 'Lunas') {
                        onUpdateResidentPaymentStatus(r.id, 'Lunas', 'Oktober 2026');
                      }
                    });
                  }
                }}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors"
              >
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Tandai Semua Lunas Okt</span>
              </button>

              <button
                onClick={() => {
                  if (residents.length > 0) setKwitansiResidentId(residents[0].id);
                  setIsKwitansiModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all self-stretch sm:self-auto justify-center"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Input Iuran & Kwitansi</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Cari kepala keluarga atau blok rumah..."
                value={sistemIuranSearch}
                onChange={e => setSistemIuranSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sistemIuranBlockFilter}
                onChange={e => setSistemIuranBlockFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-700 font-semibold focus:outline-hidden"
              >
                <option value="Semua">Semua Blok</option>
                <option value="Blok A">Blok A</option>
                <option value="Blok B">Blok B</option>
                <option value="Blok C">Blok C</option>
                <option value="Blok D">Blok D</option>
                <option value="Blok E">Blok E</option>
              </select>

              <select
                value={sistemIuranStatusFilter}
                onChange={e => setSistemIuranStatusFilter(e.target.value as 'Semua' | PaymentStatus)}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-700 font-semibold focus:outline-hidden"
              >
                <option value="Semua">Semua Status (Okt)</option>
                <option value="Lunas">Sudah Lunas</option>
                <option value="Belum Lunas">Belum Lunas</option>
              </select>

              {(sistemIuranSearch || sistemIuranBlockFilter !== 'Semua' || sistemIuranStatusFilter !== 'Semua') && (
                <button
                  onClick={() => {
                    setSistemIuranSearch('');
                    setSistemIuranBlockFilter('Semua');
                    setSistemIuranStatusFilter('Semua');
                  }}
                  className="text-emerald-700 hover:text-emerald-800 font-bold px-2 py-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Matrix Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600">
              <span className="font-semibold text-slate-800">
                Matriks Pembayaran 12 Bulan (Januari - Desember 2026)
              </span>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-emerald-500 rounded-xs inline-block"></span>
                  Lunas
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-slate-200 border border-slate-300 rounded-xs inline-block"></span>
                  Belum Bayar
                </span>
                <span className="text-slate-400 italic">*Klik badge bulan untuk langsung toggle bayar</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3 w-10 text-center">No</th>
                    <th className="py-2.5 px-3 min-w-[160px]">Kepala Keluarga</th>
                    <th className="py-2.5 px-3">Blok</th>
                    {monthLabels.map(m => (
                      <th key={m.key} className="py-2.5 px-1.5 text-center w-11">
                        {m.key}
                      </th>
                    ))}
                    <th className="py-2.5 px-3 text-right">Total Terbayar</th>
                    <th className="py-2.5 px-3 text-center">Aksi / Kwitansi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {residents
                    .filter(r => {
                      const matchesSearch =
                        r.namaLengkap.toLowerCase().includes(sistemIuranSearch.toLowerCase()) ||
                        r.blokRumah.toLowerCase().includes(sistemIuranSearch.toLowerCase());
                      const matchesBlock =
                        sistemIuranBlockFilter === 'Semua' ||
                        r.blokRumah.toUpperCase().includes(sistemIuranBlockFilter.toUpperCase());
                      const matchesStatus =
                        sistemIuranStatusFilter === 'Semua' ||
                        r.statusIuran === sistemIuranStatusFilter;
                      return matchesSearch && matchesBlock && matchesStatus;
                    })
                    .map((r, idx) => {
                      const paidCount = monthLabels.filter(m => isMonthPaid(r, m.key)).length;
                      const totalRupiah = paidCount * 100000;
                      const isOktPaid = isMonthPaid(r, 'Okt');

                      const cleanPhone = r.noHp.replace(/\D/g, '').replace(/^0/, '62');
                      const waText = encodeURIComponent(
                        `Yth. Bpk/Ibu ${r.namaLengkap} (${r.blokRumah}), salam hormat dari Pengurus RT 01 RW 12 Cluster Arcadia Perum Oma Indah Kapuk Suwayuwo.\n\n` +
                        `Mengingatkan untuk iuran kas warga bulan Oktober 2026 sebesar Rp 100.000 untuk operasional Pos Satpam 24 Jam dan Kebersihan Lingkungan.\n\n` +
                        `Pembayaran dapat ditransfer ke Rekening BSI / QRIS RT atau tunai ke Bendahara (Ibu Dian). Terima kasih banyak atas kerja sama dan kerukunannya!`
                      );

                      return (
                        <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2 px-3 text-center text-slate-400 font-mono text-[11px]">
                            {idx + 1}
                          </td>

                          <td className="py-2 px-3 font-bold text-slate-900">
                            {r.namaLengkap}
                          </td>

                          <td className="py-2 px-3 whitespace-nowrap text-slate-600 font-medium text-[11px]">
                            {r.blokRumah}
                          </td>

                          {/* 12 Months Cells */}
                          {monthLabels.map(m => {
                            const paid = isMonthPaid(r, m.key);
                            return (
                              <td key={m.key} className="py-2 px-1 text-center">
                                <button
                                  onClick={() => handleToggleMonth(r, m.key)}
                                  title={`${m.name}: ${paid ? 'Lunas (Klik untuk batalkan)' : 'Belum Bayar (Klik untuk tandai lunas)'}`}
                                  className={`w-8 h-6 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                                    paid
                                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xs'
                                      : 'bg-slate-100 hover:bg-emerald-100 text-slate-400 hover:text-emerald-800 border border-slate-200'
                                  }`}
                                >
                                  {paid ? '✓' : '-'}
                                </button>
                              </td>
                            );
                          })}

                          <td className="py-2 px-3 text-right font-bold text-slate-900 whitespace-nowrap">
                            {formatRupiah(totalRupiah)}
                            <span className="text-[10px] text-slate-400 font-normal block">
                              {paidCount} bln
                            </span>
                          </td>

                          <td className="py-2 px-3 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => {
                                  setSelectedKwitansiForPrint({
                                    noKwitansi: `KW-2026-${Math.floor(100 + Math.random() * 900)}`,
                                    namaWarga: r.namaLengkap,
                                    blokRumah: r.blokRumah,
                                    jumlahUang: 100000,
                                    bulanBayar: r.iuranTerakhirBulan,
                                    tanggal: new Date().toISOString().split('T')[0],
                                    metode: 'Transfer BSI / Tunai',
                                  });
                                }}
                                title="Cetak Tanda Terima / Kwitansi"
                                className="p-1 text-emerald-700 hover:bg-emerald-50 rounded-lg inline-flex items-center gap-1 text-[11px] font-bold"
                              >
                                <Receipt className="w-3.5 h-3.5" />
                                <span>Kwitansi</span>
                              </button>

                              {!isOktPaid && (
                                <a
                                  href={`https://wa.me/${cleanPhone}?text=${waText}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Kirim pengingat iuran via WhatsApp"
                                  className="px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-semibold border border-emerald-200"
                                >
                                  Ingatkan WA
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal Input Iuran Baru & Terbitkan Kwitansi */}
      {isKwitansiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg">Input Pembayaran Iuran & Kwitansi</h3>
                  <p className="text-xs text-emerald-100">Buku Kas Iuran RT 01 RW 12 Cluster Arcadia</p>
                </div>
              </div>
              <button
                onClick={() => setIsKwitansiModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGenerateKwitansi} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pilih Warga Pembayar Iuran *
                </label>
                <select
                  required
                  value={kwitansiResidentId}
                  onChange={e => setKwitansiResidentId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                >
                  {residents.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.blokRumah} - {r.namaLengkap}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Pilih Bulan yang Dibayarkan (Iuran Rp 100.000 / bln) *
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {monthLabels.map(m => {
                    const isChecked = kwitansiMonths.includes(m.key);
                    return (
                      <button
                        type="button"
                        key={m.key}
                        onClick={() => {
                          if (isChecked) {
                            setKwitansiMonths(prev => prev.filter(k => k !== m.key));
                          } else {
                            setKwitansiMonths(prev => [...prev, m.key]);
                          }
                        }}
                        className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                          isChecked
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {m.key}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs flex justify-between items-center">
                <span className="text-emerald-900 font-semibold">Total Iuran Diterima:</span>
                <span className="text-base font-black text-emerald-800">
                  {formatRupiah(kwitansiMonths.length * 100000)}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Metode Pembayaran
                </label>
                <select
                  value={kwitansiMetode}
                  onChange={e => setKwitansiMetode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                >
                  <option value="Transfer BSI (7182-0192-88)">Transfer BSI RT (7182-0192-88)</option>
                  <option value="QRIS Paguyuban RT 01">QRIS Paguyuban RT 01</option>
                  <option value="Tunai ke Bendahara">Tunai Langsung ke Bendahara</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsKwitansiModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={kwitansiMonths.length === 0}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold shadow-md transition-colors"
                >
                  <FileCheck className="w-4 h-4" />
                  Simpan & Terbitkan Kwitansi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Cetak Kwitansi Tanda Terima Resmi */}
      {selectedKwitansiForPrint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <span className="font-bold text-xs flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-400" />
                Kwitansi Pembayaran Iuran RT 01
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" /> Cetak
                </button>
                <button
                  onClick={() => setSelectedKwitansiForPrint(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Official Kwitansi Paper */}
            <div className="p-6 bg-white border border-slate-300 m-4 rounded-xl space-y-4 text-xs font-sans">
              <div className="text-center pb-3 border-b-2 border-slate-900">
                <span className="font-bold text-[10px] text-slate-500 uppercase tracking-widest block">
                  PAGUYUBAN WARGA CLUSTER ARCADIA RT 01 RW 12
                </span>
                <h4 className="text-base font-black text-slate-900">TANDA TERIMA IURAN WARGA</h4>
                <p className="text-[10px] text-slate-500">
                  Desa Suwayuwo, Kecamatan Sukorejo, Kabupaten Pasuruan
                </p>
                <span className="font-mono text-[10px] font-bold text-emerald-800 block mt-1">
                  Nomor: {selectedKwitansiForPrint.noKwitansi}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-3">
                  <span className="text-slate-500">Telah Diterima Dari</span>
                  <span className="col-span-2 font-bold text-slate-900">
                    : {selectedKwitansiForPrint.namaWarga} ({selectedKwitansiForPrint.blokRumah})
                  </span>
                </div>

                <div className="grid grid-cols-3">
                  <span className="text-slate-500">Uang Sebesar</span>
                  <span className="col-span-2 font-black text-emerald-800 text-sm">
                    : {formatRupiah(selectedKwitansiForPrint.jumlahUang)}
                  </span>
                </div>

                <div className="grid grid-cols-3">
                  <span className="text-slate-500">Untuk Pembayaran</span>
                  <span className="col-span-2 text-slate-800">
                    : Iuran Keamanan, Kebersihan & Kas RT bulan <strong>{selectedKwitansiForPrint.bulanBayar}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-3">
                  <span className="text-slate-500">Metode Bayar</span>
                  <span className="col-span-2 text-slate-800">
                    : {selectedKwitansiForPrint.metode}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 grid grid-cols-2 text-center text-[11px]">
                <div>
                  <p className="text-slate-500">Warga Pembayar,</p>
                  <div className="h-12 flex items-end justify-center">
                    <p className="font-bold underline text-slate-900">{selectedKwitansiForPrint.namaWarga}</p>
                  </div>
                </div>

                <div>
                  <p className="text-slate-500">Suwayuwo, {formatDateIndo(selectedKwitansiForPrint.tanggal)}</p>
                  <p className="font-bold text-slate-900">Bendahara RT 01,</p>
                  <div className="h-12 flex items-end justify-center">
                    <p className="font-bold underline text-slate-900">Dian Ratnasari, S.E., M.Ak.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedKwitansiForPrint(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-semibold"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Report Modal */}
      {isPrintPreview && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 p-4 overflow-y-auto flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-4xl p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="font-bold text-slate-800 text-lg">Pratinjau Cetak Laporan Kas RT</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold"
                >
                  <Printer className="w-4 h-4" /> Cetak Sekarang
                </button>
                <button
                  onClick={() => setIsPrintPreview(false)}
                  className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="text-center pb-4 border-b-2 border-slate-900">
              <h2 className="text-xl font-black uppercase text-slate-900 tracking-wide">
                RUKUN TETANGGA 01 RUKUN WARGA 12
              </h2>
              <h3 className="text-sm font-bold text-slate-800">
                PAGUYUBAN WARGA CLUSTER ARCADIA - PERUMAHAN OMA INDAH KAPUK
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Desa Suwayuwo, Kecamatan Sukorejo, Kabupaten Pasuruan, Jawa Timur
              </p>
              <div className="mt-2 text-xs font-bold text-slate-900 underline">
                LAPORAN PERTANGGUNGJAWABAN ARUS KAS KEUANGAN RT 01
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="p-3 border border-slate-200 rounded-lg text-center">
                <span className="text-slate-500 block">Total Penerimaan:</span>
                <span className="font-bold text-emerald-800 text-sm">{formatRupiah(totalIncome)}</span>
              </div>
              <div className="p-3 border border-slate-200 rounded-lg text-center">
                <span className="text-slate-500 block">Total Pengeluaran:</span>
                <span className="font-bold text-rose-800 text-sm">{formatRupiah(totalExpense)}</span>
              </div>
              <div className="p-3 border border-slate-200 rounded-lg text-center bg-slate-50">
                <span className="text-slate-500 block">Sisa Saldo Kas:</span>
                <span className="font-bold text-slate-900 text-sm">{formatRupiah(saldoKas)}</span>
              </div>
            </div>

            <table className="w-full text-left text-xs border border-slate-300">
              <thead className="bg-slate-100 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-2 border-r border-slate-300">No.</th>
                  <th className="p-2 border-r border-slate-300">Tanggal</th>
                  <th className="p-2 border-r border-slate-300">Uraian / Keterangan</th>
                  <th className="p-2 border-r border-slate-300">Kategori</th>
                  <th className="p-2 border-r border-slate-300 text-right">Pemasukan</th>
                  <th className="p-2 border-r border-slate-300 text-right">Pengeluaran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredTransactions.map((tx, idx) => (
                  <tr key={tx.id}>
                    <td className="p-2 border-r border-slate-200 text-center">{idx + 1}</td>
                    <td className="p-2 border-r border-slate-200 whitespace-nowrap">{tx.tanggal}</td>
                    <td className="p-2 border-r border-slate-200">{tx.keterangan}</td>
                    <td className="p-2 border-r border-slate-200">{tx.kategori}</td>
                    <td className="p-2 border-r border-slate-200 text-right font-medium text-emerald-700">
                      {tx.jenis === 'Pemasukan' ? formatRupiah(tx.nominal) : '-'}
                    </td>
                    <td className="p-2 border-r border-slate-200 text-right font-medium text-rose-700">
                      {tx.jenis === 'Pengeluaran' ? formatRupiah(tx.nominal) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pt-8 grid grid-cols-2 text-center text-xs">
              <div>
                <p>Mengetahui,</p>
                <p className="font-bold">Ketua RT 01 RW 12 Cluster Arcadia</p>
                <div className="h-16"></div>
                <p className="font-bold underline">Bambang Prasetyo, S.T.</p>
              </div>

              <div>
                <p>Suwayuwo, {formatDateIndo(new Date().toISOString().split('T')[0])}</p>
                <p className="font-bold">Bendahara RT 01</p>
                <div className="h-16"></div>
                <p className="font-bold underline">Dian Ratnasari, S.E., M.Ak.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
