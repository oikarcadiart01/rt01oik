import React, { useState, useEffect } from 'react';
import {
  Resident,
  Official,
  CashTransaction,
  CommunityEvent,
  Complaint,
  RTAnnouncement,
  ComplaintStatus,
  PaymentStatus,
  OfficialLetter,
} from './types';
import {
  INITIAL_RESIDENTS,
  INITIAL_OFFICIALS,
  INITIAL_TRANSACTIONS,
  INITIAL_EVENTS,
  INITIAL_COMPLAINTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_LETTERS,
} from './data/initialData';
import { HeaderBanner } from './components/HeaderBanner';
import { Navbar, NavTab } from './components/Navbar';
import { DashboardTab } from './components/tabs/DashboardTab';
import { WargaTab } from './components/tabs/WargaTab';
import { PengurusTab } from './components/tabs/PengurusTab';
import { KeuanganTab } from './components/tabs/KeuanganTab';
import { KegiatanTab } from './components/tabs/KegiatanTab';
import { PengaduanTab } from './components/tabs/PengaduanTab';
import { ProfilWilayahTab } from './components/tabs/ProfilWilayahTab';
import { AdministrasiTab } from './components/tabs/AdministrasiTab';
import { AddWargaModal } from './components/modals/AddWargaModal';
import { AddTransaksiModal } from './components/modals/AddTransaksiModal';
import { AddKegiatanModal } from './components/modals/AddKegiatanModal';
import { AddPengaduanModal } from './components/modals/AddPengaduanModal';
import { EmergencyModal } from './components/modals/EmergencyModal';
import { CekIuranModal } from './components/modals/CekIuranModal';
import { AdminLoginModal } from './components/modals/AdminLoginModal';
import { Check, ShieldCheck, Heart, LogOut } from 'lucide-react';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<NavTab>('beranda');

  // Admin / Pengurus Mode toggle
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    return localStorage.getItem('rt01_admin_mode') === 'true';
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // State with LocalStorage Persistence
  const [residents, setResidents] = useState<Resident[]>(() => {
    const saved = localStorage.getItem('rt01_residents');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 20) {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    return INITIAL_RESIDENTS;
  });

  const [officials] = useState<Official[]>(INITIAL_OFFICIALS);

  const [transactions, setTransactions] = useState<CashTransaction[]>(() => {
    const saved = localStorage.getItem('rt01_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [events, setEvents] = useState<CommunityEvent[]>(() => {
    const saved = localStorage.getItem('rt01_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem('rt01_complaints');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [letters, setLetters] = useState<OfficialLetter[]>(() => {
    const saved = localStorage.getItem('rt01_letters');
    return saved ? JSON.parse(saved) : INITIAL_LETTERS;
  });

  const [announcements] = useState<RTAnnouncement[]>(INITIAL_ANNOUNCEMENTS);

  // Modals state
  const [isAddWargaOpen, setIsAddWargaOpen] = useState(false);
  const [residentToEdit, setResidentToEdit] = useState<Resident | null>(null);

  const [isAddTransaksiOpen, setIsAddTransaksiOpen] = useState(false);
  const [isAddKegiatanOpen, setIsAddKegiatanOpen] = useState(false);
  const [isAddPengaduanOpen, setIsAddPengaduanOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isCekIuranOpen, setIsCekIuranOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('rt01_residents', JSON.stringify(residents));
  }, [residents]);

  useEffect(() => {
    localStorage.setItem('rt01_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('rt01_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('rt01_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('rt01_letters', JSON.stringify(letters));
  }, [letters]);

  useEffect(() => {
    localStorage.setItem('rt01_admin_mode', String(isAdminMode));
  }, [isAdminMode]);

  // Calculations for Banner
  const totalIncome = transactions
    .filter(t => t.jenis === 'Pemasukan')
    .reduce((sum, t) => sum + t.nominal, 0);

  const totalExpense = transactions
    .filter(t => t.jenis === 'Pengeluaran')
    .reduce((sum, t) => sum + t.nominal, 0);

  const saldoKas = totalIncome - totalExpense;

  const totalJiwa = residents.reduce((sum, r) => sum + r.jumlahAnggota, 0);
  const activeComplaintsCount = complaints.filter(
    c => c.status === 'Menunggu' || c.status === 'Diproses'
  ).length;

  // Handlers
  const handleSaveResident = (res: Resident) => {
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
    setResidents(prev => prev.filter(r => r.id !== id));
    showToast('Data warga berhasil dihapus dari direktori.');
  };

  const handleSaveTransaction = (tx: CashTransaction) => {
    setTransactions(prev => [tx, ...prev]);
    showToast(`Transaksi kas ${tx.jenis} sebesar Rp ${tx.nominal.toLocaleString('id-ID')} berhasil dicatat.`);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    showToast('Transaksi kas berhasil dihapus.');
  };

  // Iuran status update handler from Keuangan
  const handleUpdateResidentPaymentStatus = (
    residentId: string,
    newStatus: PaymentStatus,
    month: string
  ) => {
    const resident = residents.find(r => r.id === residentId);
    setResidents(prev =>
      prev.map(r =>
        r.id === residentId
          ? { ...r, statusIuran: newStatus, iuranTerakhirBulan: month }
          : r
      )
    );

    // If marked Lunas, also optionally record cash transaction
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
      setTransactions(prev => [newTx, ...prev]);
      showToast(`Iuran ${resident.blokRumah} ditandai LUNAS dan dicatat ke Buku Kas RT.`);
    } else {
      showToast(`Status iuran ${resident?.blokRumah || ''} diubah menjadi ${newStatus}.`);
    }
  };

  const handleSaveEvent = (ev: CommunityEvent) => {
    setEvents(prev => [ev, ...prev]);
    showToast(`Agenda kegiatan "${ev.judul}" berhasil dipublikasikan.`);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    showToast('Agenda kegiatan berhasil dihapus.');
  };

  const handleRsvpEvent = (eventId: string) => {
    setEvents(prev =>
      prev.map(ev =>
        ev.id === eventId ? { ...ev, rsvpCount: (ev.rsvpCount || 0) + 1 } : ev
      )
    );
    showToast('Terima kasih! Kehadiran Anda telah tercatat.');
  };

  const handleSaveComplaint = (cmp: Complaint) => {
    setComplaints(prev => [cmp, ...prev]);
    showToast(`Laporan aduan #${cmp.tiketNo} berhasil dikirim ke Pengurus RT.`);
  };

  const handleDeleteComplaint = (complaintId: string) => {
    setComplaints(prev => prev.filter(c => c.id !== complaintId));
    showToast('Tiket aduan telah dihapus.');
  };

  const handleUpdateComplaintStatus = (
    id: string,
    status: ComplaintStatus,
    tanggapan: string,
    petugas: string
  ) => {
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
    showToast('Status dan tanggapan pengurus berhasil diperbarui.');
  };

  const handleSaveLetter = (letter: OfficialLetter) => {
    setLetters(prev => [letter, ...prev]);
    showToast(`Surat Pengantar No. ${letter.nomorSurat} untuk ${letter.namaPemohon} berhasil diterbitkan.`);
  };

  const handleDeleteLetter = (id: string) => {
    setLetters(prev => prev.filter(l => l.id !== id));
    showToast('Arsip surat pengantar berhasil dihapus.');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-5 border border-slate-700">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner & Official Header */}
      <HeaderBanner
        isAdminMode={isAdminMode}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onLogoutAdmin={() => {
          setIsAdminMode(false);
          showToast('Telah keluar dari Mode Admin.');
        }}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenCekIuran={() => setIsCekIuranOpen(true)}
        onNavigateTab={tab => setActiveTab(tab as NavTab)}
        totalWarga={totalJiwa}
        totalKK={residents.length}
        saldoKas={saldoKas}
        aduanAktif={activeComplaintsCount}
      />

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        complaintCount={activeComplaintsCount}
        isAdminMode={isAdminMode}
        letterCount={letters.length}
      />

      {/* Admin Mode Badge Notice */}
      {isAdminMode && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 py-2 px-4 text-center text-xs font-semibold text-amber-950 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>
            Mode <strong>Admin Pengurus RT Aktif</strong> (Hak akses penuh: edit warga, persuratan & administrasi, sistem iuran, mutasi kas, hapus & update aduan).
          </span>
          <button
            onClick={() => {
              setIsAdminMode(false);
              showToast('Telah keluar dari Mode Admin.');
            }}
            className="inline-flex items-center gap-1 underline text-amber-950 font-bold ml-2 hover:text-amber-800 cursor-pointer"
          >
            <LogOut className="w-3 h-3" /> Keluar Admin
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'beranda' && (
          <DashboardTab
            announcements={announcements}
            residents={residents}
            transactions={transactions}
            events={events}
            complaints={complaints}
            setActiveTab={setActiveTab}
            onOpenAddComplaint={() => setIsAddPengaduanOpen(true)}
            onOpenCekIuran={() => setIsCekIuranOpen(true)}
            isAdminMode={isAdminMode}
            letterCount={letters.length}
          />
        )}

        {activeTab === 'warga' && (
          <WargaTab
            residents={residents}
            isAdminMode={isAdminMode}
            onOpenAddWarga={() => {
              setResidentToEdit(null);
              setIsAddWargaOpen(true);
            }}
            onEditWarga={handleEditResident}
            onDeleteWarga={handleDeleteResident}
          />
        )}

        {activeTab === 'pengurus' && (
          <PengurusTab officials={officials} isAdminMode={isAdminMode} />
        )}

        {activeTab === 'keuangan' && (
          <KeuanganTab
            transactions={transactions}
            residents={residents}
            isAdminMode={isAdminMode}
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

        {activeTab === 'kegiatan' && (
          <KegiatanTab
            events={events}
            isAdminMode={isAdminMode}
            onOpenAddEvent={() => setIsAddKegiatanOpen(true)}
            onDeleteEvent={handleDeleteEvent}
          />
        )}

        {activeTab === 'pengaduan' && (
          <PengaduanTab
            complaints={complaints}
            isAdminMode={isAdminMode}
            onOpenAddComplaint={() => setIsAddPengaduanOpen(true)}
            onUpdateComplaintStatus={handleUpdateComplaintStatus}
            onDeleteComplaint={handleDeleteComplaint}
          />
        )}

        {activeTab === 'profil' && (
          <ProfilWilayahTab />
        )}

        {activeTab === 'administrasi' && (
          <AdministrasiTab
            residents={residents}
            letters={letters}
            onSaveLetter={handleSaveLetter}
            onDeleteLetter={handleDeleteLetter}
          />
        )}
      </main>

      {/* Modals */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminMode(true);
          showToast('Selamat datang! Berhasil masuk sebagai Admin Pengurus RT 01.');
        }}
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

      <AddKegiatanModal
        isOpen={isAddKegiatanOpen}
        onClose={() => setIsAddKegiatanOpen(false)}
        onSave={handleSaveEvent}
      />

      <AddPengaduanModal
        isOpen={isAddPengaduanOpen}
        onClose={() => setIsAddPengaduanOpen(false)}
        onSave={handleSaveComplaint}
      />

      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      <CekIuranModal
        isOpen={isCekIuranOpen}
        onClose={() => setIsCekIuranOpen(false)}
        residents={residents}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="font-bold text-white block">
                Portal RT 01 RW 12 Cluster Arcadia
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Perumahan Oma Indah Kapuk, Desa Suwayuwo, Kec. Sukorejo, Kab. Pasuruan, Jawa Timur
              </p>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span>Periode Bakti 2024 - 2027</span>
              <span>•</span>
              <span>One Gate System 24 Jam</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> Guyub Rukun Warga
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
