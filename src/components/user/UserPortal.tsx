import React, { useState } from 'react';
import {
  RTAnnouncement,
  Official,
  CommunityEvent,
  Resident,
} from '../../types';
import { UserHeaderBanner } from './UserHeaderBanner';
import { UserNavbar, UserNavTab } from './UserNavbar';
import { UserMobileNav } from './UserMobileNav';
import { UserBerandaTab } from './UserBerandaTab';
import { UserPengurusTab } from './UserPengurusTab';
import { UserKegiatanTab } from './UserKegiatanTab';
import { UserProfilTab } from './UserProfilTab';
import { EmergencyModal } from '../modals/EmergencyModal';
import { AdminLoginModal } from '../modals/AdminLoginModal';
import { Heart } from 'lucide-react';

interface UserPortalProps {
  announcements: RTAnnouncement[];
  officials: Official[];
  events: CommunityEvent[];
  residents: Resident[];
  saldoKas: number;
  aduanAktif: number;
  onLoginSuccess: () => void;
}

export const UserPortal: React.FC<UserPortalProps> = ({
  announcements,
  officials,
  events,
  residents,
  saldoKas,
  aduanAktif,
  onLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<UserNavTab>('beranda');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  const totalJiwa = residents.reduce((sum, r) => sum + r.jumlahAnggota, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/60 via-slate-50 to-amber-50/40 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header Banner Khusus Warga */}
      <UserHeaderBanner
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        totalWarga={totalJiwa}
        totalKK={residents.length}
        saldoKas={saldoKas}
        aduanAktif={aduanAktif}
      />

      {/* Navigasi Khusus Warga */}
      <UserNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 pb-24 md:pb-8">
        {activeTab === 'beranda' && (
          <UserBerandaTab
            announcements={announcements}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
          />
        )}

        {activeTab === 'pengurus' && (
          <UserPengurusTab officials={officials} />
        )}

        {activeTab === 'kegiatan' && (
          <UserKegiatanTab events={events} />
        )}

        {activeTab === 'profil' && (
          <UserProfilTab />
        )}
      </main>

      {/* Fixed Bottom Dock Nav Khusus Mobile */}
      <UserMobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
      />

      {/* Footer Khusus Warga */}
      <footer className="bg-white border-t border-emerald-100 py-6 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center justify-center gap-1">
            <span>© 2026 Paguyuban Warga Cluster Arcadia RT 01 RW 12. Dikelola bersama dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
          <p className="text-slate-400">
            Perumahan Oma Indah Kapuk, Desa Suwayuwo, Sukorejo, Pasuruan
          </p>
        </div>
      </footer>

      {/* Modals */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={onLoginSuccess}
      />
    </div>
  );
};
