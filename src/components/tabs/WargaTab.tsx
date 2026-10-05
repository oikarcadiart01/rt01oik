import React, { useState } from 'react';
import { Resident } from '../../types';
import { exportMultiSheetExcel } from '../../utils/formatters';
import {
  Users,
  Search,
  UserPlus,
  FileSpreadsheet,
  Filter,
  Home,
  Phone,
  Eye,
  Edit,
  Trash2,
  Building,
  Briefcase,
  X,
  UserCheck,
  Calendar,
} from 'lucide-react';

interface WargaTabProps {
  residents: Resident[];
  isAdminMode: boolean;
  onOpenAddWarga: () => void;
  onEditWarga: (resident: Resident) => void;
  onDeleteWarga: (id: string) => void;
}

export const WargaTab: React.FC<WargaTabProps> = ({
  residents,
  isAdminMode,
  onOpenAddWarga,
  onEditWarga,
  onDeleteWarga,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('Semua');
  const [selectedStatusTinggal, setSelectedStatusTinggal] = useState('Semua');
  const [detailResident, setDetailResident] = useState<Resident | null>(null);

  // Statistics
  const totalKK = residents.length;
  const totalJiwa = residents.reduce((sum, r) => sum + r.jumlahAnggota, 0);
  const totalTetap = residents.filter(r => r.statusTinggal === 'Tetap').length;
  const totalKontrak = residents.filter(r => r.statusTinggal === 'Kontrak/Sewa').length;

  // Filtered residents
  const filteredResidents = residents.filter(r => {
    const matchesSearch =
      r.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.blokRumah.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.pekerjaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.noHp.includes(searchTerm);

    const matchesBlock =
      selectedBlock === 'Semua' || r.blokRumah.toUpperCase().includes(selectedBlock.toUpperCase());

    const matchesStatusTinggal =
      selectedStatusTinggal === 'Semua' || r.statusTinggal === selectedStatusTinggal;

    return matchesSearch && matchesBlock && matchesStatusTinggal;
  });

  // Convert to Excel with 2 Sheets as requested
  const handleConvertExcel = () => {
    // Sheet 1: Data KK
    const sheet1Data = filteredResidents.map((r, idx) => ({
      'No': idx + 1,
      'Nomor KK': r.noKk,
      'Nama Kepala Keluarga': r.namaLengkap,
      'NIK Kepala Keluarga': r.nik,
      'Blok / No Rumah': r.blokRumah,
      'Status Tempat Tinggal': r.statusTinggal,
      'Jumlah Jiwa': r.jumlahAnggota,
      'Profesi / Pekerjaan': r.pekerjaan,
      'No WhatsApp': r.noHp,
      'Tanggal Masuk': r.tanggalMasuk,
    }));

    // Sheet 2: Detail Penduduk / Jiwa (Nama Kepala Keluarga di Kolom B setelah Nomor)
    const sheet2Data: Record<string, unknown>[] = [];
    let counter = 1;

    filteredResidents.forEach(r => {
      // 1. Data Kepala Keluarga (sebagai Jiwa Utama)
      sheet2Data.push({
        'No': counter++,
        'Nama Kepala Keluarga': r.namaLengkap,
        'Nama Lengkap Anggota / Jiwa': r.namaLengkap,
        'Hubungan dalam Keluarga': 'Kepala Keluarga',
        'Usia (Tahun)': '-',
        'Blok / No Rumah': r.blokRumah,
        'Nomor Kartu Keluarga (KK)': r.noKk,
        'NIK': r.nik,
        'Status Tempat Tinggal': r.statusTinggal,
        'Pekerjaan / Profesi': r.pekerjaan,
        'Kontak WhatsApp / No HP': r.noHp,
      });

      // 2. Data Anggota Keluarga Lainnya (Istri, Anak, Orang Tua, dll)
      if (r.anggotaKeluarga && r.anggotaKeluarga.length > 0) {
        r.anggotaKeluarga.forEach(member => {
          const perkiraanProfesi =
            member.hubungan === 'Istri'
              ? 'Ibu Rumah Tangga'
              : member.usia <= 23 && member.usia >= 6
              ? 'Pelajar / Mahasiswa'
              : member.usia < 6
              ? 'Balita / Belum Sekolah'
              : '-';

          sheet2Data.push({
            'No': counter++,
            'Nama Kepala Keluarga': r.namaLengkap,
            'Nama Lengkap Anggota / Jiwa': member.nama,
            'Hubungan dalam Keluarga': member.hubungan,
            'Usia (Tahun)': member.usia,
            'Blok / No Rumah': r.blokRumah,
            'Nomor Kartu Keluarga (KK)': r.noKk,
            'NIK': '-',
            'Status Tempat Tinggal': r.statusTinggal,
            'Pekerjaan / Profesi': perkiraanProfesi,
            'Kontak WhatsApp / No HP': r.noHp,
          });
        });
      }
    });

    const dateStr = new Date().toISOString().split('T')[0];
    exportMultiSheetExcel(
      `Data_Kependudukan_RT01_Arcadia_${dateStr}`,
      'Data KK',
      sheet1Data,
      'Detail Penduduk Jiwa',
      sheet2Data
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Stats - Clean & Simple */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Kepala Keluarga (KK)</span>
            <span className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalKK} KK</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Cluster Arcadia</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Total Penduduk</span>
            <span className="p-1.5 bg-blue-50 text-blue-700 rounded-lg">
              <Home className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalJiwa} Jiwa</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Rata-rata 3-4 jiwa/KK</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Warga Tetap</span>
            <span className="p-1.5 bg-teal-50 text-teal-700 rounded-lg">
              <Building className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalTetap} KK</div>
          <span className="text-[11px] text-teal-600 mt-0.5 block font-medium">Pemilik Rumah</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Warga Kontrak / Sewa</span>
            <span className="p-1.5 bg-amber-50 text-amber-700 rounded-lg">
              <UserCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalKontrak} KK</div>
          <span className="text-[11px] text-amber-700 mt-0.5 block font-medium">Sewa & Kost</span>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Cari nama warga, blok rumah (contoh: Blok A1, B2), atau no HP..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Action buttons: Export ONLY visible to Admin */}
          <div className="flex items-center gap-2">
            {isAdminMode && (
              <>
                <button
                  onClick={handleConvertExcel}
                  title="Convert & download Excel (Sheet 1: Data KK, Sheet 2: Detail Penduduk Jiwa)"
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                  <span>Convert Excel (2 Sheet)</span>
                </button>

                <button
                  onClick={onOpenAddWarga}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Tambah Warga</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1 text-slate-500 font-semibold mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter Blok:
          </div>

          <select
            value={selectedBlock}
            onChange={e => setSelectedBlock(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="Semua">Semua Blok</option>
            <option value="Blok A">Blok A</option>
            <option value="Blok B">Blok B</option>
            <option value="Blok C">Blok C</option>
            <option value="Blok D">Blok D</option>
          </select>

          <select
            value={selectedStatusTinggal}
            onChange={e => setSelectedStatusTinggal(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="Semua">Semua Status Tinggal</option>
            <option value="Tetap">Warga Tetap</option>
            <option value="Kontrak/Sewa">Kontrak / Sewa</option>
            <option value="Kost">Kost</option>
          </select>

          {(searchTerm || selectedBlock !== 'Semua' || selectedStatusTinggal !== 'Semua') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedBlock('Semua');
                setSelectedStatusTinggal('Semua');
              }}
              className="text-emerald-700 hover:text-emerald-800 font-semibold px-2 py-1"
            >
              Reset
            </button>
          )}

          <div className="ml-auto text-slate-400">
            Menampilkan <strong className="text-slate-700">{filteredResidents.length}</strong> warga
          </div>
        </div>
      </div>

      {/* Simplified, Clean Residents Table (Profesi & Catatan removed from view) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50/80 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center text-slate-400">No.</th>
                <th className="py-3.5 px-4">Nama Kepala Keluarga</th>
                <th className="py-3.5 px-4">Blok / Rumah</th>
                <th className="py-3.5 px-4">Status & Jiwa</th>
                {isAdminMode && (
                  <>
                    <th className="py-3.5 px-4">Kontak WhatsApp</th>
                    <th className="py-3.5 px-4 text-center">Lihat & Aksi</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResidents.length > 0 ? (
                filteredResidents.map((res, index) => (
                  <tr key={res.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 text-center text-slate-400 font-mono text-xs">
                      {index + 1}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{res.namaLengkap}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        NIK: {res.nik.substring(0, 6)}••••••{res.nik.substring(12)}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-800 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold">
                        <Home className="w-3.5 h-3.5 text-emerald-600" />
                        {res.blokRumah}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          res.statusTinggal === 'Tetap'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {res.statusTinggal}
                      </span>
                      <div className="text-[11px] text-slate-500 mt-1">
                        {res.jumlahAnggota} Jiwa
                      </div>
                    </td>

                    {isAdminMode && (
                      <>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <a
                            href={`https://wa.me/62${res.noHp.replace(/^0/, '')}?text=Halo%20${encodeURIComponent(res.namaLengkap)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-medium hover:underline"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-600" />
                            {res.noHp}
                          </a>
                        </td>

                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setDetailResident(res)}
                              title="Lihat Detail Lengkap"
                              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 rounded-lg transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Detail</span>
                            </button>

                            <button
                              onClick={() => onEditWarga(res)}
                              title="Edit Data Warga"
                              className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Yakin ingin menghapus data warga ${res.namaLengkap}?`)) {
                                  onDeleteWarga(res.id);
                                }
                              }}
                              title="Hapus Data Warga"
                              className="p-1.5 text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isAdminMode ? 6 : 4} className="py-8 text-center text-slate-500">
                    Tidak ada data warga yang sesuai dengan pencarian atau filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Resident / KK (Catatan Khusus dihapus sesuai instruksi) */}
      {detailResident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg">Detail Kartu Data Warga</h3>
                  <p className="text-xs text-emerald-100">
                    {detailResident.blokRumah} • Cluster Arcadia
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDetailResident(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">
                      {detailResident.namaLengkap}
                    </h4>
                    {/* Profesi tampil hanya di detail */}
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold text-xs mt-1 bg-emerald-100/70 px-2.5 py-1 rounded-md inline-flex">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Profesi: {detailResident.pekerjaan || 'Karyawan Swasta'}</span>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      detailResident.statusTinggal === 'Tetap'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {detailResident.statusTinggal}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block">Nomor KK:</span>
                    <span className="font-mono font-semibold text-slate-700">{detailResident.noKk}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">NIK Kepala Keluarga:</span>
                    <span className="font-mono font-semibold text-slate-700">{detailResident.nik}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block">No. WhatsApp:</span>
                    <span className="font-semibold text-slate-800">{detailResident.noHp}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Mulai Menetap:</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {detailResident.tanggalMasuk || '-'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Anggota Keluarga */}
              <div>
                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  Daftar Anggota Keluarga ({detailResident.jumlahAnggota} Jiwa)
                </h5>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {detailResident.anggotaKeluarga && detailResident.anggotaKeluarga.length > 0 ? (
                    detailResident.anggotaKeluarga.map((member, idx) => (
                      <div key={idx} className="p-3 flex items-center justify-between bg-white text-xs">
                        <div>
                          <span className="font-bold text-slate-900 block">{member.nama}</span>
                          <span className="text-slate-500 text-[11px]">{member.hubungan}</span>
                        </div>
                        <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                          {member.usia} Tahun
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-slate-500 text-xs">
                      {detailResident.namaLengkap} (Kepala Keluarga)
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setDetailResident(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
