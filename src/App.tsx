import React, { useState, useEffect } from 'react';
import {
  Resident,
  Official,
  CashTransaction,
  CommunityEvent,
  Complaint,
  RTAnnouncement,
  OfficialLetter,
  EventDocumentation,
} from './types';
import {
  INITIAL_RESIDENTS,
  INITIAL_OFFICIALS,
  INITIAL_TRANSACTIONS,
  INITIAL_EVENTS,
  INITIAL_COMPLAINTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_LETTERS,
  INITIAL_DOCUMENTATIONS,
} from './data/initialData';
import { UserPortal } from './components/user/UserPortal';
import { AdminPortal } from './components/admin/AdminPortal';
import {
  testConnection,
  subscribeCollection,
  seedIfEmpty,
} from './services/firebase';
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
          const valid = parsed.filter(
            (o: Official) => o && typeof o.nama === 'string' && o.nama.trim().length > 0
          );
          if (valid.length > 0) {
            return valid;
          }
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

  const [announcements, setAnnouncements] = useState<RTAnnouncement[]>(() => {
    const saved = localStorage.getItem('rt01_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [documentations, setDocumentations] = useState<EventDocumentation[]>(() => {
    const saved = localStorage.getItem('rt01_documentation');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // fallback
      }
    }
    return INITIAL_DOCUMENTATIONS;
  });

  // Real-time Firestore Subscriptions & Seeding
  useEffect(() => {
    // Validate connection to Firestore
    testConnection();

    // Seed collections with initial rich demo data if cloud collection is empty
    seedIfEmpty('residents', INITIAL_RESIDENTS);
    seedIfEmpty('officials', INITIAL_OFFICIALS);
    seedIfEmpty('transactions', INITIAL_TRANSACTIONS);
    seedIfEmpty('events', INITIAL_EVENTS);
    seedIfEmpty('complaints', INITIAL_COMPLAINTS);
    seedIfEmpty('letters', INITIAL_LETTERS);
    seedIfEmpty('announcements', INITIAL_ANNOUNCEMENTS);
    seedIfEmpty('documentation', INITIAL_DOCUMENTATIONS);

    // Subscribe to collections
    const unsubResidents = subscribeCollection<Resident>('residents', data => {
      if (data && data.length > 0) setResidents(data);
    });

    const unsubOfficials = subscribeCollection<Official>('officials', data => {
      if (data && data.length > 0) {
        const valid = data
          .filter(o => o && typeof o.nama === 'string' && o.nama.trim().length > 0)
          .sort((a, b) => (a.urutan || 99) - (b.urutan || 99));
        if (valid.length > 0) setOfficials(valid);
      }
    });

    const unsubTransactions = subscribeCollection<CashTransaction>('transactions', data => {
      if (data && data.length > 0) {
        data.sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
        setTransactions(data);
      }
    });

    const unsubEvents = subscribeCollection<CommunityEvent>('events', data => {
      if (data && data.length > 0) {
        data.sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
        setEvents(data);
      }
    });

    const unsubComplaints = subscribeCollection<Complaint>('complaints', data => {
      if (data && data.length > 0) {
        data.sort((a, b) => new Date(b.tanggalLapor).getTime() - new Date(a.tanggalLapor).getTime());
        setComplaints(data);
      }
    });

    const unsubLetters = subscribeCollection<OfficialLetter>('letters', data => {
      if (data && data.length > 0) {
        data.sort((a, b) => new Date(b.tanggalSurat).getTime() - new Date(a.tanggalSurat).getTime());
        setLetters(data);
      }
    });

    const unsubAnnounce = subscribeCollection<RTAnnouncement>('announcements', data => {
      if (data && data.length > 0) {
        data.sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
        setAnnouncements(data);
      }
    });

    const unsubDocs = subscribeCollection<EventDocumentation>('documentation', data => {
      if (data && data.length > 0) {
        data.sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
        setDocumentations(data);
      }
    });

    return () => {
      unsubResidents();
      unsubOfficials();
      unsubTransactions();
      unsubEvents();
      unsubComplaints();
      unsubLetters();
      unsubAnnounce();
      unsubDocs();
    };
  }, []);

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
    localStorage.setItem('rt01_documentation', JSON.stringify(documentations));
  }, [documentations]);

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
          documentations={documentations}
          setDocumentations={setDocumentations}
        />
      ) : (
        <UserPortal
          announcements={announcements}
          officials={officials}
          events={events}
          residents={residents}
          saldoKas={saldoKas}
          documentations={documentations}
          onLoginSuccess={handleLoginAdminSuccess}
        />
      )}
    </div>
  );
}
