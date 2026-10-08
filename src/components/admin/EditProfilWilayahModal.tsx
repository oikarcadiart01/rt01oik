import React, { useState, useEffect } from 'react';
import { ProfilWilayahInfo, ProfilPilarItem } from '../../types';
import { X, Building2, Plus, Trash2, CheckCircle2, Sparkles } from 'lucide-react';

interface EditProfilWilayahModalProps {
  isOpen: boolean;
  onClose: () => void;
  profilInfo: ProfilWilayahInfo;
  onSave: (info: ProfilWilayahInfo) => void;
}

export const EditProfilWilayahModal: React.FC<EditProfilWilayahModalProps> = ({
  isOpen,
  onClose,
  profilInfo,
  onSave,
}) => {
  const [namaWilayah, setNamaWilayah] = useState('');
  const [subJudul, setSubJudul] = useState('');
  const [alamatLengkap, setAlamatLengkap] = useState('');
  const [aksesStrategis, setAksesStrategis] = useState('');
  const [deskripsiUmum, setDeskripsiUmum] = useState('');
  const [pilarList, setPilarList] = useState<ProfilPilarItem[]>([]);

  useEffect(() => {
    if (profilInfo) {
      setNamaWilayah(profilInfo.namaWilayah || 'RT 01 RW 12 Cluster Arcadia');
      setSubJudul(profilInfo.subJudul || 'Profil Lingkungan & Wilayah');
      setAlamatLengkap(profilInfo.alamatLengkap || '');
      setAksesStrategis(profilInfo.aksesStrategis || '');
      setDeskripsiUmum(profilInfo.deskripsiUmum || '');
      setPilarList(profilInfo.pilarList ? [...profilInfo.pilarList] : []);
    }
  }, [profilInfo, isOpen]);

  if (!isOpen) return null;

  const handleAddPilar = () => {
    setPilarList(prev => [
      ...prev,
      {
        id: `pilar-${Date.now()}`,
        judul: 'Poin Informasi Baru',
        deskripsi: 'Deskripsi detail mengenai lingkungan atau fasilitas RT 01...',
        warnaAksen: 'emerald',
      },
    ]);
  };

  const handleUpdatePilar = (index: number, field: keyof ProfilPilarItem, value: string) => {
    setPilarList(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleDeletePilar = (index: number) => {
    setPilarList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ProfilWilayahInfo = {
      ...profilInfo,
      namaWilayah: namaWilayah.trim(),
      subJudul: subJudul.trim(),
      alamatLengkap: alamatLengkap.trim(),
      aksesStrategis: aksesStrategis.trim(),
      deskripsiUmum: deskripsiUmum.trim(),
      pilarList,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-white/20 rounded-2xl">
              <Building2 className="w-5 h-5 text-amber-200" />
            </span>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                Edit Profil Lingkungan & Wilayah
              </h3>
              <p className="text-xs text-teal-100">
                Perbarui identitas, alamat, akses, dan informasi pokok Cluster Arcadia
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nama Wilayah / Lingkungan <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={namaWilayah}
                onChange={e => setNamaWilayah(e.target.value)}
                placeholder="RT 01 RW 12 Cluster Arcadia"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs sm:text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Sub Judul / Kategori
              </label>
              <input
                type="text"
                value={subJudul}
                onChange={e => setSubJudul(e.target.value)}
                placeholder="Profil Lingkungan & Wilayah"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs sm:text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Alamat Lengkap Wilayah <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={alamatLengkap}
              onChange={e => setAlamatLengkap(e.target.value)}
              placeholder="Perumahan Oma Indah Kapuk, Desa Suwayuwo, Kecamatan Sukorejo, Pasuruan..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs sm:text-sm outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Akses Strategis & Petunjuk Arah
            </label>
            <input
              type="text"
              value={aksesStrategis}
              onChange={e => setAksesStrategis(e.target.value)}
              placeholder="Contoh: Poros Surabaya - Malang KM 48 Sukorejo"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs sm:text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Deskripsi Umum Kawasan Cluster
            </label>
            <textarea
              rows={3}
              value={deskripsiUmum}
              onChange={e => setDeskripsiUmum(e.target.value)}
              placeholder="Deskripsi singkat mengenai karakteristik cluster, suasana lingkungan, dan kenyamanan hunian..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs sm:text-sm outline-none resize-none"
            />
          </div>

          {/* Section Pilar-Pilar Informasi */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                  Pilar Informasi Lingkungan (Blok, Fasilitas, Prinsip)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Kartu ringkasan informasi yang tampil di halaman profil warga
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddPilar}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Pilar</span>
              </button>
            </div>

            <div className="space-y-3">
              {pilarList.map((pilar, index) => (
                <div
                  key={pilar.id || index}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 relative"
                >
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      required
                      value={pilar.judul}
                      onChange={e => handleUpdatePilar(index, 'judul', e.target.value)}
                      placeholder="Judul Pilar (misal: Blok Hunian, Fasilitas Bersama)"
                      className="w-full font-bold px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:border-emerald-500 outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => handleDeletePilar(index)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                      title="Hapus Pilar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <textarea
                    required
                    rows={2}
                    value={pilar.deskripsi}
                    onChange={e => handleUpdatePilar(index, 'deskripsi', e.target.value)}
                    placeholder="Uraian detail untuk pilar ini..."
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:border-emerald-500 outline-none resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan Profil Wilayah</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
