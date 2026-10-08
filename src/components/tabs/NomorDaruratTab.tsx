import React, { useState } from 'react';
import { EMERGENCY_CONTACTS } from '../../data/initialData';
import { EmergencyContact } from '../../types';
import {
  PhoneCall,
  Shield,
  HeartPulse,
  Flame,
  Zap,
  Search,
  Phone,
  MessageSquare,
  AlertTriangle,
  Building,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface NomorDaruratTabProps {
  contacts?: EmergencyContact[];
}

export const NomorDaruratTab: React.FC<NomorDaruratTabProps> = ({ contacts = EMERGENCY_CONTACTS }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');

  // Categories list
  const kategoriList = [
    'Semua',
    'Keamanan & Polisi',
    'Medis & Ambulans',
    'Pemadam & SAR',
    'Utilitas & Desa',
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch =
      contact.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.nomor.includes(searchTerm) ||
      contact.keterangan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.kategori.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesKategori =
      selectedKategori === 'Semua' ||
      contact.kategori.toLowerCase().includes(selectedKategori.toLowerCase().split(' ')[0]);

    return matchesSearch && matchesKategori;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner - Urgent & Radiant Red/Rose Theme */}
      <div className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden border border-rose-400/40">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-10 -bottom-10 w-64 h-64 bg-red-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-amber-200 text-xs font-bold mb-3 shadow-2xs">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Pusat Kontak Cepat Siaga 24 Jam</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-tight drop-shadow-xs">
            Direktori Nomor Darurat & Kontak Cepat Sukorejo
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-rose-50/95 leading-relaxed font-normal">
            Hubungi instansi kepolisian, fasilitas medis, pemadam kebakaran, dan pos jaga keamanan Cluster Arcadia saat membutuhkan penanganan darurat mendesak.
          </p>

          <div className="mt-4 pt-4 border-t border-rose-400/40 flex flex-wrap items-center gap-3 text-xs text-rose-100">
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Layanan Siaga 24 Jam Panggilan Darurat</span>
            </span>
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10 font-medium">
              <Shield className="w-3.5 h-3.5 text-emerald-300" />
              <span>Wilayah Sukorejo & Kabupaten Pasuruan</span>
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl w-full sm:w-auto justify-center overflow-x-auto">
          {kategoriList.map(kat => (
            <button
              key={kat}
              onClick={() => setSelectedKategori(kat)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedKategori === kat
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {kat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-rose-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari instansi, nomor telepon, keterangan..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
          />
        </div>
      </div>

      {/* Daftar Kartu Kontak Lengkap */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact, idx) => {
            const cleanNumber = contact.nomor.replace(/[^\d+]/g, '');
            const isHp = cleanNumber.startsWith('08') || cleanNumber.startsWith('+62');

            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 hover:border-rose-300 shadow-xs hover:shadow-lg transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {contact.kategori}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">#0{idx + 1}</span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                    {contact.nama}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {contact.keterangan}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] text-slate-400 font-medium">Nomor Siaga:</span>
                    <span className="font-mono text-sm font-black text-slate-900">
                      {contact.nomor}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${cleanNumber}`}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Telepon</span>
                    </a>

                    {isHp ? (
                      <a
                        href={`https://wa.me/62${cleanNumber.replace(/^0/, '')}?text=Halo%20saya%20warga%20Cluster%20Arcadia%20RT%2001%20RW%2012,%20membutuhkan%20bantuan%20darurat.`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    ) : (
                      <a
                        href={`tel:${cleanNumber}`}
                        className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Panggil</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-200">
            Tidak ada nomor kontak yang cocok dengan pencarian Anda.
          </div>
        )}
      </div>

      {/* Panduan Tanggap Darurat Warga */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </span>
          <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
            Protokol Tanggap Darurat Warga Cluster Arcadia
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600 pt-1">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">1. Tetap Tenang & Amankan Diri</span>
            <p className="leading-relaxed">
              Hindari panik. Pastikan seluruh anggota keluarga berada dalam kondisi aman sebelum melakukan panggilan darurat.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">2. Hubungi Satpam & Pengurus RT</span>
            <p className="leading-relaxed">
              Petugas satpam Pos Gerbang siap merespons langsung dalam 1-3 menit dan membukakan portal darurat.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">3. Buka Akses Jalan Kendaraan</span>
            <p className="leading-relaxed">
              Pastikan jalan di depan rumah bebas dari parkir kendaraan agar mobil ambulans atau damkar dapat lewat dengan lancar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
