import React from 'react';
import { EMERGENCY_CONTACTS } from '../../data/initialData';
import { EmergencyContact } from '../../types';
import { X, PhoneCall, ShieldAlert, AlertOctagon } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts?: EmergencyContact[];
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  contacts = EMERGENCY_CONTACTS,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-rose-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-rose-700 to-red-800 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <ShieldAlert className="w-5 h-5 text-rose-100" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Nomor Darurat & Layanan Cepat</h3>
              <p className="text-xs text-rose-100">
                Wilayah Sukorejo & Desa Suwayuwo, Kab. Pasuruan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 max-h-[70vh] overflow-y-auto space-y-3">
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-xs text-rose-900">
            <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0" />
            <span>
              Dalam keadaan darurat keamanan atau medis di area Cluster Arcadia, segera hubungi <strong>Pos Satpam Jaga</strong> atau <strong>Bhabinkamtibmas / Polsek Sukorejo</strong> di bawah ini.
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {contacts.map((item, index) => (
              <div
                key={index}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 px-2 rounded-lg transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{item.nama}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {item.kategori}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{item.keterangan}</p>
                </div>

                <a
                  href={`tel:${item.nomor.replace(/[^\d+]/g, '')}`}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  {item.nomor}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
