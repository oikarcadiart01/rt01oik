import React, { useState, useEffect } from 'react';
import { EmergencyContact } from '../../types';
import { PhoneCall, X, Save, AlertTriangle, Shield, HeartPulse, Flame, Zap, Building } from 'lucide-react';

interface AddEditDaruratModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: EmergencyContact) => void;
  contactToEdit?: EmergencyContact | null;
}

const CATEGORY_OPTIONS = [
  'Keamanan Lingkungan',
  'Keamanan & Polisi',
  'Medis & Ambulans',
  'Pemadam & SAR',
  'Utilitas & Desa',
  'Pengurus RT',
  'Lainnya',
];

export const AddEditDaruratModal: React.FC<AddEditDaruratModalProps> = ({
  isOpen,
  onClose,
  onSave,
  contactToEdit,
}) => {
  const [nama, setNama] = useState('');
  const [nomor, setNomor] = useState('');
  const [kategori, setKategori] = useState('Keamanan Lingkungan');
  const [keterangan, setKeterangan] = useState('');
  const [urutan, setUrutan] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    if (contactToEdit) {
      setNama(contactToEdit.nama);
      setNomor(contactToEdit.nomor);
      setKategori(contactToEdit.kategori);
      setKeterangan(contactToEdit.keterangan);
      setUrutan(contactToEdit.urutan || 1);
    } else {
      setNama('');
      setNomor('');
      setKategori('Keamanan Lingkungan');
      setKeterangan('');
      setUrutan(1);
    }
    setError('');
  }, [contactToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      setError('Nama instansi atau kontak wajib diisi');
      return;
    }
    if (!nomor.trim()) {
      setError('Nomor telepon / WhatsApp wajib diisi');
      return;
    }

    const contactData: EmergencyContact = {
      id: contactToEdit ? contactToEdit.id : `emg-${Date.now()}`,
      nama: nama.trim(),
      nomor: nomor.trim(),
      kategori,
      keterangan: keterangan.trim(),
      urutan: Number(urutan) || 1,
    };

    onSave(contactData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-rose-100 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 to-red-600 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
              <PhoneCall className="w-5 h-5 text-white" />
            </span>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                {contactToEdit ? 'Edit Nomor Darurat' : 'Tambah Nomor Darurat Baru'}
              </h3>
              <p className="text-xs text-rose-100">
                Direktori kontak cepat & layanan darurat warga Sukorejo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Instansi / Kontak <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Polsek Sukorejo Pasuruan / IGD Puskesmas"
              value={nama}
              onChange={e => setNama(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nomor Telepon / WhatsApp <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: 0812-3456-7890 atau (0343) 611110"
              value={nomor}
              onChange={e => setNomor(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Kategori Layanan
            </label>
            <select
              value={kategori}
              onChange={e => setKategori(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-medium bg-white"
            >
              {CATEGORY_OPTIONS.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Keterangan / Alamat Singkat
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Petugas siaga 24 jam gerbang depan atau Jl. Raya Surabaya - Malang KM 48"
              value={keterangan}
              onChange={e => setKeterangan(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Urutan Tampilan
            </label>
            <input
              type="number"
              min={1}
              value={urutan}
              onChange={e => setUrutan(parseInt(e.target.value) || 1)}
              className="w-28 px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-medium"
            />
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Nomor urut semakin kecil akan muncul lebih awal
            </span>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white text-xs font-bold shadow-md shadow-rose-900/10 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{contactToEdit ? 'Simpan Perubahan' : 'Tambah Kontak'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
