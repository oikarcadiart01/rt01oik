import React, { useState, useRef } from 'react';
import { EventDocumentation, DocumentationPhoto } from '../../types';
import { formatDateIndo } from '../../utils/formatters';
import { compressMultipleImages } from '../../utils/imageUtils';
import {
  X,
  Folder,
  Calendar,
  MapPin,
  FileText,
  Upload,
  Trash2,
  ZoomIn,
  Download,
  Plus,
  Images,
  Clock,
  Sparkles,
} from 'lucide-react';

interface FolderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  folder: EventDocumentation | null;
  onUpdateFolder: (updated: EventDocumentation) => void;
  onDeleteFolder: (folderId: string) => void;
}

export const FolderDetailModal: React.FC<FolderDetailModalProps> = ({
  isOpen,
  onClose,
  folder,
  onUpdateFolder,
  onDeleteFolder,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<DocumentationPhoto | null>(null);
  const [isUploadingMore, setIsUploadingMore] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !folder) return null;

  // Add more photos directly into this folder
  const handleAddMorePhotos = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (fileArray.length === 0) return;

    setIsUploadingMore(true);
    try {
      const results = await compressMultipleImages(fileArray, 900, 900, 0.78);
      const newPhotos: DocumentationPhoto[] = results.map((item, idx) => ({
        id: `foto-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 5)}`,
        url: item.url,
        caption: '',
        uploadedAt: new Date().toISOString(),
      }));

      const updatedFolder: EventDocumentation = {
        ...folder,
        fotoList: [...folder.fotoList, ...newPhotos],
        updatedAt: new Date().toISOString(),
      };

      onUpdateFolder(updatedFolder);
    } catch (err) {
      console.error('Error adding more photos:', err);
    } finally {
      setIsUploadingMore(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Delete single photo from this folder
  const handleDeletePhoto = (photoId: string) => {
    const updatedFolder: EventDocumentation = {
      ...folder,
      fotoList: folder.fotoList.filter(p => p.id !== photoId),
      updatedAt: new Date().toISOString(),
    };
    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto(null);
    }
    onUpdateFolder(updatedFolder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden my-4 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header Folder Viewer */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-emerald-950 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                <Images className="w-3.5 h-3.5 text-slate-950" />
                Dokumentasi Foto Kegiatan
              </span>
              <span className="text-xs text-teal-300 font-medium">
                {folder.fotoList.length} Foto Tersimpan
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              {folder.kegiatanJudul}
            </h3>

            <div className="mt-1.5 flex items-center gap-2 text-xs text-teal-200">
              <Calendar className="w-3.5 h-3.5 text-teal-400" />
              <span>{formatDateIndo(folder.tanggal)}</span>
              {folder.lokasi && (
                <>
                  <span>•</span>
                  <span>{folder.lokasi}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Hidden Input for Adding More Photos */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={e => handleAddMorePhotos(e.target.files)}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingMore}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isUploadingMore ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span>Upload Foto Lagi</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Info Strip */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 shrink-0">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-slate-800">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>{formatDateIndo(folder.tanggal)}</span>
            </span>

            {folder.lokasi && (
              <span className="flex items-center gap-1.5 text-slate-700">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>{folder.lokasi}</span>
              </span>
            )}

            {folder.keterangan && (
              <span className="flex items-center gap-1.5 text-slate-600 max-w-md truncate">
                <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="truncate">{folder.keterangan}</span>
              </span>
            )}
          </div>

          <button
            onClick={() => {
              if (window.confirm(`Yakin ingin menghapus seluruh folder "${folder.folderName}" beserta isinya?`)) {
                onDeleteFolder(folder.id);
                onClose();
              }
            }}
            className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-bold hover:underline cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus Folder</span>
          </button>
        </div>

        {/* Gallery Content Area */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {folder.fotoList.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-3xl p-6">
              <Images className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="font-bold text-slate-700 text-sm">Belum Ada Foto di Folder Ini</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Klik tombol &quot;Upload Foto Lagi&quot; di atas untuk menambahkan foto dokumentasi ke folder ini.
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Pilih Foto Sekarang
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {folder.fotoList.map((foto, idx) => (
                <div
                  key={foto.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all group flex flex-col justify-between"
                >
                  <div
                    onClick={() => setSelectedPhoto(foto)}
                    className="relative aspect-square bg-slate-100 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={foto.url}
                      alt={foto.caption || `Dokumentasi ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                    />

                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <span className="p-2 bg-white/90 rounded-xl text-slate-900 shadow-md">
                        <ZoomIn className="w-5 h-5" />
                      </span>
                    </div>

                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-mono">
                      Foto #{idx + 1}
                    </span>
                  </div>

                  <div className="p-3 bg-white flex flex-col justify-between flex-1">
                    <p className="text-xs text-slate-700 font-medium line-clamp-2 min-h-[32px]">
                      {foto.caption || <span className="text-slate-400 italic">Tanpa keterangan</span>}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {foto.uploadedAt ? new Date(foto.uploadedAt).toLocaleDateString('id-ID') : '-'}
                      </span>

                      <button
                        onClick={() => handleDeletePhoto(foto.id)}
                        className="p-1 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus foto dari folder"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Lightbox Preview Satu Foto */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-60 bg-black/90 flex flex-col items-center justify-center p-4">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2.5 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-4xl max-h-[80vh] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption || 'Preview Foto'}
                className="max-h-[75vh] max-w-full object-contain mx-auto rounded-xl"
              />
            </div>

            {selectedPhoto.caption && (
              <div className="mt-4 bg-slate-900/80 backdrop-blur-md px-5 py-2.5 rounded-2xl text-center text-white text-xs sm:text-sm font-medium max-w-xl border border-white/20">
                {selectedPhoto.caption}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
