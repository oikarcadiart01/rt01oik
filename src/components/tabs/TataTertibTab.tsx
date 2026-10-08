import React from 'react';
import {
  FileText,
  Shield,
  Trash2,
  Clock,
  CheckCircle2,
  Car,
  HeartHandshake,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Home,
  Check,
} from 'lucide-react';

export const TataTertibTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner - Radiant Emerald & Teal */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden border border-emerald-400/40">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-10 -bottom-10 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-amber-200 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Musyawarah Warga RT 01 RW 12 Cluster Arcadia</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-tight drop-shadow-xs">
            Tata Tertib & Peraturan Warga Cluster Arcadia
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-teal-50/95 leading-relaxed font-normal">
            Pedoman kerukunan, ketertiban, keamanan, dan kebersihan yang disepakati bersama oleh seluruh warga <strong>RT 01 RW 12 Cluster Arcadia, Perumahan Oma Indah Kapuk, Desa Suwayuwo, Sukorejo, Pasuruan</strong> demi mewujudkan hunian yang aman, nyaman, dan harmonis.
          </p>

          <div className="mt-4 pt-4 border-t border-teal-400/30 flex flex-wrap items-center gap-3 text-xs text-teal-100">
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>Berlaku untuk Warga Tetap, Kontrak & Tamu</span>
            </span>
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10 font-medium">
              <Shield className="w-3.5 h-3.5 text-cyan-300" />
              <span>Dijaga Bersama Pengurus RT & Pos Satpam 24 Jam</span>
            </span>
          </div>
        </div>
      </div>

      {/* Grid 6 Kategori Tata Tertib Lengkap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. Keamanan & Ketertiban Tamu */}
        <div className="bg-white rounded-3xl p-6 border border-blue-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 pb-3 border-b border-blue-100">
            <span className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-xs shrink-0">
              <Shield className="w-6 h-6" />
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                Pasal 1
              </span>
              <h3 className="font-extrabold text-slate-900 text-base mt-0.5">
                1. Keamanan & Ketertiban Tamu
              </h3>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600 font-medium leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Pintu gerbang utama (One-Gate System) portal otomatis ditutup pada pukul <strong>22.00 s.d. 05.00 WIB</strong> demi keamanan cluster.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Tamu atau kerabat yang berkunjung dan menginap lebih dari <strong>1x24 jam</strong> wajib melapor ke Pos Satpam atau Pengurus RT melalui Formulir Tamu Menginap.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Tamu yang memasuki cluster wajib menitipkan identitas (KTP/SIM) di Pos Satpam apabila berkunjung di atas pukul 22.00 WIB.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Bagi penghuni baru (warga tetap maupun kontrak/sewa) wajib melapor 1x24 jam kepada Ketua RT dengan menyerahkan fotokopi KTP dan Kartu Keluarga (KK).</span>
            </li>
          </ul>
        </div>

        {/* 2. Kebersihan Lingkungan & Pengelolaan Sampah */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 pb-3 border-b border-emerald-100">
            <span className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-xs shrink-0">
              <Trash2 className="w-6 h-6" />
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Pasal 2
              </span>
              <h3 className="font-extrabold text-slate-900 text-base mt-0.5">
                2. Kebersihan Lingkungan & Sampah
              </h3>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600 font-medium leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Setiap rumah wajib menyediakan tempat sampah bertutup di halaman/depan pagar masing-masing agar tidak diacak hewan liar.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Jadwal pengambilan sampah rumah tangga oleh petugas desa dilakukan secara rutin setiap hari <strong>Selasa, Kamis, dan Sabtu pagi</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Dilarang keras membakar sampah</strong> di pekarangan rumah atau jalan cluster yang menimbulkan polusi asap dan mengganggu tetangga.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Warga diharapkan aktif mengikuti kegiatan gotong royong kerja bakti massal kebersihan saluran air drainase lingkungan secara berkala.</span>
            </li>
          </ul>
        </div>

        {/* 3. Jam Tenang & Renovasi Bangunan */}
        <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 pb-3 border-b border-amber-100">
            <span className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl shadow-xs shrink-0">
              <Clock className="w-6 h-6" />
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                Pasal 3
              </span>
              <h3 className="font-extrabold text-slate-900 text-base mt-0.5">
                3. Jam Tenang & Renovasi Bangunan
              </h3>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600 font-medium leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Jam tenang lingkungan berlaku mulai pukul <strong>22.00 s.d. 06.00 WIB</strong>. Hindari aktivitas yang menimbulkan kebisingan tinggi pada jam istirahat.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Pekerjaan renovasi rumah (tukang, pembongkaran, pemotongan keramik) hanya diizinkan pada hari <strong>Senin s.d. Sabtu pukul 08.00 - 17.00 WIB</strong> (Hari Minggu libur kerja berisik).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Penumpukan material bangunan (pasir, batu bata, adukan semen) tidak boleh menghalangi akses jalan warga lain dan wajib dibersihkan maksimal 3 hari setelah diturunkan.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Renovasi yang memerlukan penutupan separuh jalan wajib meminta izin kepada Pengurus RT dan berkoordinasi dengan tetangga kanan-kiri.</span>
            </li>
          </ul>
        </div>

        {/* 4. Kewajiban Iuran Bulanan Paguyuban */}
        <div className="bg-white rounded-3xl p-6 border border-rose-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 pb-3 border-b border-rose-100">
            <span className="p-3 bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl shadow-xs shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                Pasal 4
              </span>
              <h3 className="font-extrabold text-slate-900 text-base mt-0.5">
                4. Kewajiban Iuran Bulanan Paguyuban
              </h3>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600 font-medium leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>Setiap Kepala Keluarga (KK) / unit rumah berpenghuni berkewajiban membayar iuran bulanan paguyuban sebesar <strong>Rp 100.000 / KK / Bulan</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>Iuran bulanan mencakup gaji satpam pos jaga 24 jam, retribusi sampah desa, penerangan jalan umum (listrik token PJU), perawatan taman & dana sosial warga.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>Pembayaran dilakukan paling lambat <strong>tanggal 10 setiap bulannya</strong> kepada Bendahara RT secara tunai atau transfer rekening kas RT.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>Laporan pembukuan kas bulanan dipublikasikan secara transparan 100% dan dapat dipantau oleh seluruh warga melalui portal RT.</span>
            </li>
          </ul>
        </div>

        {/* 5. Ketertiban Parkir & Batas Kecepatan */}
        <div className="bg-white rounded-3xl p-6 border border-violet-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 pb-3 border-b border-violet-100">
            <span className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl shadow-xs shrink-0">
              <Car className="w-6 h-6" />
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md">
                Pasal 5
              </span>
              <h3 className="font-extrabold text-slate-900 text-base mt-0.5">
                5. Ketertiban Parkir & Batas Kecepatan
              </h3>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600 font-medium leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
              <span>Batas kecepatan berkendara seluruh kendaraan bermotor di dalam area cluster maksimal <strong>20 km/jam</strong> demi keselamatan anak-anak dan pejalan kaki.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
              <span>Kendaraan mobil pribadi diutamakan diparkir di dalam carport atau garasi rumah masing-masing agar tidak mempersempit akses manuver jalan tetangga.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
              <span>Dilarang memarkir kendaraan di tikungan tajam, depan hidran/portal, atau tepat di depan gerbang pagar rumah warga lain tanpa izin.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
              <span>Kendaraan tamu yang menginap wajib diparkir dengan rapi dan berkoordinasi dengan petugas keamanan Pos Satpam.</span>
            </li>
          </ul>
        </div>

        {/* 6. Kerukunan, Toleransi & Penggunaan Fasilitas Bersama */}
        <div className="bg-white rounded-3xl p-6 border border-teal-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 pb-3 border-b border-teal-100">
            <span className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl shadow-xs shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                Pasal 6
              </span>
              <h3 className="font-extrabold text-slate-900 text-base mt-0.5">
                6. Kerukunan & Fasilitas Bersama
              </h3>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600 font-medium leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Warga saling menghormati perbedaan suku, agama, dan budaya serta menjunjung tinggi asas musyawarah untuk mufakat dalam menyelesaikan perbedaan.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Warga yang memelihara hewan peliharaan (kucing, anjing, burung) wajib menjaga kebersihan dan tidak membiarkan kotoran hewan di jalan umum atau halaman tetangga.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Penggunaan fasilitas bersama seperti Gazebo Warga, Bundaran Taman, dan inventaris RT (tenda, sound system, kursi) dikoordinasikan terlebih dahulu ke Pengurus RT.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Warga yang akan mengadakan acara hajatan/syukuran yang berpotensi ramai dimohon menyampaikan pemberitahuan ke tetangga sekitar dan Pengurus RT.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Catatan Sanksi & Pengaduan Pelanggaran */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-start gap-3.5">
          <span className="p-3 bg-amber-500 text-white rounded-2xl shadow-xs shrink-0 mt-0.5">
            <AlertCircle className="w-6 h-6" />
          </span>
          <div className="space-y-1.5">
            <h4 className="font-extrabold text-slate-900 text-base">
              Mekanisme Penyelesaian Masalah & Pelanggaran
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Pelanggaran terhadap tata tertib ini akan diselesaikan secara bertahap melalui pendekatan kekeluargaan dan musyawarah oleh Pengurus RT dan Tokoh Warga:
            </p>
            <ol className="list-decimal list-inside text-xs text-slate-700 space-y-1 pt-1 font-medium">
              <li><strong>Teguran Lisan Pertama:</strong> Pendekatan santun secara langsung oleh Ketua RT / Pengurus RT terkait.</li>
              <li><strong>Teguran Tertulis Kedua:</strong> Surat pemberitahuan resmi dari Pengurus RT jika pelanggaran berulang.</li>
              <li><strong>Musyawarah Paguyuban / Koordinasi Perangkat Desa:</strong> Apabila teguran tidak diindahkan dan mengganggu ketenteraman umum.</li>
            </ol>
            <p className="text-xs text-slate-500 pt-2">
              Untuk menyampaikan masukan atau keluhan lingkungan, warga dapat menggunakan menu <strong>Pengaduan Warga</strong> di portal RT 01.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
