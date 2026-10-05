import React, { useState } from 'react';
import { CashTransaction, TransactionType, TransactionCategory } from '../../types';
import { X, PlusCircle, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

interface AddTransaksiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: CashTransaction) => void;
}

export const AddTransaksiModal: React.FC<AddTransaksiModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [jenis, setJenis] = useState<TransactionType>('Pemasukan');
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [kategori, setKategori] = useState<TransactionCategory>('Iuran Warga Bulanan');
  const [nominal, setNominal] = useState('100000');
  const [keterangan, setKeterangan] = useState('');
  const [dicatatOleh, setDicatatOleh] = useState('Dian Ratnasari (Bendahara)');

  if (!isOpen) return null;

  const incomeCategories: TransactionCategory[] = [
    'Iuran Warga Bulanan',
    'Iuran Keamanan & Sampah',
    'Donasi & Kas Sukarela',
    'Sewa Fasilitas/Tenda',
    'Lain-lain',
  ];

  const expenseCategories: TransactionCategory[] = [
    'Gaji Keamanan/Satpam',
    'Kebersihan & Angkut Sampah',
    'Perawatan Taman & Lingkungan',
    'Penerangan Jalan (PJU) & Listrik Pos',
    'Konsumsi Rapat & Sosialisasi',
    'Kegiatan Warga / 17 Agustus',
    'Dana Sosial & Santunan',
    'Lain-lain',
  ];

  const handleJenisChange = (newJenis: TransactionType) => {
    setJenis(newJenis);
    if (newJenis === 'Pemasukan') {
      setKategori('Iuran Warga Bulanan');
      setNominal('100000');
    } else {
      setKategori('Kebersihan & Angkut Sampah');
      setNominal('500000');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(nominal.replace(/\D/g, '')) || 0;
    if (num <= 0 || !keterangan) return;

    const newTx: CashTransaction = {
      id: `tx-${Date.now()}`,
      tanggal,
      jenis,
      kategori,
      nominal: num,
      keterangan,
      dicatatOleh,
    };

    onSave(newTx);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Catat Transaksi Kas RT</h3>
              <p className="text-xs text-emerald-100">Buku Kas Umum RT 01 RW 12 Cluster Arcadia</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Tipe Transaksi: Masuk vs Keluar */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Jenis Arus Kas *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleJenisChange('Pemasukan')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all ${
                  jenis === 'Pemasukan'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ArrowDownCircle className="w-4 h-4 text-emerald-600" />
                Pemasukan (Kas Masuk)
              </button>

              <button
                type="button"
                onClick={() => handleJenisChange('Pengeluaran')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all ${
                  jenis === 'Pengeluaran'
                    ? 'border-rose-600 bg-rose-50 text-rose-700 ring-2 ring-rose-500/20'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ArrowUpCircle className="w-4 h-4 text-rose-600" />
                Pengeluaran (Kas Keluar)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tanggal Transaksi *
              </label>
              <input
                type="date"
                required
                value={tanggal}
                onChange={e => setTanggal(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nominal (Rp) *
              </label>
              <input
                type="text"
                required
                placeholder="100.000"
                value={nominal}
                onChange={e => {
                  const val = e.target.value.replace(/\D/g, '');
                  setNominal(val ? Number(val).toLocaleString('id-ID') : '');
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Kategori Pos Anggaran *
            </label>
            <select
              value={kategori}
              onChange={e => setKategori(e.target.value as TransactionCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              {(jenis === 'Pemasukan' ? incomeCategories : expenseCategories).map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Keterangan / Uraian Rinci *
            </label>
            <textarea
              required
              rows={2}
              placeholder={
                jenis === 'Pemasukan'
                  ? 'Contoh: Iuran warga Blok B1 No. 04 bulan Oktober 2026'
                  : 'Contoh: Pembelian lampu LED PJU tiang blok C dan isolasi kabel'
              }
              value={keterangan}
              onChange={e => setKeterangan(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Petugas Pencatat
            </label>
            <input
              type="text"
              value={dicatatOleh}
              onChange={e => setDicatatOleh(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition-colors"
            >
              Simpan Transaksi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
