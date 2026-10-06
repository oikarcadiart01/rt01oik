import React, { useState, useEffect } from 'react';
import {
  Resident,
  Official,
  CashTransaction,
  CommunityEvent,
  Complaint,
  RTAnnouncement,
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
import { UserPortal } from './components/user/UserPortal';
import { AdminPortal } from './components/admin/AdminPortal';
import { Check } from 'lucide-react';

export default function App() {
  // Admin / Pengurus Mode toggle
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    return localStorage.getItem('rt01_admin_mode') === 'true';
  });

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

  const [officials, setOfficials] = useState<Official[]>(() => {
    const saved = localStorage.getItem('rt01_officials');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    return INITIAL_OFFICIALS;
  });

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
    localStorage.setItem('rt01_officials', JSON.stringify(officials));
  }, [officials]);

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

  const activeComplaintsCount = complaints.filter(
    c => c.status === 'Menunggu' || c.status === 'Diproses'
  ).length;

  const handleLogoutAdmin = () => {
    setIsAdminMode(false);
    showToast('Telah keluar dari Mode Admin.');
  };

  const handleLoginAdminSuccess = () => {
    setIsAdminMode(true);
    showToast('Selamat datang! Berhasil masuk sebagai Admin Pengurus RT 01.');
  };

  return (
    <div className="font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-5 right-5 z-50 bg-gradient-to-r from-slate-900 to-emerald-950 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-5 border border-emerald-500/40">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Strict Source Code Separation: User Portal vs Admin Portal */}
      {isAdminMode ? (
        <AdminPortal
          announcements={announcements}
          officials={officials}
          events={events}
          residents={residents}
          transactions={transactions}
          complaints={complaints}
          letters={letters}
          saldoKas={saldoKas}
          onLogoutAdmin={handleLogoutAdmin}
          showToast={showToast}
          setResidents={setResidents}
          setOfficials={setOfficials}
          setTransactions={setTransactions}
          setEvents={setEvents}
          setComplaints={setComplaints}
          setLetters={setLetters}
        />
      ) : (
        <UserPortal
          announcements={announcements}
          officials={officials}
          events={events}
          residents={residents}
          saldoKas={saldoKas}
          aduanAktif={activeComplaintsCount}
          onLoginSuccess={handleLoginAdminSuccess}
        />
      )}
    </div>
  );
}
