export type ResidentStatus = 'Tetap' | 'Kontrak/Sewa' | 'Kost' | 'Rumah Kosong';
export type PaymentStatus = 'Lunas' | 'Belum Lunas' | 'Menunggak';

export interface Resident {
  id: string;
  nik: string; // masked for privacy e.g. 351408xxxxxx0001
  noKk: string;
  namaLengkap: string;
  blokRumah: string; // e.g. Blok A1 No. 04
  statusTinggal: ResidentStatus;
  jumlahAnggota: number;
  pekerjaan: string;
  noHp: string;
  email?: string;
  statusIuran: PaymentStatus;
  iuranTerakhirBulan: string;
  tanggalMasuk: string;
  catatan?: string;
  // Months paid in current year (e.g. ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'])
  bulanTerbayar?: string[];
  anggotaKeluarga?: {
    nama: string;
    hubungan: string;
    usia: number;
  }[];
}

export interface Official {
  id: string;
  jabatan: string;
  nama: string;
  blokRumah: string;
  noHp: string;
  fotoUrl: string;
  tupoksi: string[];
  periode: string;
  urutan: number;
}

export type TransactionType = 'Pemasukan' | 'Pengeluaran';
export type TransactionCategory =
  | 'Iuran Warga Bulanan'
  | 'Iuran Keamanan & Sampah'
  | 'Donasi & Kas Sukarela'
  | 'Sewa Fasilitas/Tenda'
  | 'Gaji Keamanan/Satpam'
  | 'Kebersihan & Angkut Sampah'
  | 'Perawatan Taman & Lingkungan'
  | 'Penerangan Jalan (PJU) & Listrik Pos'
  | 'Konsumsi Rapat & Sosialisasi'
  | 'Kegiatan Warga / 17 Agustus'
  | 'Dana Sosial & Santunan'
  | 'Lain-lain';

export interface CashTransaction {
  id: string;
  tanggal: string; // YYYY-MM-DD
  jenis: TransactionType;
  kategori: TransactionCategory;
  nominal: number;
  keterangan: string;
  blokRumah?: string; // for resident fee
  buktiRef?: string;
  dicatatOleh: string;
}

export type EventStatus = 'Akan Datang' | 'Sedang Berlangsung' | 'Selesai' | 'Dibatalkan';

export interface CommunityEvent {
  id: string;
  judul: string;
  deskripsi: string;
  tanggal: string; // YYYY-MM-DD
  waktu: string; // e.g. 07:00 - 10:00 WIB
  lokasi: string;
  kategori: 'Kerja Bakti' | 'Ronda Malam' | 'Posyandu' | 'Sosial & Pengajian' | 'Olahraga' | 'Rapat Warga' | 'Peringatan Hari Besar';
  status: EventStatus;
  penanggungJawab: string;
  targetPeserta: string;
  rsvpCount?: number;
  fotoUrl?: string;
  dokumentasi?: string[];
}

export type ComplaintStatus = 'Menunggu' | 'Diproses' | 'Selesai' | 'Ditolak';
export type ComplaintPriority = 'Biasa' | 'Sedang' | 'Mendesak / Darurat';

export interface Complaint {
  id: string;
  tiketNo: string;
  namaPelapor: string;
  blokRumah: string;
  noHp: string;
  kategori: 'Lampu Jalan / PJU' | 'Saluran Air / Drainase' | 'Kebersihan & Sampah' | 'Keamanan & Ketertiban' | 'Fasilitas Umum & Taman' | 'Hewan Peliharaan' | 'Lainnya';
  prioritas: ComplaintPriority;
  judul: string;
  deskripsi: string;
  lokasiSpesifik: string;
  fotoUrl?: string;
  status: ComplaintStatus;
  tanggalLapor: string;
  tanggapanPengurus?: string;
  tanggalSelesai?: string;
  petugasTindakLanjut?: string;
  fotoPenyelesaian?: string;
}

export interface RTAnnouncement {
  id: string;
  judul: string;
  isi: string;
  tanggal: string;
  prioritas: 'Normal' | 'Penting' | 'Darurat';
  dibuatOleh: string;
}

export type JenisSuratPengantar =
  | 'Surat Pengantar Pembuatan KTP / KK'
  | 'Surat Pengantar SKCK (Catatan Kepolisian)'
  | 'Surat Keterangan Domisili Warga'
  | 'Surat Keterangan Belum Menikah / Menikah'
  | 'Surat Keterangan Kematian / Kelahiran'
  | 'Surat Keterangan Izin Keramaian / Acara'
  | 'Surat Keterangan Tidak Mampu (SKTM)'
  | 'Surat Pengantar Umum / Lainnya';

export interface OfficialLetter {
  id: string;
  nomorSurat: string;
  jenisSurat: JenisSuratPengantar;
  tanggalSurat: string;
  namaPemohon: string;
  nikPemohon: string;
  noKkPemohon: string;
  blokRumah: string;
  pekerjaan: string;
  keperluan: string;
  keteranganLain?: string;
  tujuanInstansi: string; // e.g. Kantor Desa Suwayuwo, Polsek Sukorejo, Dispendukcapil
  status: 'Diterbitkan' | 'Selesai' | 'Dibatalkan';
  ttdNama: string; // e.g. Bambang Prasetyo, S.T.
  ttdJabatan: string; // e.g. Ketua RT 01 RW 12
}

export interface RTInventoryItem {
  id: string;
  namaBarang: string;
  kategori: 'Perlengkapan Umum' | 'Kebersihan' | 'Keamanan' | 'Elektronik & Sound';
  jumlah: number;
  satuan: string;
  kondisi: 'Baik' | 'Perlu Perbaikan' | 'Rusak';
  lokasiSimpan: string;
  keterangan?: string;
}

export interface RTGuestLog {
  id: string;
  namaTamu: string;
  asalKota: string;
  tujuanBlok: string;
  namaTuanRumah: string;
  tanggalMasuk: string;
  rencanaMenginapHari: number;
  keperluan: string;
  noHp: string;
  statusLapor: 'Sudah Lapor Satpam' | 'Sudah Lapor Pengurus RT' | 'Selesai';
}

export interface DocumentationPhoto {
  id: string;
  url: string; // Base64 data URL or image URL
  caption?: string;
  uploadedAt: string;
}

export interface EventDocumentation {
  id: string;
  folderName: string; // format: nama kegiatan_tanggal e.g. "Kerja Bakti Akbar Bersama Warga_2026-06-15"
  kegiatanJudul: string;
  tanggal: string; // YYYY-MM-DD
  keterangan?: string;
  lokasi?: string;
  fotoList: DocumentationPhoto[];
  createdAt: string;
  updatedAt: string;
}
