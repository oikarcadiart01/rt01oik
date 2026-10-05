import React, { useState, useEffect } from 'react';
import { Resident, ResidentStatus, PaymentStatus } from '../../types';
import { X, UserPlus, Save, Users } from 'lucide-react';

interface AddWargaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (resident: Resident) => void;
  residentToEdit?: Resident | null;
}

export const AddWargaModal: React.FC<AddWargaModalProps> = ({
  isOpen,
  onClose,
  onSave,
  residentToEdit,
}) => {
  const [namaLengkap, setNamaLengkap] = useState('');
  const [blokRumah, setBlokRumah] = useState('Blok A1 No. 01');
  const [nik, setNik] = useState('');
  const [noKk, setNoKk] = useState('');
  const [statusTinggal, setStatusTinggal] = useState<ResidentStatus>('Tetap');
  const [jumlahAnggota, setJumlahAnggota] = useState(3);
  const [pekerjaan, setPekerjaan] = useState('');
  const [noHp, setNoHp] = useState('');
  const [email, setEmail] = useState('');
  const [statusIuran, setStatusIuran] = useState<PaymentStatus>('Lunas');
  const [catatan, setCatatan] = useState('');

  useEffect(() => {
    if (residentToEdit) {
      setNamaLengkap(residentToEdit.namaLengkap);
      setBlokRumah(residentToEdit.blokRumah);
      setNik(residentToEdit.nik);
      setNoKk(residentToEdit.noKk);
      setStatusTinggal(residentToEdit.statusTinggal);
      setJumlahAnggota(residentToEdit.jumlahAnggota);
      setPekerjaan(residentToEdit.pekerjaan);
      setNoHp(residentToEdit.noHp);
      setEmail(residentToEdit.email || '');
      setStatusIuran(residentToEdit.statusIuran);
      setCatatan(residentToEdit.catatan || '');
    } else {
      setNamaLengkap('');
      setBlokRumah('Blok A1 No. 01');
      setNik(`351408${Math.floor(1000000000 + Math.random() * 9000000000)}`);
      setNoKk(`351408${Math.floor(1000000000 + Math.random() * 9000000000)}`);
      setStatusTinggal('Tetap');
      setJumlahAnggota(3);
      setPekerjaan('');
      setNoHp('08');
      setEmail('');
      setStatusIuran('Lunas');
      setCatatan('');
    }
  }, [residentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaLengkap || !blokRumah) return;

    const newResident: Resident = {
      id: residentToEdit ? residentToEdit.id : `res-${Date.now()}`,
      namaLengkap,
      blokRumah,
      nik: nik || '351408xxxxxx0001',
      noKk: noKk || '351408xxxxxx0002',
      statusTinggal,
      jumlahAnggota: Number(jumlahAnggota) || 1,
      pekerjaan: pekerjaan || 'Karyawan Swasta',
      noHp: noHp || '08123456789',
      email: email || undefined,
      statusIuran,
      iuranTerakhirBulan: statusIuran === 'Lunas' ? 'Oktober 2026' : 'September 2026',
      tanggalMasuk: residentToEdit ? residentToEdit.tanggalMasuk : new Date().toISOString().split('T')[0],
      catatan: catatan || undefined,
      anggotaKeluarga: residentToEdit?.anggotaKeluarga || [
        { nama: namaLengkap, hubungan: 'Kepala Keluarga', usia: 35 },
      ],
    };

    onSave(newResident);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-700 to-teal-700 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              {residentToEdit ? <Users className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {residentToEdit ? 'Edit Data Warga' : 'Tambah Data Warga Baru'}
              </h3>
              <p className="text-xs text-emerald-100">
                RT 01 RW 12 Cluster Arcadia, Oma Indah Kapuk
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Lengkap Kepala Keluarga *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Budi Santoso, S.T."
                value={namaLengkap}
                onChange={e => setNamaLengkap(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alamat Blok & No. Rumah *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Blok A2 No. 08"
                value={blokRumah}
                onChange={e => setBlokRumah(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                NIK (Nomor Induk Kependudukan)
              </label>
              <input
                type="text"
                placeholder="16 Digit NIK KTP"
                value={nik}
                onChange={e => setNik(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                No. Kartu Keluarga (KK)
              </label>
              <input
                type="text"
                placeholder="16 Digit No KK"
                value={noKk}
                onChange={e => setNoKk(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status Tempat Tinggal
              </label>
              <select
                value={statusTinggal}
                onChange={e => setStatusTinggal(e.target.value as ResidentStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="Tetap">Warga Tetap (Pemilik)</option>
                <option value="Kontrak/Sewa">Kontrak / Sewa</option>
                <option value="Kost">Kost</option>
                <option value="Rumah Kosong">Rumah Kosong / Investasi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jumlah Anggota Keluarga (Jiwa)
              </label>
              <input
                type="number"
                min="1"
                max="15"
                value={jumlahAnggota}
                onChange={e => setJumlahAnggota(parseInt(e.target.value) || 1)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pekerjaan / Profesi
              </label>
              <input
                type="text"
                placeholder="Contoh: Karyawan Swasta / Wiraswasta"
                value={pekerjaan}
                onChange={e => setPekerjaan(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                No. WhatsApp / HP Aktif *
              </label>
              <input
                type="tel"
                required
                placeholder="Contoh: 081234567890"
                value={noHp}
                onChange={e => setNoHp(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status Iuran Kas & Lingkungan
              </label>
              <select
                value={statusIuran}
                onChange={e => setStatusIuran(e.target.value as PaymentStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="Lunas">Lunas (Oktober 2026)</option>
                <option value="Belum Lunas">Belum Lunas</option>
                <option value="Menunggak">Menunggak (&gt; 1 Bulan)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email (Opsional)
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
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
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition-colors"
            >
              <Save className="w-4 h-4" />
              {residentToEdit ? 'Simpan Perubahan' : 'Daftarkan Warga'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
