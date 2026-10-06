import React, { useState, useEffect } from 'react';
import { Official } from '../../types';
import { X, User, Phone, Home, Image, Award, Calendar, Check, Sparkles } from 'lucide-react';

interface EditPengurusModalProps {
  isOpen: boolean;
  onClose: () => void;
  official: Official | null;
  onSave: (updatedOfficial: Official) => void;
}

const SAMPLE_AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
];

export const EditPengurusModal: React.FC<EditPengurusModalProps> = ({
  isOpen,
  onClose,
  official,
  onSave,
}) => {
  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [blokRumah, setBlokRumah] = useState('');
  const [noHp, setNoHp] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [periode, setPeriode] = useState('2024 - 2027');

  useEffect(() => {
    if (official) {
      setNama(official.nama);
      setJabatan(official.jabatan);
      setBlokRumah(official.blokRumah);
      setNoHp(official.noHp);
      setFotoUrl(official.fotoUrl);
      setPeriode(official.periode || '2024 - 2027');
    }
  }, [official]);

  if (!isOpen || !official) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !jabatan.trim()) return;

    const updated: Official = {
      ...official,
      nama: nama.trim(),
      jabatan: jabatan.trim(),
      blokRumah: blokRumah.trim(),
      noHp: noHp.trim(),
      fotoUrl: fotoUrl.trim() || official.fotoUrl,
      periode: periode.trim(),
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/15 rounded-2xl backdrop-blur-md">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">Edit Data Pengurus RT</h3>
              <p className="text-xs text-teal-100">{official.jabatan}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {/* Avatar Preview */}
          <div className="flex items-center gap-4 p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-xs shrink-0 bg-slate-100">
              <img
                src={fotoUrl || official.fotoUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={e => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold text-emerald-800 block">Foto Profil Pengurus</span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Pilih foto cepat di bawah atau tempelkan tautan (URL) gambar Anda sendiri.
              </p>
            </div>
          </div>

          {/* Quick Avatar Choices */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Pilihan Cepat Foto Avatar
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
              {SAMPLE_AVATARS.map((url, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setFotoUrl(url)}
                  className={`w-10 h-10 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    fotoUrl === url ? 'border-emerald-600 scale-105 shadow-xs' : 'border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <img src={url} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Custom URL Foto */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              URL Foto Profil
            </label>
            <div className="relative">
              <Image className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="url"
                value={fotoUrl}
                onChange={e => setFotoUrl(e.target.value)}
                placeholder="https://..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Jabatan */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Jabatan Pengurus <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Award className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={jabatan}
                onChange={e => setJabatan(e.target.value)}
                placeholder="Contoh: Ketua RT 01, Bendahara RT"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
              />
            </div>
          </div>

          {/* Nama Lengkap */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Lengkap & Gelar <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={nama}
                onChange={e => setNama(e.target.value)}
                placeholder="Nama lengkap pengurus"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-semibold"
              />
            </div>
          </div>

          {/* Blok Rumah & No HP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Blok Rumah
              </label>
              <div className="relative">
                <Home className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={blokRumah}
                  onChange={e => setBlokRumah(e.target.value)}
                  placeholder="Contoh: Blok A1 No. 02"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nomor WhatsApp / HP
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  value={noHp}
                  onChange={e => setNoHp(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Periode Masa Bakti */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Periode Masa Bakti
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={periode}
                onChange={e => setPeriode(e.target.value)}
                placeholder="2024 - 2027"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors min-h-[42px]"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5 min-h-[42px]"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
