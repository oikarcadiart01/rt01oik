import React, { useState } from 'react';
import { EmergencyContact } from '../../types';
import { AddEditDaruratModal } from './AddEditDaruratModal';
import { ConfirmDialog } from '../modals/ConfirmDialog';
import {
  PhoneCall,
  PlusCircle,
  Search,
  Edit3,
  Trash2,
  Phone,
  MessageSquare,
  Shield,
  HeartPulse,
  Flame,
  Zap,
  Building,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';

interface AdminDaruratTabProps {
  contacts: EmergencyContact[];
  onSaveContact: (contact: EmergencyContact) => void;
  onDeleteContact: (id: string) => void;
}

const getCategoryIcon = (kategori: string) => {
  const k = kategori.toLowerCase();
  if (k.includes('keamanan') || k.includes('polisi') || k.includes('satpam')) return Shield;
  if (k.includes('medis') || k.includes('kesehatan') || k.includes('puskesmas')) return HeartPulse;
  if (k.includes('pemadam') || k.includes('damkar')) return Flame;
  if (k.includes('utilitas') || k.includes('pln')) return Zap;
  return Building;
};

export const AdminDaruratTab: React.FC<AdminDaruratTabProps> = ({
  contacts,
  onSaveContact,
  onDeleteContact,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('Semua');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<EmergencyContact | null>(null);
  const [contactToDelete, setContactToDelete] = useState<EmergencyContact | null>(null);

  const categories = ['Semua', 'Keamanan Lingkungan', 'Keamanan & Polisi', 'Medis & Ambulans', 'Pemadam & SAR', 'Utilitas & Desa', 'Pengurus RT'];

  const filteredContacts = contacts.filter(c => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      c.nama.toLowerCase().includes(q) ||
      c.nomor.toLowerCase().includes(q) ||
      c.keterangan.toLowerCase().includes(q) ||
      c.kategori.toLowerCase().includes(q);

    const matchCat =
      selectedKategori === 'Semua' ||
      c.kategori.toLowerCase().includes(selectedKategori.toLowerCase().split(' ')[0]);

    return matchSearch && matchCat;
  });

  const sortedContacts = [...filteredContacts].sort((a, b) => (a.urutan || 99) - (b.urutan || 99));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden border border-rose-400/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-bold mb-2.5">
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              <span>Kelola Kontak & Layanan Darurat</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Nomor Darurat & Kontak Cepat
            </h2>
            <p className="text-xs sm:text-sm text-rose-100 max-w-xl mt-0.5">
              Tambah, perbarui, dan atur daftar kontak siaga polsek, puskesmas, damkar, satpam, dan utilitas yang tampil di aplikasi warga.
            </p>
          </div>

          <button
            onClick={() => {
              setContactToEdit(null);
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 text-xs sm:text-sm font-black shadow-md transition-all shrink-0 hover:scale-102 active:scale-98 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-rose-600" />
            <span>Tambah Nomor Darurat</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama instansi, nomor telepon, atau keterangan..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedKategori(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedKategori === cat
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedContacts.map(contact => {
          const Icon = getCategoryIcon(contact.kategori);
          const cleanPhone = contact.nomor.replace(/[^0-9]/g, '');

          return (
            <div
              key={contact.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="p-3 bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl shadow-xs shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                        {contact.kategori}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm mt-1 leading-snug">
                        {contact.nama}
                      </h4>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                    #{contact.urutan || 1}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[11px] text-slate-500 font-medium block">Nomor Telepon:</span>
                  <p className="font-black text-rose-700 text-base tracking-wide flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-rose-500" />
                    <span>{contact.nomor}</span>
                  </p>
                </div>

                {contact.keterangan && (
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {contact.keterangan}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1 transition-colors"
                    title="Panggil Telepon"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Panggil</span>
                  </a>

                  {cleanPhone.startsWith('08') && (
                    <a
                      href={`https://wa.me/62${cleanPhone.slice(1)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 text-xs font-bold flex items-center gap-1 transition-colors"
                      title="Kirim WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="text-[11px]">WA</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setContactToEdit(contact);
                      setIsAddModalOpen(true);
                    }}
                    className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                    title="Edit Nomor"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setContactToDelete(contact)}
                    className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                    title="Hapus Nomor"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {sortedContacts.length === 0 && (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200">
            <PhoneCall className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 text-sm">Tidak ada kontak ditemukan</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Silakan tambahkan kontak darurat baru atau sesuaikan kata kunci pencarian.
            </p>
          </div>
        )}
      </div>

      {/* Modal Add / Edit */}
      <AddEditDaruratModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setContactToEdit(null);
        }}
        onSave={onSaveContact}
        contactToEdit={contactToEdit}
      />

      {/* Dialog Konfirmasi Hapus */}
      <ConfirmDialog
        isOpen={!!contactToDelete}
        title="Hapus Nomor Darurat"
        message={`Apakah Anda yakin ingin menghapus kontak "${contactToDelete?.nama}" (${contactToDelete?.nomor}) dari daftar nomor darurat?`}
        confirmText="Ya, Hapus Kontak"
        isDestructive={true}
        onConfirm={() => {
          if (contactToDelete) {
            onDeleteContact(contactToDelete.id);
            setContactToDelete(null);
          }
        }}
        onCancel={() => setContactToDelete(null)}
      />
    </div>
  );
};
