import React, { useState } from 'react';
import { Resident } from '../../types';
import { formatRupiah } from '../../utils/formatters';
import { X, Search, CheckCircle2, AlertCircle, Home, Calendar, CreditCard } from 'lucide-react';

interface CekIuranModalProps {
  isOpen: boolean;
  onClose: () => void;
  residents: Resident[];
}

export const CekIuranModal: React.FC<CekIuranModalProps> = ({
  isOpen,
  onClose,
  residents,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);

  if (!isOpen) return null;

  const filteredResidents = searchTerm.trim()
    ? residents.filter(
        r =>
          r.blokRumah.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-teal-700 to-emerald-700 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Cek Status Iuran Warga</h3>
              <p className="text-xs text-teal-100">Cari berdasarkan Blok Rumah atau Nama Kepala Keluarga</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Ketik Blok (misal: Blok A1, B2) atau Nama Warga..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setSelectedResident(null);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              autoFocus
            />
          </div>

          {searchTerm.trim() && !selectedResident && (
            <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-xl bg-slate-50/50">
              {filteredResidents.length > 0 ? (
                filteredResidents.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedResident(r)}
                    className="w-full p-3 text-left hover:bg-emerald-50 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <span className="font-bold text-sm text-slate-900 block">{r.blokRumah}</span>
                      <span className="text-xs text-slate-600">{r.namaLengkap}</span>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        r.statusIuran === 'Lunas'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {r.statusIuran}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-500">
                  Data tidak ditemukan untuk kata kunci "{searchTerm}". Pastikan ejaan blok sesuai (contoh: Blok A1).
                </div>
              )}
            </div>
          )}

          {selectedResident ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4">
              <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold uppercase tracking-wider">
                    <Home className="w-3.5 h-3.5" /> {selectedResident.blokRumah}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mt-0.5">
                    {selectedResident.namaLengkap}
                  </h4>
                  <p className="text-xs text-slate-500">Status Tempat Tinggal: {selectedResident.statusTinggal}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-bold shadow-xs ${
                    selectedResident.statusIuran === 'Lunas'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {selectedResident.statusIuran === 'Lunas' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Lunas
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" /> Perlu Konfirmasi
                    </>
                  )}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">Iuran Wajib Bulanan:</span>
                  <span className="font-bold text-sm text-slate-900">{formatRupiah(100000)} / KK</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">(Keamanan + Sampah)</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">Terakhir Terbayar:</span>
                  <span className="font-bold text-sm text-emerald-700 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5" /> {selectedResident.iuranTerakhirBulan}
                  </span>
                </div>
              </div>

              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs text-slate-700 space-y-1">
                <p className="font-semibold text-emerald-900">Rekening Kas RT 01 RW 12 Cluster Arcadia:</p>
                <p>Bank Syariah Indonesia (BSI): <strong>7182-0192-88</strong> a.n RT 01 Cluster Arcadia</p>
                <p>Atau tunai langsung ke Bendahara (Ibu Dian Ratnasari - Blok B1 No. 08).</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedResident(null)}
                className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition-colors"
              >
                Cari Rumah Lain
              </button>
            </div>
          ) : (
            !searchTerm.trim() && (
              <div className="text-center py-6 text-slate-400 text-xs">
                Masukkan blok rumah atau nama Anda pada kolom di atas untuk mengecek status kelunasan iuran kas lingkungan.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
