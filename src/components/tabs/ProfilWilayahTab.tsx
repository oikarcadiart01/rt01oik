import React from 'react';
import { EMERGENCY_CONTACTS } from '../../data/initialData';
import {
  Building2,
  MapPin,
  Shield,
  FileText,
  Clock,
  Trash2,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export const ProfilWilayahTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Profile */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Profil Lingkungan & Wilayah
            </span>
            <h2 className="text-2xl font-black text-slate-950">
              RT 01 RW 12 Cluster Arcadia
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Perumahan Oma Indah Kapuk, Desa Suwayuwo, Kecamatan Sukorejo, Kabupaten Pasuruan, Jawa Timur (Kode Pos 67161)
            </p>
          </div>

          <div className="flex items-center gap-3 bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-200/80">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-slate-900 block">Akses Strategis:</span>
              <span className="text-slate-600">Poros Surabaya - Malang KM 48 Sukorejo</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-900 block text-sm">Blok Hunian:</span>
            <p className="text-slate-600">
              Terdiri dari 4 Blok (Blok A, Blok B, Blok C, Blok D) dengan total lebih dari 45 unit rumah hunian berkonsep klaster asri dan modern.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-900 block text-sm">Fasilitas Bersama:</span>
            <p className="text-slate-600">
              Gerbang One-Gate System dengan Pos Satpam 24 Jam, Taman Penghijauan Bundaran, Balai/Gazebo Warga, Lampu PJU mandiri, dan Saluran Drainase Resapan.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-900 block text-sm">Prinsip Paguyuban:</span>
            <p className="text-slate-600">
              Mengedepankan asas kekeluargaan, kegotongroyongan, transparansi pengelolaan kas, serta kenyamanan dan keamanan bagi seluruh penghuni.
            </p>
          </div>
        </div>
      </div>

      {/* Tata Tertib & Peraturan Paguyuban */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
            <FileText className="w-5 h-5 text-emerald-700" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Tata Tertib & Peraturan Warga Cluster Arcadia
            </h3>
            <p className="text-xs text-slate-500">
              Disepakati bersama dalam Musyawarah Warga RT 01 RW 12 untuk kenyamanan bersama
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Shield className="w-4 h-4 text-emerald-600" />
              1. Keamanan & Ketertiban Tamu
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
              <li>Pintu gerbang portal otomatis ditutup pukul 22.00 s.d. 05.00 WIB.</li>
              <li>Tamu yang berkunjung lebih dari 1x24 jam wajib melapor kepada Pengurus RT atau Pos Satpam.</li>
              <li>Batas kecepatan berkendara di seluruh jalan cluster maksimal <strong>20 km/jam</strong>.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Trash2 className="w-4 h-4 text-emerald-600" />
              2. Kebersihan Lingkungan & Sampah
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
              <li>Sampah rumah tangga dimasukkan ke tempat sampah tertutup depan pagar masing-masing.</li>
              <li>Jadwal angkut sampah desa dilakukan setiap hari Selasa, Kamis, dan Sabtu pagi.</li>
              <li>Dilarang membakar sampah di halaman rumah yang menimbulkan polusi asap bagi tetangga.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Clock className="w-4 h-4 text-emerald-600" />
              3. Jam Tenang & Renovasi Bangunan
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
              <li>Jam istirahat dan ketenangan lingkungan berlaku mulai pukul 22.00 WIB.</li>
              <li>Pekerjaan renovasi rumah (tukang) hanya diizinkan Senin s.d. Sabtu pukul 08.00 - 17.00 WIB.</li>
              <li>Material pasir/batu tidak boleh menghalangi akses jalan warga lain lebih dari 3 hari.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              4. Kewajiban Iuran Bulanan Paguyuban
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
              <li>Iuran wajib perumahan adalah sebesar <strong>Rp 100.000 / KK / Bulan</strong>.</li>
              <li>Iuran mencakup gaji satpam pos jaga 24 jam, retribusi sampah desa, dan PJU listrik.</li>
              <li>Pembayaran dilakukan paling lambat tanggal 10 setiap bulannya kepada Bendahara RT.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Direktori Nomor Darurat & Instansi Terkait */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-rose-100 text-rose-800 rounded-xl">
              <PhoneCall className="w-5 h-5 text-rose-700" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Direktori Kontak Cepat Wilayah Sukorejo
              </h3>
              <p className="text-xs text-slate-500">
                Kontak darurat kepolisian, medis, pemadam, dan perangkat desa Suwayuwo
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMERGENCY_CONTACTS.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between hover:bg-slate-50 transition-colors"
            >
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 inline-block mb-1">
                  {item.kategori}
                </span>
                <h4 className="font-bold text-sm text-slate-900">{item.nama}</h4>
                <p className="text-xs text-slate-500 mt-1">{item.keterangan}</p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-800">{item.nomor}</span>
                <a
                  href={`tel:${item.nomor.replace(/[^\d+]/g, '')}`}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3" /> Panggil
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
