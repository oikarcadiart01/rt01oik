import React from 'react';
import { EMERGENCY_CONTACTS } from '../../data/initialData';
import {
  MapPin,
  Shield,
  FileText,
  Clock,
  Trash2,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';

export const UserProfilTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Profile - Radiant Emerald & Sky Gradient */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-sky-500/15 rounded-3xl p-6 sm:p-8 border border-emerald-200/90 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs inline-block">
              Profil Lingkungan & Wilayah
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
              RT 01 RW 12 Cluster Arcadia
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl">
              Perumahan Oma Indah Kapuk, Desa Suwayuwo, Kecamatan Sukorejo, Kabupaten Pasuruan, Jawa Timur (Kode Pos 67161)
            </p>
          </div>

          <div className="flex items-center gap-3.5 bg-white/90 p-4 rounded-2xl border border-emerald-200 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="text-xs">
              <span className="font-extrabold text-slate-900 block text-xs sm:text-sm">Akses Strategis:</span>
              <span className="text-slate-600 font-medium">Poros Surabaya - Malang KM 48 Sukorejo</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-emerald-200/70 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-emerald-100 shadow-2xs space-y-1.5">
            <span className="font-extrabold text-slate-900 block text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Blok Hunian
            </span>
            <p className="text-slate-600 leading-relaxed font-medium">
              Terdiri dari 4 Blok (Blok A, Blok B, Blok C, Blok D) dengan total lebih dari 45 unit rumah hunian berkonsep klaster asri dan modern.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-teal-100 shadow-2xs space-y-1.5">
            <span className="font-extrabold text-slate-900 block text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
              Fasilitas Bersama
            </span>
            <p className="text-slate-600 leading-relaxed font-medium">
              Gerbang One-Gate System dengan Pos Satpam 24 Jam, Taman Bundaran, Balai/Gazebo Warga, Lampu PJU mandiri, dan Saluran Drainase Resapan.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-sky-100 shadow-2xs space-y-1.5">
            <span className="font-extrabold text-slate-900 block text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              Prinsip Paguyuban
            </span>
            <p className="text-slate-600 leading-relaxed font-medium">
              Mengedepankan asas kekeluargaan, kegotongroyongan, transparansi pengelolaan kas, serta kenyamanan dan keamanan bagi seluruh penghuni.
            </p>
          </div>
        </div>
      </div>

      {/* Tata Tertib & Peraturan Paguyuban */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <span className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md">
            <FileText className="w-6 h-6" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Tata Tertib & Peraturan Warga Cluster Arcadia
            </h3>
            <p className="text-xs text-slate-500">
              Disepakati bersama dalam Musyawarah Warga RT 01 RW 12 untuk ketenteraman bersama
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-5 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/60 to-white space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Shield className="w-5 h-5 text-blue-600 shrink-0" />
              <span>1. Keamanan & Ketertiban Tamu</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside font-medium leading-relaxed">
              <li>Pintu gerbang portal otomatis ditutup pukul 22.00 s.d. 05.00 WIB.</li>
              <li>Tamu yang berkunjung lebih dari 1x24 jam wajib melapor kepada Pengurus RT atau Pos Satpam.</li>
              <li>Batas kecepatan berkendara di seluruh jalan cluster maksimal <strong className="text-slate-800">20 km/jam</strong> demi keselamatan anak-anak.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 to-white space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Trash2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>2. Kebersihan Lingkungan & Sampah</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside font-medium leading-relaxed">
              <li>Sampah rumah tangga dimasukkan ke tempat sampah tertutup depan pagar masing-masing.</li>
              <li>Jadwal angkut sampah desa dilakukan setiap hari Selasa, Kamis, dan Sabtu pagi.</li>
              <li>Dilarang membakar sampah di halaman rumah yang menimbulkan polusi asap bagi tetangga.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50/60 to-white space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Clock className="w-5 h-5 text-amber-600 shrink-0" />
              <span>3. Jam Tenang & Renovasi Bangunan</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside font-medium leading-relaxed">
              <li>Jam istirahat dan ketenangan lingkungan berlaku mulai pukul 22.00 WIB.</li>
              <li>Pekerjaan renovasi rumah (tukang) hanya diizinkan Senin s.d. Sabtu pukul 08.00 - 17.00 WIB.</li>
              <li>Material pasir/batu tidak boleh menghalangi akses jalan warga lain lebih dari 3 hari.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50/60 to-white space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <CheckCircle2 className="w-5 h-5 text-rose-600 shrink-0" />
              <span>4. Kewajiban Iuran Bulanan Paguyuban</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside font-medium leading-relaxed">
              <li>Iuran wajib perumahan adalah sebesar <strong className="text-slate-900">Rp 100.000 / KK / Bulan</strong>.</li>
              <li>Iuran mencakup gaji satpam pos jaga 24 jam, retribusi sampah desa, dan PJU listrik.</li>
              <li>Pembayaran dilakukan paling lambat tanggal 10 setiap bulannya kepada Bendahara RT.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Direktori Nomor Darurat & Instansi Terkait */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-3 bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl shadow-md">
              <PhoneCall className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Direktori Kontak Cepat Wilayah Sukorejo
              </h3>
              <p className="text-xs text-slate-500">
                Kontak darurat kepolisian, medis, pemadam, dan perangkat desa Suwayuwo
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMERGENCY_CONTACTS.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl border border-slate-200 bg-white hover:border-emerald-300 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 inline-block mb-1.5 border border-slate-200">
                  {item.kategori}
                </span>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900">{item.nama}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.keterangan}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-slate-700">{item.nomor}</span>
                <a
                  href={`tel:${item.nomor.replace(/[^\d+]/g, '')}`}
                  className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors min-h-[38px]"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Panggil
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
