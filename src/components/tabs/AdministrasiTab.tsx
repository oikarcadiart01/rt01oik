import React, { useState, useEffect } from 'react';
import { Resident, OfficialLetter, JenisSuratPengantar, RTInventoryItem, RTGuestLog } from '../../types';
import { formatDateIndo } from '../../utils/formatters';
import {
  FileText,
  PlusCircle,
  Printer,
  Search,
  CheckCircle2,
  Building,
  User,
  Calendar,
  FileCheck,
  Download,
  Trash2,
  X,
  Send,
  Eye,
  Stamp,
  ShieldAlert,
  Users,
  Package,
  Wrench,
  Clock,
  Phone,
  Check,
  MapPin,
  Home,
  ShieldCheck,
} from 'lucide-react';

const INITIAL_INVENTORY: RTInventoryItem[] = [
  { id: 'inv-1', namaBarang: 'Tenda Kerucut Paguyuban 3x3 Meter', kategori: 'Perlengkapan Umum', jumlah: 2, satuan: 'Unit', kondisi: 'Baik', lokasiSimpan: 'Pos Satpam Arcadia', keterangan: 'Digunakan untuk kegiatan warga & rapat RT' },
  { id: 'inv-2', namaBarang: 'Kursi Lipat Chitose', kategori: 'Perlengkapan Umum', jumlah: 60, satuan: 'Unit', kondisi: 'Baik', lokasiSimpan: 'Pos Satpam Arcadia', keterangan: 'Kondisi lengkap dan bersih' },
  { id: 'inv-3', namaBarang: 'Mesin Pemotong Rumput Dorong Honda', kategori: 'Kebersihan', jumlah: 1, satuan: 'Unit', kondisi: 'Baik', lokasiSimpan: 'Gudang RT Blok A', keterangan: 'Rutin diservis tiap 3 bulan' },
  { id: 'inv-4', namaBarang: 'Sound System Wireless Portable + 2 Mic', kategori: 'Elektronik & Sound', jumlah: 1, satuan: 'Set', kondisi: 'Baik', lokasiSimpan: 'Rumah Sekretaris RT', keterangan: 'Baterai rechargeable aktif & mic jernih' },
  { id: 'inv-5', namaBarang: 'Mesin Fogging Nyamuk DBD Thermal', kategori: 'Kebersihan', jumlah: 1, satuan: 'Unit', kondisi: 'Baik', lokasiSimpan: 'Gudang RT Blok A', keterangan: 'Bantuan pembinaan Puskesmas Sukorejo' },
  { id: 'inv-6', namaBarang: 'Tangga Lipat Teleskopik Aluminium 4.5m', kategori: 'Perlengkapan Umum', jumlah: 1, satuan: 'Unit', kondisi: 'Baik', lokasiSimpan: 'Pos Satpam Arcadia', keterangan: 'Untuk perbaikan lampu PJU & pohon' },
  { id: 'inv-7', namaBarang: 'Lampu Sorot LED Lapangan & Kabel Roll 50m', kategori: 'Perlengkapan Umum', jumlah: 2, satuan: 'Set', kondisi: 'Baik', lokasiSimpan: 'Pos Satpam Arcadia', keterangan: 'Siaga darurat malam & acara warga' },
];

const INITIAL_GUEST_LOGS: RTGuestLog[] = [
  { id: 'gst-1', namaTamu: 'Hendro Wicaksono', asalKota: 'Malang', tujuanBlok: 'Blok A1 No. 02', namaTuanRumah: 'Bpk. Bambang Prasetyo', tanggalMasuk: '2026-10-02', rencanaMenginapHari: 3, keperluan: 'Silaturahmi keluarga mertua', noHp: '08123445566', statusLapor: 'Sudah Lapor Satpam' },
  { id: 'gst-2', namaTamu: 'Hj. Siti Maryam', asalKota: 'Surabaya', tujuanBlok: 'Blok B1 No. 04', namaTuanRumah: 'Bpk. Gunawan Wibisono', tanggalMasuk: '2026-10-03', rencanaMenginapHari: 2, keperluan: 'Kunjungan keluarga syukuran', noHp: '082199887766', statusLapor: 'Sudah Lapor Pengurus RT' },
  { id: 'gst-3', namaTamu: 'Dimas Anggoro', asalKota: 'Sidoarjo', tujuanBlok: 'Blok C2 No. 06', namaTuanRumah: 'Bpk. H. Suwandi', tanggalMasuk: '2026-10-04', rencanaMenginapHari: 1, keperluan: 'Urusan kerja sama rekan bisnis', noHp: '085611223344', statusLapor: 'Sudah Lapor Satpam' },
];

interface AdministrasiTabProps {
  residents: Resident[];
  letters: OfficialLetter[];
  onSaveLetter: (letter: OfficialLetter) => void;
  onDeleteLetter: (id: string) => void;
}

export const AdministrasiTab: React.FC<AdministrasiTabProps> = ({
  residents,
  letters,
  onSaveLetter,
  onDeleteLetter,
}) => {
  const [adminSubTab, setAdminSubTab] = useState<'surat' | 'bukuTamu' | 'inventaris'>('surat');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJenisFilter, setSelectedJenisFilter] = useState<string>('Semua');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedLetterForPrint, setSelectedLetterForPrint] = useState<OfficialLetter | null>(null);

  // Guest Log State
  const [guestLogs, setGuestLogs] = useState<RTGuestLog[]>(() => {
    const saved = localStorage.getItem('rt01_guest_logs');
    return saved ? JSON.parse(saved) : INITIAL_GUEST_LOGS;
  });
  const [isAddGuestModalOpen, setIsAddGuestModalOpen] = useState(false);
  const [newGuestNama, setNewGuestNama] = useState('');
  const [newGuestAsal, setNewGuestAsal] = useState('');
  const [newGuestTuanRumah, setNewGuestTuanRumah] = useState('');
  const [newGuestBlok, setNewGuestBlok] = useState('Blok A1 No. 02');
  const [newGuestHari, setNewGuestHari] = useState(2);
  const [newGuestKeperluan, setNewGuestKeperluan] = useState('');
  const [newGuestHp, setNewGuestHp] = useState('');

  // Inventory State
  const [inventory, setInventory] = useState<RTInventoryItem[]>(() => {
    const saved = localStorage.getItem('rt01_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });
  const [isAddInvModalOpen, setIsAddInvModalOpen] = useState(false);
  const [newInvNama, setNewInvNama] = useState('');
  const [newInvKategori, setNewInvKategori] = useState<'Perlengkapan Umum' | 'Kebersihan' | 'Keamanan' | 'Elektronik & Sound'>('Perlengkapan Umum');
  const [newInvJumlah, setNewInvJumlah] = useState(1);
  const [newInvSatuan, setNewInvSatuan] = useState('Unit');
  const [newInvLokasi, setNewInvLokasi] = useState('Pos Satpam Arcadia');
  const [newInvKondisi, setNewInvKondisi] = useState<'Baik' | 'Perlu Perbaikan' | 'Rusak'>('Baik');
  const [newInvKet, setNewInvKet] = useState('');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('rt01_guest_logs', JSON.stringify(guestLogs));
  }, [guestLogs]);

  useEffect(() => {
    localStorage.setItem('rt01_inventory', JSON.stringify(inventory));
  }, [inventory]);

  // Form state for letter
  const [selectedResidentId, setSelectedResidentId] = useState('');
  const [jenisSurat, setJenisSurat] = useState<JenisSuratPengantar>('Surat Pengantar SKCK (Catatan Kepolisian)');
  const [tujuanInstansi, setTujuanInstansi] = useState('Polsek Sukorejo / Polres Pasuruan');
  const [keperluan, setKeperluan] = useState('');
  const [keteranganLain, setKeteranganLain] = useState('');

  const jenisSuratOptions: { jenis: JenisSuratPengantar; defaultTujuan: string; placeholder: string }[] = [
    {
      jenis: 'Surat Pengantar SKCK (Catatan Kepolisian)',
      defaultTujuan: 'Polsek Sukorejo / Polres Pasuruan',
      placeholder: 'Persyaratan melamar pekerjaan / pendaftaran CPNS',
    },
    {
      jenis: 'Surat Keterangan Domisili Warga',
      defaultTujuan: 'Kantor Desa Suwayuwo / Instansi Terkait',
      placeholder: 'Kelengkapan administrasi domisili tempat tinggal di Cluster Arcadia',
    },
    {
      jenis: 'Surat Pengantar Pembuatan KTP / KK',
      defaultTujuan: 'Kantor Desa Suwayuwo / Kantor Kecamatan Sukorejo',
      placeholder: 'Pengurusan permohonan KTP Elektronik baru / Perubahan data Kartu Keluarga',
    },
    {
      jenis: 'Surat Keterangan Izin Keramaian / Acara',
      defaultTujuan: 'Kepala Desa Suwayuwo & Polsek Sukorejo',
      placeholder: 'Pemberitahuan penyelenggaraan acara syukuran / pernikahan keluarga',
    },
    {
      jenis: 'Surat Keterangan Belum Menikah / Menikah',
      defaultTujuan: 'KUA Kecamatan Sukorejo / Kantor Desa Suwayuwo',
      placeholder: 'Persyaratan pendaftaran nikah / kelengkapan berkas KUA',
    },
    {
      jenis: 'Surat Keterangan Tidak Mampu (SKTM)',
      defaultTujuan: 'Kantor Desa Suwayuwo & Dinas Sosial',
      placeholder: 'Persyaratan permohonan bantuan pendidikan / beasiswa anak sekolah',
    },
    {
      jenis: 'Surat Keterangan Kematian / Kelahiran',
      defaultTujuan: 'Pemerintah Desa Suwayuwo',
      placeholder: 'Pengurusan akta kematian / kelahiran di Dispendukcapil',
    },
    {
      jenis: 'Surat Pengantar Umum / Lainnya',
      defaultTujuan: 'Pihak yang Berwenang',
      placeholder: 'Keperluan administrasi kependudukan lainnya',
    },
  ];

  const handleJenisChange = (newJenis: JenisSuratPengantar) => {
    setJenisSurat(newJenis);
    const found = jenisSuratOptions.find(o => o.jenis === newJenis);
    if (found) {
      setTujuanInstansi(found.defaultTujuan);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resident = residents.find(r => r.id === selectedResidentId);
    if (!resident || !keperluan.trim()) return;

    const count = letters.length + 1;
    const countPadded = String(count).padStart(3, '0');
    const romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    const curMonth = romanMonths[new Date().getMonth()];
    const curYear = new Date().getFullYear();

    const newLetter: OfficialLetter = {
      id: `let-${Date.now()}`,
      nomorSurat: `470/${countPadded}/RT.01-RW.12/ARCADIA/${curMonth}/${curYear}`,
      jenisSurat,
      tanggalSurat: new Date().toISOString().split('T')[0],
      namaPemohon: resident.namaLengkap,
      nikPemohon: resident.nik,
      noKkPemohon: resident.noKk,
      blokRumah: resident.blokRumah,
      pekerjaan: resident.pekerjaan || 'Karyawan Swasta',
      keperluan,
      keteranganLain: keteranganLain || undefined,
      tujuanInstansi,
      status: 'Diterbitkan',
      ttdNama: 'Bambang Prasetyo, S.T.',
      ttdJabatan: 'Ketua RT 01 RW 12',
    };

    onSaveLetter(newLetter);
    setIsCreateModalOpen(false);
    setSelectedResidentId('');
    setKeperluan('');
    setKeteranganLain('');
    // Open print preview immediately
    setSelectedLetterForPrint(newLetter);
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestNama.trim() || !newGuestTuanRumah.trim()) return;

    const newGuest: RTGuestLog = {
      id: `gst-${Date.now()}`,
      namaTamu: newGuestNama.trim(),
      asalKota: newGuestAsal.trim() || 'Luar Kota',
      tujuanBlok: newGuestBlok,
      namaTuanRumah: newGuestTuanRumah.trim(),
      tanggalMasuk: new Date().toISOString().split('T')[0],
      rencanaMenginapHari: Number(newGuestHari) || 1,
      keperluan: newGuestKeperluan.trim() || 'Kunjungan keluarga',
      noHp: newGuestHp.trim() || '-',
      statusLapor: 'Sudah Lapor Pengurus RT',
    };

    setGuestLogs(prev => [newGuest, ...prev]);
    setIsAddGuestModalOpen(false);
    setNewGuestNama('');
    setNewGuestAsal('');
    setNewGuestTuanRumah('');
    setNewGuestKeperluan('');
    setNewGuestHp('');
  };

  const handleAddInventory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvNama.trim()) return;

    const newItem: RTInventoryItem = {
      id: `inv-${Date.now()}`,
      namaBarang: newInvNama.trim(),
      kategori: newInvKategori,
      jumlah: Number(newInvJumlah) || 1,
      satuan: newInvSatuan.trim() || 'Unit',
      kondisi: newInvKondisi,
      lokasiSimpan: newInvLokasi.trim() || 'Pos Satpam Arcadia',
      keterangan: newInvKet.trim() || undefined,
    };

    setInventory(prev => [newItem, ...prev]);
    setIsAddInvModalOpen(false);
    setNewInvNama('');
    setNewInvJumlah(1);
    setNewInvSatuan('Unit');
    setNewInvKet('');
  };

  const filteredLetters = letters.filter(l => {
    const matchesSearch =
      l.nomorSurat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.namaPemohon.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.blokRumah.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.keperluan.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesJenis =
      selectedJenisFilter === 'Semua' || l.jenisSurat === selectedJenisFilter;

    return matchesSearch && matchesJenis;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl shadow-sm">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                  Layanan Tata Usaha & Persuratan RT
                </span>
                <span className="text-xs text-slate-400">• Mode Pengurus RT</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Surat Menyurat & Administrasi RT 01 RW 12
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Penerbitan surat pengantar resmi, buku tamu 24 jam & inventaris aset Cluster Arcadia Desa Suwayuwo
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto">
          {adminSubTab === 'surat' && (
            <button
              onClick={() => {
                if (residents.length > 0) setSelectedResidentId(residents[0].id);
                setIsCreateModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all justify-center w-full sm:w-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Buat Surat Pengantar Baru</span>
            </button>
          )}

          {adminSubTab === 'bukuTamu' && (
            <button
              onClick={() => setIsAddGuestModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all justify-center w-full sm:w-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Catat Tamu Wajib Lapor</span>
            </button>
          )}

          {adminSubTab === 'inventaris' && (
            <button
              onClick={() => setIsAddInvModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all justify-center w-full sm:w-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tambah Aset Inventaris</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/90">
        <button
          onClick={() => setAdminSubTab('surat')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            adminSubTab === 'surat'
              ? 'bg-white text-emerald-800 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-600" />
          <span>Buku Agenda Surat Pengantar</span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">
            {letters.length}
          </span>
        </button>

        <button
          onClick={() => setAdminSubTab('bukuTamu')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            adminSubTab === 'bukuTamu'
              ? 'bg-white text-blue-800 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-blue-600" />
          <span>Buku Tamu Lapor &gt; 24 Jam</span>
          <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded-full font-bold">
            {guestLogs.length}
          </span>
        </button>

        <button
          onClick={() => setAdminSubTab('inventaris')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            adminSubTab === 'inventaris'
              ? 'bg-white text-amber-800 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Package className="w-4 h-4 text-amber-600" />
          <span>Buku Inventaris & Aset RT</span>
          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-bold">
            {inventory.length}
          </span>
        </button>
      </div>

      {/* SUBTAB 1: SURAT PENGANTAR & ARSIP PERSURATAN */}
      {adminSubTab === 'surat' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-slate-500 font-semibold block">Total Surat Diterbitkan</span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{letters.length} Berkas</div>
              <span className="text-[11px] text-emerald-700 mt-0.5 block font-medium">Arsip resmi tersimpan</span>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-emerald-700 font-semibold block">Bulan Berjalan (Oktober 2026)</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">
                {letters.filter(l => l.tanggalSurat.startsWith('2026-10')).length} Surat
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block">Tercatat di Buku Agenda</span>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-blue-700 font-semibold block">Instansi Tujuan Terbanyak</span>
              <div className="text-lg sm:text-xl font-bold text-slate-900 mt-1">Desa Suwayuwo & Polsek</div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Kecamatan Sukorejo Pasuruan</span>
            </div>
          </div>

          {/* Control Bar: Search & Filter */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Cari nomor surat, nama pemohon, blok rumah, atau keperluan..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <select
                value={selectedJenisFilter}
                onChange={e => setSelectedJenisFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-700 text-xs font-semibold focus:outline-hidden"
              >
                <option value="Semua">Semua Jenis Surat</option>
                {jenisSuratOptions.map(o => (
                  <option key={o.jenis} value={o.jenis}>
                    {o.jenis}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
              <span>Menampilkan <strong>{filteredLetters.length}</strong> surat dalam buku agenda RT</span>
              <span className="text-[11px] text-emerald-800 font-medium">Format baku Peraturan Desa Suwayuwo</span>
            </div>
          </div>

          {/* Table of Issued Letters */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/80 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 w-12 text-center text-slate-400">No.</th>
                    <th className="py-3 px-4">Nomor & Tanggal Surat</th>
                    <th className="py-3 px-4">Nama Pemohon & Blok</th>
                    <th className="py-3 px-4">Jenis Surat Pengantar</th>
                    <th className="py-3 px-4">Maksud / Keperluan</th>
                    <th className="py-3 px-4">Tujuan Instansi</th>
                    <th className="py-3 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLetters.length > 0 ? (
                    filteredLetters.map((letter, idx) => (
                      <tr key={letter.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 text-center text-slate-400 font-mono text-xs">
                          {idx + 1}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-mono font-bold text-slate-900 block text-xs">
                            {letter.nomorSurat}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {formatDateIndo(letter.tanggalSurat)}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-bold text-slate-900 block">{letter.namaPemohon}</span>
                          <span className="text-[11px] text-slate-500">{letter.blokRumah}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200/70">
                            {letter.jenisSurat}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-700 max-w-xs">
                          <span className="line-clamp-2">{letter.keperluan}</span>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 text-xs">
                          {letter.tujuanInstansi}
                        </td>

                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setSelectedLetterForPrint(letter)}
                              title="Pratinjau & Cetak Surat"
                              className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>Cetak</span>
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Hapus arsip surat ${letter.nomorSurat}?`)) {
                                  onDeleteLetter(letter.id);
                                }
                              }}
                              title="Hapus Surat"
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500">
                        Belum ada surat pengantar yang sesuai dengan kriteria pencarian.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: BUKU TAMU WAJIB LAPOR > 24 JAM */}
      {adminSubTab === 'bukuTamu' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-slate-500 font-semibold block">Total Tamu Menginap</span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{guestLogs.length} Orang</div>
              <span className="text-[11px] text-blue-600 mt-0.5 block font-medium">Tertib lapor 1x24 jam</span>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-slate-500 font-semibold block">Tamu Menginap Aktif</span>
              <div className="text-2xl sm:text-3xl font-black text-blue-700 mt-1">
                {guestLogs.filter(g => g.statusLapor !== 'Selesai').length} Orang
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block">Di lingkungan Arcadia</span>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-slate-500 font-semibold block">Kebijakan Keamanan RT</span>
              <div className="text-sm font-bold text-slate-800 mt-1">Wajib Lapor &gt; 24 Jam</div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Ke Pos Satpam / Pengurus RT</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Daftar Buku Tamu Menginap</h3>
                <p className="text-xs text-slate-500">Pencatatan tamu warga luar Cluster Arcadia sesuai tata tertib lingkungan</p>
              </div>
              <button
                onClick={() => setIsAddGuestModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Catat Tamu</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 w-10 text-center">No</th>
                    <th className="py-3 px-4">Nama Tamu & Asal</th>
                    <th className="py-3 px-4">Tuan Rumah & Blok</th>
                    <th className="py-3 px-4">Tgl Masuk & Lama</th>
                    <th className="py-3 px-4">Maksud Kunjungan</th>
                    <th className="py-3 px-4">Kontak HP</th>
                    <th className="py-3 px-4">Status Lapor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {guestLogs.map((gst, idx) => (
                    <tr key={gst.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 text-center text-slate-400 font-mono text-xs">{idx + 1}</td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-bold text-slate-900 block">{gst.namaTamu}</span>
                        <span className="text-[11px] text-slate-500">Asal: {gst.asalKota}</span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-semibold text-slate-800 block">{gst.namaTuanRumah}</span>
                        <span className="text-[11px] text-slate-500">{gst.tujuanBlok}</span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-slate-800 block font-medium">{formatDateIndo(gst.tanggalMasuk)}</span>
                        <span className="text-[11px] text-blue-600 font-bold">{gst.rencanaMenginapHari} hari menginap</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 max-w-xs">{gst.keperluan}</td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 font-mono text-xs">{gst.noHp}</td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {gst.statusLapor}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: BUKU INVENTARIS & ASET RT */}
      {adminSubTab === 'inventaris' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-slate-500 font-semibold block">Total Jenis Barang</span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{inventory.length} Item</div>
              <span className="text-[11px] text-amber-700 mt-0.5 block font-medium">Aset milik paguyuban RT</span>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-slate-500 font-semibold block">Kondisi Baik & Siap Pakai</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">
                {inventory.filter(i => i.kondisi === 'Baik').length} Item
              </div>
              <span className="text-[11px] text-emerald-600 mt-0.5 block font-medium">Siap dipinjam warga</span>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-slate-500 font-semibold block">Perlu Perbaikan / Servis</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">
                {inventory.filter(i => i.kondisi !== 'Baik').length} Item
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block">Dijadwalkan pemeliharaan</span>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-slate-500 font-semibold block">Lokasi Penyimpanan Utama</span>
              <div className="text-base font-bold text-slate-800 mt-1">Pos Satpam & Gudang RT</div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Kunci dipegang satpam jaga</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Daftar Buku Inventaris Barang & Fasilitas RT</h3>
                <p className="text-xs text-slate-500">Aset sarana prasarana yang dapat dipinjam oleh warga Cluster Arcadia</p>
              </div>
              <button
                onClick={() => setIsAddInvModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Tambah Barang</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 w-10 text-center">No</th>
                    <th className="py-3 px-4">Nama Barang & Fasilitas</th>
                    <th className="py-3 px-4">Kategori Pos</th>
                    <th className="py-3 px-4 text-center">Jumlah Satuan</th>
                    <th className="py-3 px-4 text-center">Kondisi</th>
                    <th className="py-3 px-4">Lokasi Simpan</th>
                    <th className="py-3 px-4">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inventory.map((inv, idx) => (
                    <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 text-center text-slate-400 font-mono text-xs">{idx + 1}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">{inv.namaBarang}</td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 text-xs">{inv.kategori}</td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-900 whitespace-nowrap">
                        {inv.jumlah} {inv.satuan}
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            inv.kondisi === 'Baik'
                              ? 'bg-emerald-100 text-emerald-800'
                              : inv.kondisi === 'Perlu Perbaikan'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {inv.kondisi}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-700 font-medium text-xs">
                        {inv.lokasiSimpan}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-xs max-w-xs">{inv.keterangan || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal Buat Surat Pengantar Baru */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/20 rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg">Buat Surat Pengantar RT Resmi</h3>
                  <p className="text-xs text-emerald-100">RT 01 RW 12 Cluster Arcadia Suwayuwo</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pilih Warga Pemohon (Dari Data Kependudukan) *
                </label>
                <select
                  required
                  value={selectedResidentId}
                  onChange={e => setSelectedResidentId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                >
                  <option value="" disabled>-- Pilih Warga / Kepala Keluarga --</option>
                  {residents.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.blokRumah} - {r.namaLengkap} (NIK: {r.nik})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jenis Surat Pengantar *
                </label>
                <select
                  required
                  value={jenisSurat}
                  onChange={e => handleJenisChange(e.target.value as JenisSuratPengantar)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                >
                  {jenisSuratOptions.map(o => (
                    <option key={o.jenis} value={o.jenis}>
                      {o.jenis}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tujuan Instansi / Pejabat *
                </label>
                <input
                  type="text"
                  required
                  value={tujuanInstansi}
                  onChange={e => setTujuanInstansi(e.target.value)}
                  placeholder="Contoh: Kepala Desa Suwayuwo / Kapolsek Sukorejo"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Maksud / Keperluan Pembuatan Surat *
                </label>
                <textarea
                  required
                  rows={3}
                  value={keperluan}
                  onChange={e => setKeperluan(e.target.value)}
                  placeholder="Jelaskan secara jelas keperluan warga, misal: Sebagai persyaratan pengurusan SKCK untuk melamar pekerjaan di PT HM Sampoerna Sukorejo."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Keterangan Tambahan / Catatan Khusus (Opsional)
                </label>
                <input
                  type="text"
                  value={keteranganLain}
                  onChange={e => setKeteranganLain(e.target.value)}
                  placeholder="Contoh: Yang bersangkutan benar berdomisili sejak tahun 2020."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                <span className="font-bold block">Pejabat Penandatangan:</span>
                <p>Bambang Prasetyo, S.T. (Ketua RT 01 RW 12 Cluster Arcadia)</p>
                <p className="text-[11px] text-emerald-800">Nomor surat resmi akan di-generate otomatis oleh sistem.</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Terbitkan Surat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Tamu Lapor Baru */}
      {isAddGuestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Catat Tamu Wajib Lapor &gt; 24 Jam</h3>
                  <p className="text-xs text-blue-100">Buku Tamu RT 01 Cluster Arcadia</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddGuestModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGuest} className="p-6 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Tamu *</label>
                <input
                  type="text"
                  required
                  value={newGuestNama}
                  onChange={e => setNewGuestNama(e.target.value)}
                  placeholder="Contoh: Hendro Wicaksono"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kota / Daerah Asal</label>
                  <input
                    type="text"
                    value={newGuestAsal}
                    onChange={e => setNewGuestAsal(e.target.value)}
                    placeholder="Contoh: Malang"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lama Menginap (Hari)</label>
                  <input
                    type="number"
                    min="1"
                    value={newGuestHari}
                    onChange={e => setNewGuestHari(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Tuan Rumah Dikunjungi *</label>
                <input
                  type="text"
                  required
                  value={newGuestTuanRumah}
                  onChange={e => setNewGuestTuanRumah(e.target.value)}
                  placeholder="Contoh: Bpk. Bambang Prasetyo"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Blok Rumah Arcadia *</label>
                <input
                  type="text"
                  required
                  value={newGuestBlok}
                  onChange={e => setNewGuestBlok(e.target.value)}
                  placeholder="Contoh: Blok A1 No. 02"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Keperluan Kunjungan</label>
                <input
                  type="text"
                  value={newGuestKeperluan}
                  onChange={e => setNewGuestKeperluan(e.target.value)}
                  placeholder="Contoh: Silaturahmi keluarga"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nomor HP Tamu</label>
                <input
                  type="text"
                  value={newGuestHp}
                  onChange={e => setNewGuestHp(e.target.value)}
                  placeholder="Contoh: 08123456789"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddGuestModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Simpan Laporan Tamu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Barang Inventaris */}
      {isAddInvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-amber-600 to-orange-700 text-white">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Tambah Barang Inventaris RT</h3>
                  <p className="text-xs text-amber-100">Pencatatan Aset Paguyuban Arcadia</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddInvModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddInventory} className="p-6 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Barang / Fasilitas *</label>
                <input
                  type="text"
                  required
                  value={newInvNama}
                  onChange={e => setNewInvNama(e.target.value)}
                  placeholder="Contoh: Tenda Kerucut 3x3 Meter"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={newInvKategori}
                    onChange={e => setNewInvKategori(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-hidden"
                  >
                    <option value="Perlengkapan Umum">Perlengkapan Umum</option>
                    <option value="Kebersihan">Kebersihan</option>
                    <option value="Keamanan">Keamanan</option>
                    <option value="Elektronik & Sound">Elektronik & Sound</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kondisi</label>
                  <select
                    value={newInvKondisi}
                    onChange={e => setNewInvKondisi(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-hidden"
                  >
                    <option value="Baik">Baik</option>
                    <option value="Perlu Perbaikan">Perlu Perbaikan</option>
                    <option value="Rusak">Rusak</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jumlah</label>
                  <input
                    type="number"
                    min="1"
                    value={newInvJumlah}
                    onChange={e => setNewInvJumlah(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Satuan</label>
                  <input
                    type="text"
                    value={newInvSatuan}
                    onChange={e => setNewInvSatuan(e.target.value)}
                    placeholder="Unit / Set / Pcs"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lokasi Penyimpanan</label>
                <input
                  type="text"
                  value={newInvLokasi}
                  onChange={e => setNewInvLokasi(e.target.value)}
                  placeholder="Pos Satpam Arcadia / Gudang RT"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Keterangan Tambahan</label>
                <input
                  type="text"
                  value={newInvKet}
                  onChange={e => setNewInvKet(e.target.value)}
                  placeholder="Kondisi atau ketentuan pinjam"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddInvModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Simpan Barang Inventaris
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Pratinjau & Cetak Surat Pengantar Resmi */}
      {selectedLetterForPrint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl my-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between p-4 bg-slate-900 text-white">
              <span className="text-sm font-bold flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                Pratinjau Surat Pengantar Resmi (Siap Cetak / PDF)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Cetak Dokumen
                </button>
                <button
                  onClick={() => setSelectedLetterForPrint(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Official Paper Sheet Preview */}
            <div className="p-8 sm:p-12 text-slate-900 font-serif leading-relaxed text-sm bg-white">
              {/* Kop Surat Resmi RT */}
              <div className="text-center pb-4 border-b-2 border-slate-900 relative">
                <h3 className="font-sans text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-700">
                  RUKUN TETANGGA 01 RUKUN WARGA 12
                </h3>
                <h2 className="font-sans text-base sm:text-xl font-black uppercase text-slate-900 tracking-wide mt-0.5">
                  PAGUYUBAN WARGA CLUSTER ARCADIA
                </h2>
                <h4 className="font-sans text-xs sm:text-sm font-bold text-slate-800">
                  PERUMAHAN OMA INDAH KAPUK - DESA SUWAYUWO
                </h4>
                <p className="font-sans text-[11px] text-slate-600 mt-1">
                  Kecamatan Sukorejo, Kabupaten Pasuruan, Jawa Timur - Kode Pos: 67161
                </p>
              </div>

              {/* Title & Nomor Surat */}
              <div className="text-center my-6">
                <h3 className="font-sans text-base sm:text-lg font-black uppercase underline tracking-wider text-slate-900">
                  {selectedLetterForPrint.jenisSurat}
                </h3>
                <p className="font-sans text-xs font-semibold text-slate-700 mt-0.5 font-mono">
                  Nomor : {selectedLetterForPrint.nomorSurat}
                </p>
              </div>

              {/* Paragraf Pembuka */}
              <p className="text-justify mb-4 indent-8">
                Yang bertanda tangan di bawah ini Ketua RT 01 RW 12 Cluster Arcadia Perumahan Oma Indah Kapuk, Desa Suwayuwo, Kecamatan Sukorejo, Kabupaten Pasuruan, dengan ini menerangkan dengan sebenarnya bahwa:
              </p>

              {/* Biodata Pemohon */}
              <div className="pl-6 pr-2 space-y-1.5 my-4 font-sans text-xs sm:text-sm">
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 font-semibold text-slate-700">Nama Lengkap</span>
                  <span className="col-span-8 font-bold text-slate-900">: {selectedLetterForPrint.namaPemohon}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 font-semibold text-slate-700">Nomor Induk Kependudukan (NIK)</span>
                  <span className="col-span-8 font-mono font-bold text-slate-900">: {selectedLetterForPrint.nikPemohon}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 font-semibold text-slate-700">Nomor Kartu Keluarga (KK)</span>
                  <span className="col-span-8 font-mono text-slate-800">: {selectedLetterForPrint.noKkPemohon}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 font-semibold text-slate-700">Pekerjaan / Profesi</span>
                  <span className="col-span-8 text-slate-800">: {selectedLetterForPrint.pekerjaan}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 font-semibold text-slate-700">Alamat Tempat Tinggal</span>
                  <span className="col-span-8 text-slate-800">
                    : Cluster Arcadia {selectedLetterForPrint.blokRumah}, Perumahan Oma Indah Kapuk, RT 01 RW 12, Desa Suwayuwo, Kec. Sukorejo, Kab. Pasuruan.
                  </span>
                </div>
              </div>

              {/* Keterangan & Keperluan */}
              <p className="text-justify my-4 indent-8">
                Adalah benar yang bersangkutan merupakan warga yang berdomisili dan bertempat tinggal sah di lingkungan RT 01 RW 12 Cluster Arcadia Desa Suwayuwo. Berdasarkan catatan administrasi kami, yang bersangkutan berkelakuan baik, rukun bermasyarakat, dan tidak sedang tersangkut permasalahan hukum.
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 my-4 font-sans text-xs sm:text-sm">
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-3 font-bold text-slate-800">Maksud / Keperluan:</span>
                  <span className="col-span-9 font-semibold text-slate-900">: {selectedLetterForPrint.keperluan}</span>
                </div>
                <div className="grid grid-cols-12 gap-2 mt-1">
                  <span className="col-span-3 text-slate-600">Diberikan Kepada:</span>
                  <span className="col-span-9 text-slate-800">: {selectedLetterForPrint.tujuanInstansi}</span>
                </div>
              </div>

              <p className="text-justify my-4 indent-8">
                Demikian surat pengantar ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya oleh pihak yang berkepentingan. Surat pengantar ini berlaku selama 30 (tiga puluh) hari sejak tanggal diterbitkan.
              </p>

              {/* Tanda Tangan */}
              <div className="mt-10 pt-4 grid grid-cols-2 text-center font-sans text-xs sm:text-sm">
                <div>
                  <p className="text-slate-500">Pemohon / Warga,</p>
                  <div className="h-20 flex items-end justify-center">
                    <p className="font-bold underline text-slate-900">{selectedLetterForPrint.namaPemohon}</p>
                  </div>
                </div>

                <div>
                  <p className="text-slate-700">
                    Suwayuwo, {formatDateIndo(selectedLetterForPrint.tanggalSurat)}
                  </p>
                  <p className="font-bold text-slate-900">Ketua RT 01 RW 12 Cluster Arcadia,</p>
                  <div className="h-20 flex flex-col items-center justify-end relative">
                    <span className="text-[10px] text-emerald-700 font-bold border border-emerald-500/50 rounded-md px-2 py-0.5 bg-emerald-50 absolute top-4 opacity-80 rotate-[-8deg]">
                      [ TERCATAT BUKU AGENDA RT 01 ]
                    </span>
                    <p className="font-bold underline text-slate-900">{selectedLetterForPrint.ttdNama}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedLetterForPrint(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold cursor-pointer"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
