import React, { useState } from 'react';
import {
  RTAnnouncement,
  Official,
  CommunityEvent,
  Resident,
  CashTransaction,
  Complaint,
  OfficialLetter,
  ComplaintStatus,
  PaymentStatus,
  EventDocumentation,
} from '../../types';
import { AdminHeaderBanner } from './AdminHeaderBanner';
import { AdminNavbar, AdminNavTab } from './AdminNavbar';
import { AdminMobileNav } from './AdminMobileNav';
import { AdminBerandaTab } from './AdminBerandaTab';
import { AdminPengurusTab } from './AdminPengurusTab';
import { AdminKegiatanTab } from './AdminKegiatanTab';
import { WargaTab } from '../tabs/WargaTab';
import { KeuanganTab } from '../tabs/KeuanganTab';
import { PengaduanTab } from '../tabs/PengaduanTab';
import { AdministrasiTab } from '../tabs/AdministrasiTab';
import { ProfilWilayahTab } from '../tabs/ProfilWilayahTab';
import { EmergencyModal } from '../modals/EmergencyModal';
import { CekIuranModal } from '../modals/CekIuranModal';
import { INITIAL_OFFICIALS } from '../../data/initialData';
import { AddWargaModal } from '../modals/AddWargaModal';
import { AddTransaksiModal } from '../modals/AddTransaksiModal';
import { AddPengaduanModal } from '../modals/AddPengaduanModal';
import { saveDocument, deleteDocument } from '../../services/firebase';
import { LogOut, Heart } from 'lucide-react';

interface AdminPortalProps {
  announcements: RTAnnouncement[];
  officials: Official[];
  events: CommunityEvent[];
  residents: Resident[];
  transactions: CashTransaction[];
  complaints: Complaint[];
  letters: OfficialLetter[];
  saldoKas: number;
  onLogoutAdmin: () => void;
  showToast: (msg: string) => void;
  setResidents: React.Dispatch<React.SetStateAction<Resident[]>>;
  setOfficials: React.Dispatch<React.SetStateAction<Official[]>>;
  setTransactions: React.Dispatch<React.SetStateAction<CashTransaction[]>>;
  setEvents: React.Dispatch<React.SetStateAction<CommunityEvent[]>>;
  setComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>;
  setLetters: React.Dispatch<React.SetStateAction<OfficialLetter[]>>;
  documentations: EventDocumentation[];
  setDocumentations: React.Dispatch<React.SetStateAction<EventDocumentation[]>>;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  announcements,
  officials,
  events,
  residents,
  transactions,
  complaints,
  letters,
  saldoKas,
  onLogoutAdmin,
  showToast,
  setResidents,
  setOfficials,
  setTransactions,
  setEvents,
  setComplaints,
  setLetters,
  documentations,
  setDocumentations,
}) => {
  const [activeTab, setActiveTab] = useState<AdminNavTab>('beranda');

  // Modals
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isCekIuranOpen, setIsCekIuranOpen] = useState(false);
  const [isAddWargaOpen, setIsAddWargaOpen] = useState(false);
  const [residentToEdit, setResidentToEdit] = useState<Resident | null>(null);
  const [isAddTransaksiOpen, setIsAddTransaksiOpen] = useState(false);
  const [isAddPengaduanOpen, setIsAddPengaduanOpen] = useState(false);

  const totalJiwa = residents.reduce((sum, r) => sum + r.jumlahAnggota, 0);
  const activeComplaintsCount = complaints.filter(
    c => c.status === 'Menunggu' || c.status === 'Diproses'
  ).length;

  // Handlers for Data Mutation
  const handleSaveResident = (res: Resident) => {
    saveDocument('residents', res);
    if (residentToEdit) {
      setResidents(prev => prev.map(r => (r.id === res.id ? res : r)));
      showToast(`Data warga ${res.namaLengkap} berhasil diperbarui.`);
    } else {
      setResidents(prev => [res, ...prev]);
      showToast(`Warga baru ${res.namaLengkap} (${res.blokRumah}) berhasil didaftarkan.`);
    }
    setResidentToEdit(null);
  };

  const handleEditResident = (res: Resident) => {
    setResidentToEdit(res);
    setIsAddWargaOpen(true);
  };

  const handleDeleteResident = (id: string) => {
    deleteDocument('residents', id);
    setResidents(prev => prev.filter(r => r.id !== id));
    showToast('Data warga berhasil dihapus.');
  };

  const handleSaveTransaction = (tx: CashTransaction) => {
    saveDocument('transactions', tx);
    setTransactions(prev => [tx, ...prev]);
    showToast(`Transaksi kas ${tx.jenis} sebesar Rp ${tx.nominal.toLocaleString('id-ID')} berhasil dicatat.`);
  };

  const handleDeleteTransaction = (id: string) => {
    deleteDocument('transactions', id);
    setTransactions(prev => prev.filter(t => t.id !== id));
    showToast('Transaksi kas berhasil dihapus.');
  };

  const handleUpdateResidentPaymentStatus = (
    residentId: string,
    newStatus: PaymentStatus,
    month: string
  ) => {
    const resident = residents.find(r => r.id === residentId);
    if (resident) {
      const updatedRes = { ...resident, statusIuran: newStatus, iuranTerakhirBulan: month };
      saveDocument('residents', updatedRes);
    }
    setResidents(prev =>
      prev.map(r =>
        r.id === residentId
          ? { ...r, statusIuran: newStatus, iuranTerakhirBulan: month }
          : r
      )
    );

    if (newStatus === 'Lunas' && resident) {
      const newTx: CashTransaction = {
        id: `tx-iuran-${Date.now()}`,
        tanggal: new Date().toISOString().split('T')[0],
        jenis: 'Pemasukan',
        kategori: 'Iuran Warga Bulanan',
        nominal: 100000,
        keterangan: `Pembayaran iuran ${resident.blokRumah} (${resident.namaLengkap}) bulan ${month}`,
        dicatatOleh: 'Bendahara RT 01',
      };
      saveDocument('transactions', newTx);
      setTransactions(prev => [newTx, ...prev]);
      showToast(`Iuran ${resident.blokRumah} ditandai LUNAS dan dicatat ke Buku Kas RT.`);
    } else {
      showToast(`Status iuran ${resident?.blokRumah || ''} diubah.`);
    }
  };

  const handleSaveEvent = (ev: CommunityEvent) => {
    saveDocument('events', ev);
    setEvents(prev => {
      const exists = prev.some(e => e.id === ev.id);
      if (exists) {
        return prev.map(e => (e.id === ev.id ? ev : e));
      }
      return [ev, ...prev];
    });
    showToast(`Agenda kegiatan "${ev.judul}" berhasil disimpan.`);
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteDocument('events', eventId);
    setEvents(prev => prev.filter(e => e.id !== eventId));
    showToast('Agenda kegiatan berhasil dihapus.');
  };

  const handleSaveComplaint = (cmp: Complaint) => {
    saveDocument('complaints', cmp);
    setComplaints(prev => [cmp, ...prev]);
    showToast(`Laporan aduan #${cmp.tiketNo} berhasil dicatat.`);
  };

  const handleDeleteComplaint = (complaintId: string) => {
    deleteDocument('complaints', complaintId);
    setComplaints(prev => prev.filter(c => c.id !== complaintId));
    showToast('Tiket aduan telah dihapus.');
  };

  const handleUpdateComplaintStatus = (
    id: string,
    status: ComplaintStatus,
    tanggapan: string,
    petugas: string
  ) => {
    const complaint = complaints.find(c => c.id === id);
    if (complaint) {
      const updatedCmp: Complaint = {
        ...complaint,
        status,
        tanggapanPengurus: tanggapan,
        petugasTindakLanjut: petugas,
        tanggalSelesai:
          status === 'Selesai'
            ? new Date().toISOString().split('T')[0]
            : complaint.tanggalSelesai,
      };
      saveDocument('complaints', updatedCmp);
    }
    setComplaints(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              status,
              tanggapanPengurus: tanggapan,
              petugasTindakLanjut: petugas,
              tanggalSelesai:
                status === 'Selesai'
                  ? new Date().toISOString().split('T')[0]
                  : c.tanggalSelesai,
            }
          : c
      )
    );
    showToast('Status aduan dan tanggapan pengurus berhasil disimpan.');
  };

  const handleSaveLetter = (letter: OfficialLetter) => {
    saveDocument('letters', letter);
    setLetters(prev => [letter, ...prev]);
    showToast(`Surat Pengantar No. ${letter.nomorSurat} berhasil diterbitkan.`);
  };

  const handleDeleteLetter = (id: string) => {
    deleteDocument('letters', id);
    setLetters(prev => prev.filter(l => l.id !== id));
    showToast('Arsip surat pengantar telah dihapus.');
  };

  const handleSaveOfficial = (updatedOfficial: Official) => {
    saveDocument('officials', updatedOfficial);
    setOfficials(prev => {
      const exists = prev.some(o => o.id === updatedOfficial.id);
      if (exists) {
        return prev.map(o => (o.id === updatedOfficial.id ? updatedOfficial : o));
      }
      return [...prev, updatedOfficial];
    });
    showToast(`Data ${updatedOfficial.jabatan} (${updatedOfficial.nama}) berhasil disimpan.`);
  };

  const handleDeleteOfficial = (id: string) => {
    deleteDocument('officials', id);
    setOfficials(prev => prev.filter(o => o.id !== id));
    showToast('Pengurus RT berhasil dihapus.');
  };

  const handleResetOfficials = () => {
    INITIAL_OFFICIALS.forEach(o => saveDocument('officials', o));
    setOfficials(INITIAL_OFFICIALS);
    showToast('Susunan pengurus RT berhasil dikembalikan ke standar awal.');
  };

  const handleSaveDocumentation = (docItem: EventDocumentation) => {
    saveDocument('documentation', docItem);
    setDocumentations(prev => {
      const exists = prev.some(d => d.id === docItem.id);
      if (exists) {
        return prev.map(d => (d.id === docItem.id ? docItem : d));
      }
      return [docItem, ...prev];
    });
    showToast(`Folder dokumentasi "${docItem.folderName}" berhasil disimpan ke database.`);
  };

  const handleDeleteDocumentation = (id: string) => {
    deleteDocument('documentation', id);
    setDocumentations(prev => prev.filter(d => d.id !== id));
    showToast('Folder dokumentasi kegiatan berhasil dihapus dari database.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/60 via-slate-50 to-amber-50/40 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header Banner Mode Admin */}
      <AdminHeaderBanner
        onLogoutAdmin={onLogoutAdmin}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenCekIuran={() => setIsCekIuranOpen(true)}
        onNavigateTab={tab => setActiveTab(tab)}
        totalWarga={totalJiwa}
        totalKK={residents.length}
        saldoKas={saldoKas}
        aduanAktif={activeComplaintsCount}
      />

      {/* Navigasi Penuh Mode Admin */}
      <AdminNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        complaintCount={activeComplaintsCount}
        letterCount={letters.length}
      />

      {/* Baris Pemberitahuan Mode Admin Aktif */}
      <div className="bg-gradient-to-r from-amber-400/25 via-amber-300/20 to-orange-400/25 border-b border-amber-400/30 py-2.5 px-4 text-center text-xs font-semibold text-amber-950 flex flex-wrap items-center justify-center gap-2 shadow-2xs">
        <span>🔐 Anda sedang berada dalam <strong>Mode Admin Pengurus RT 01 RW 12</strong>. Memiliki akses penuh menambah & mengelola data warga, kas, dan surat.</span>
        <button
          onClick={onLogoutAdmin}
          className="inline-flex items-center gap-1 underline text-amber-950 font-bold ml-1 hover:text-amber-800 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" /> Keluar Admin
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 pb-24 md:pb-8">
        {activeTab === 'beranda' && (
          <AdminBerandaTab
            announcements={announcements}
            residents={residents}
            transactions={transactions}
            complaints={complaints}
            setActiveTab={setActiveTab}
            onOpenAddComplaint={() => setIsAddPengaduanOpen(true)}
            onOpenCekIuran={() => setIsCekIuranOpen(true)}
            letterCount={letters.length}
          />
        )}

        {activeTab === 'warga' && (
          <WargaTab
            residents={residents}
            isAdminMode={true}
            onOpenAddWarga={() => {
              setResidentToEdit(null);
              setIsAddWargaOpen(true);
            }}
            onEditWarga={handleEditResident}
            onDeleteWarga={handleDeleteResident}
          />
        )}

        {activeTab === 'keuangan' && (
          <KeuanganTab
            transactions={transactions}
            residents={residents}
            isAdminMode={true}
            onOpenAddTransaction={() => setIsAddTransaksiOpen(true)}
            onOpenCekIuran={() => setIsCekIuranOpen(true)}
            onDeleteTransaction={handleDeleteTransaction}
            onUpdateResidentPaymentStatus={handleUpdateResidentPaymentStatus}
            onAddTransaction={tx => {
              setTransactions(prev => [tx, ...prev]);
              showToast('Iuran warga berhasil dicatat ke Buku Kas RT.');
            }}
          />
        )}

        {activeTab === 'pengurus' && (
          <AdminPengurusTab
            officials={officials}
            onSaveOfficial={handleSaveOfficial}
            onDeleteOfficial={handleDeleteOfficial}
            onResetOfficials={handleResetOfficials}
          />
        )}

        {activeTab === 'kegiatan' && (
          <AdminKegiatanTab
            events={events}
            onSaveEvent={handleSaveEvent}
            onDeleteEvent={handleDeleteEvent}
            documentations={documentations}
            onSaveDocumentation={handleSaveDocumentation}
            onDeleteDocumentation={handleDeleteDocumentation}
          />
        )}

        {activeTab === 'pengaduan' && (
          <PengaduanTab
            complaints={complaints}
            isAdminMode={true}
            onOpenAddComplaint={() => setIsAddPengaduanOpen(true)}
            onUpdateComplaintStatus={handleUpdateComplaintStatus}
            onDeleteComplaint={handleDeleteComplaint}
          />
        )}

        {activeTab === 'administrasi' && (
          <AdministrasiTab
            residents={residents}
            letters={letters}
            onSaveLetter={handleSaveLetter}
            onDeleteLetter={handleDeleteLetter}
          />
        )}

        {activeTab === 'profil' && (
          <ProfilWilayahTab />
        )}
      </main>

      {/* Dock Navigasi Bawah Khusus Admin */}
      <AdminMobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        complaintCount={activeComplaintsCount}
        letterCount={letters.length}
        onOpenCekIuran={() => setIsCekIuranOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onLogoutAdmin={onLogoutAdmin}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center justify-center gap-1">
            <span>© 2026 Panel Pengurus RT 01 RW 12 Cluster Arcadia. Dikelola bersama dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
          <p className="text-slate-400">
            Perumahan Oma Indah Kapuk, Desa Suwayuwo, Sukorejo, Pasuruan
          </p>
        </div>
      </footer>

      {/* Modals Khusus Admin */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      <CekIuranModal
        isOpen={isCekIuranOpen}
        onClose={() => setIsCekIuranOpen(false)}
        residents={residents}
      />

      <AddWargaModal
        isOpen={isAddWargaOpen}
        onClose={() => {
          setIsAddWargaOpen(false);
          setResidentToEdit(null);
        }}
        onSave={handleSaveResident}
        residentToEdit={residentToEdit}
      />

      <AddTransaksiModal
        isOpen={isAddTransaksiOpen}
        onClose={() => setIsAddTransaksiOpen(false)}
        onSave={handleSaveTransaction}
      />

      <AddPengaduanModal
        isOpen={isAddPengaduanOpen}
        onClose={() => setIsAddPengaduanOpen(false)}
        onSave={handleSaveComplaint}
      />
    </div>
  );
};
