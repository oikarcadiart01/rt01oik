import React, { useState, useEffect } from 'react';
import { TataTertibRule } from '../../types';
import { FileText, X, Save, AlertTriangle, Plus, Trash2 } from 'lucide-react';

interface AddEditTataTertibModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rule: TataTertibRule) => void;
  ruleToEdit?: TataTertibRule | null;
}

const KATEGORI_OPTIONS = [
  'Keamanan & Ketertiban',
  'Kebersihan Lingkungan',
  'Kenyamanan Hunian',
  'Keuangan & Fasilitas',
  'Lalu Lintas Lingkungan',
  'Sosial & Fasilitas Umum',
  'Ketertiban Umum',
];

export const AddEditTataTertibModal: React.FC<AddEditTataTertibModalProps> = ({
  isOpen,
  onClose,
  onSave,
  ruleToEdit,
}) => {
  const [pasal, setPasal] = useState<number>(1);
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('Keamanan & Ketertiban');
  const [deskripsiSingkat, setDeskripsiSingkat] = useState('');
  const [items, setItems] = useState<string[]>(['']);
  const [error, setError] = useState('');

  useEffect(() => {
    if (ruleToEdit) {
      setPasal(ruleToEdit.pasal);
      setJudul(ruleToEdit.judul);
      setKategori(ruleToEdit.kategori);
      setDeskripsiSingkat(ruleToEdit.deskripsiSingkat || '');
      setItems(ruleToEdit.items && ruleToEdit.items.length > 0 ? [...ruleToEdit.items] : ['']);
    } else {
      setPasal(1);
      setJudul('');
      setKategori('Keamanan & Ketertiban');
      setDeskripsiSingkat('');
      setItems(['']);
    }
    setError('');
  }, [ruleToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    setItems([...items, '']);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) {
      setItems(['']);
      return;
    }
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const handleItemChange = (index: number, val: string) => {
    const updated = [...items];
    updated[index] = val;
    setItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim()) {
      setError('Judul pasal tata tertib wajib diisi');
      return;
    }
    const validItems = items.map(it => it.trim()).filter(Boolean);
    if (validItems.length === 0) {
      setError('Minimal harus ada 1 butir aturan dalam pasal ini');
      return;
    }

    const ruleData: TataTertibRule = {
      id: ruleToEdit ? ruleToEdit.id : `rule-${Date.now()}`,
      pasal: Number(pasal) || 1,
      judul: judul.trim(),
      kategori,
      deskripsiSingkat: deskripsiSingkat.trim() || undefined,
      items: validItems,
      urutan: Number(pasal) || 1,
    };

    onSave(ruleData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-teal-100 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-cyan-800 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
              <FileText className="w-5 h-5 text-white" />
            </span>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                {ruleToEdit ? `Edit Pasal ${ruleToEdit.pasal} Tata Tertib` : 'Tambah Pasal Tata Tertib Baru'}
              </h3>
              <p className="text-xs text-teal-100">
                Pedoman dan ketertiban warga paguyuban RT 01 RW 12 Cluster Arcadia
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
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nomor Pasal <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min={1}
                required
                value={pasal}
                onChange={e => setPasal(parseInt(e.target.value) || 1)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-medium"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kategori Aturan
              </label>
              <select
                value={kategori}
                onChange={e => setKategori(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-medium bg-white"
              >
                {KATEGORI_OPTIONS.map(kat => (
                  <option key={kat} value={kat}>
                    {kat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Judul Pasal <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Keamanan & Ketertiban Tamu"
              value={judul}
              onChange={e => setJudul(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Ringkasan / Deskripsi Singkat
            </label>
            <input
              type="text"
              placeholder="Contoh: Prosedur satu gerbang, identitas tamu, dan kewajiban lapor tamu menginap."
              value={deskripsiSingkat}
              onChange={e => setDeskripsiSingkat(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-medium"
            />
          </div>

          {/* Dynamic Clauses / Butir Aturan */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700">
                Butir-Butir Peraturan & Ketentuan <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Butir</span>
              </button>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0 mt-2">
                    {idx + 1}
                  </span>
                  <textarea
                    rows={2}
                    value={item}
                    placeholder={`Tuliskan butir aturan ke-${idx + 1}...`}
                    onChange={e => handleItemChange(idx, e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-medium"
                  />
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors mt-1 cursor-pointer"
                      title="Hapus butir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
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
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 text-white text-xs font-bold shadow-md shadow-teal-900/10 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{ruleToEdit ? 'Simpan Perubahan Pasal' : 'Tambah Pasal Baru'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
