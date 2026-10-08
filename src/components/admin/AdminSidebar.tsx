import React from 'react';
import {
  LayoutDashboard,
  Users,
  Award,
  Wallet,
  CalendarDays,
  MessageSquareWarning,
  Building2,
  FileText,
  PhoneCall,
  BookOpen,
  LogOut,
  Sparkles,
  CreditCard,
  Shield,
  X,
  Megaphone,
} from 'lucide-react';

export type AdminNavTab =
  | 'beranda'
  | 'pengumuman'
  | 'warga'
  | 'keuangan'
  | 'pengurus'
  | 'kegiatan'
  | 'pengaduan'
  | 'administrasi'
  | 'profil'
  | 'darurat'
  | 'tatatertib';

interface AdminSidebarProps {
  activeTab: AdminNavTab;
  setActiveTab: (tab: AdminNavTab) => void;
  complaintCount: number;
  letterCount?: number;
  onOpenCekIuran?: () => void;
  onLogoutAdmin: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface AdminNavItemDef {
  id: AdminNavTab;
  label: string;
  sublabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  activeBg: string;
  activeText: string;
  iconColor: string;
  badge?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  complaintCount,
  letterCount = 0,
  onOpenCekIuran,
  onLogoutAdmin,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const navItems: AdminNavItemDef[] = [
    {
      id: 'beranda',
      label: 'Beranda',
      sublabel: 'Dashboard Pengurus',
      icon: LayoutDashboard,
      color: 'from-emerald-500 to-teal-600',
      activeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      activeText: 'text-emerald-700',
      iconColor: 'text-emerald-600',
    },
    {
      id: 'pengumuman',
      label: 'Pengumuman RT',
      sublabel: 'Tambah & Edit Warta',
      icon: Megaphone,
      color: 'from-amber-500 to-orange-600',
      activeBg: 'bg-amber-50 border-amber-200 text-amber-800',
      activeText: 'text-amber-700',
      iconColor: 'text-amber-600',
    },
    {
      id: 'warga',
      label: 'Data Warga',
      sublabel: 'Kependudukan & KK',
      icon: Users,
      color: 'from-sky-500 to-blue-600',
      activeBg: 'bg-sky-50 border-sky-200 text-sky-800',
      activeText: 'text-sky-700',
      iconColor: 'text-sky-600',
    },
    {
      id: 'keuangan',
      label: 'Keuangan',
      sublabel: 'Kas & Iuran Warga',
      icon: Wallet,
      color: 'from-emerald-600 to-green-600',
      activeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      activeText: 'text-emerald-700',
      iconColor: 'text-emerald-600',
    },
    {
      id: 'pengurus',
      label: 'Pengurus RT',
      sublabel: 'Bagan & Tupoksi 2026-2031',
      icon: Award,
      color: 'from-amber-500 to-orange-600',
      activeBg: 'bg-amber-50 border-amber-200 text-amber-800',
      activeText: 'text-amber-700',
      iconColor: 'text-amber-600',
    },
    {
      id: 'kegiatan',
      label: 'Kegiatan Lingkungan',
      sublabel: 'Agenda & Dokumentasi Foto',
      icon: CalendarDays,
      color: 'from-violet-500 to-purple-600',
      activeBg: 'bg-violet-50 border-violet-200 text-violet-800',
      activeText: 'text-violet-700',
      iconColor: 'text-violet-600',
    },
    {
      id: 'pengaduan',
      label: 'Pengaduan Warga',
      sublabel: 'Tiket Aduan & Solusi',
      icon: MessageSquareWarning,
      color: 'from-rose-500 to-pink-600',
      activeBg: 'bg-rose-50 border-rose-200 text-rose-800',
      activeText: 'text-rose-700',
      iconColor: 'text-rose-600',
      badge: complaintCount > 0 ? complaintCount : undefined,
    },
    {
      id: 'administrasi',
      label: 'Surat & Administrasi',
      sublabel: 'Pengantar RT & Tamu',
      icon: FileText,
      color: 'from-teal-500 to-cyan-600',
      activeBg: 'bg-teal-50 border-teal-200 text-teal-800',
      activeText: 'text-teal-700',
      iconColor: 'text-teal-600',
      badge: letterCount > 0 ? letterCount : undefined,
    },
    {
      id: 'profil',
      label: 'Profil Wilayah',
      sublabel: 'Foto Area & Peta Maps',
      icon: Building2,
      color: 'from-blue-500 to-indigo-600',
      activeBg: 'bg-blue-50 border-blue-200 text-blue-800',
      activeText: 'text-blue-700',
      iconColor: 'text-blue-600',
    },
    {
      id: 'darurat',
      label: 'Nomor Darurat',
      sublabel: 'Tambah & Edit Kontak',
      icon: PhoneCall,
      color: 'from-red-500 to-rose-600',
      activeBg: 'bg-rose-50 border-rose-200 text-rose-800',
      activeText: 'text-rose-700',
      iconColor: 'text-rose-600',
    },
    {
      id: 'tatatertib',
      label: 'Tata Tertib',
      sublabel: 'Tambah & Edit Peraturan',
      icon: BookOpen,
      color: 'from-teal-600 to-emerald-600',
      activeBg: 'bg-teal-50 border-teal-200 text-teal-800',
      activeText: 'text-teal-700',
      iconColor: 'text-teal-600',
    },
  ];

  const handleItemClick = (id: AdminNavTab) => {
    setActiveTab(id);
    if (onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between overflow-y-auto">
      {/* Top Header Identity */}
      <div>
        <div className="p-4 sm:p-5 border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-emerald-400 to-teal-400 p-0.5 shadow-md shrink-0">
              <div className="w-full h-full rounded-[14px] bg-slate-900 flex flex-col items-center justify-center text-center p-0.5">
                <span className="block text-[8px] font-black uppercase text-amber-300 leading-tight">
                  RT 01
                </span>
                <span className="block text-xs font-black text-white leading-tight">
                  RW 12
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-md">
                  Panel Admin
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <h2 className="text-sm font-black text-slate-900 leading-tight mt-0.5">
                Cluster Arcadia
              </h2>
              <p className="text-[10px] text-slate-500 font-medium">
                Oma Indah Kapuk, Pasuruan
              </p>
            </div>
          </div>

          {/* Close button for mobile */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Item List */}
        <div className="p-3 space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 py-1.5 block">
            Menu Utama Pengurus
          </span>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border text-left transition-all duration-150 cursor-pointer ${
                  isActive
                    ? `${item.activeBg} shadow-xs font-bold`
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`p-2 rounded-xl transition-all ${
                      isActive
                        ? `bg-gradient-to-r ${item.color} text-white shadow-xs`
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                  </span>
                  <div className="min-w-0 text-left">
                    <span className="block text-xs sm:text-sm font-extrabold truncate">
                      {item.label}
                    </span>
                    {item.sublabel && (
                      <span className="block text-[10px] text-slate-400 font-normal truncate">
                        {item.sublabel}
                      </span>
                    )}
                  </div>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white shadow-2xs shrink-0">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-3 border-t border-slate-100 space-y-2 mt-4 bg-slate-50/50">
        {onOpenCekIuran && (
          <button
            onClick={() => {
              if (onCloseMobile) onCloseMobile();
              onOpenCekIuran();
            }}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-50 text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cek Status Iuran Warga</span>
          </button>
        )}

        <div className="p-3 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-bold text-slate-800 truncate">
                Bambang Prasetyo
              </span>
              <span className="block text-[10px] text-slate-400 truncate">
                Ketua RT 01
              </span>
            </div>
          </div>

          <button
            onClick={onLogoutAdmin}
            title="Keluar dari Panel Admin"
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Left Sidebar (Always Visible on md: and up) */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 h-screen sticky top-0 bg-white border-r border-emerald-100 shadow-sm shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Slide out from Left) */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs md:hidden animate-in fade-in duration-200"
          onClick={onCloseMobile}
        >
          <aside
            className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-2xl border-r border-slate-200 animate-in slide-in-from-left duration-300 z-50 flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
