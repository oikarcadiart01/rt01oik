import * as XLSX from 'xlsx';

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDateIndo = (dateStr: string): string => {
  if (!dateStr) return '-';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
};

export const formatDateShort = (dateStr: string): string => {
  if (!dateStr) return '-';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
};

export const getMonthName = (monthIndex: number): string => {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  return months[monthIndex] || '';
};

export const exportToCSV = (filename: string, rows: Record<string, unknown>[]) => {
  if (!rows || !rows.length) return;
  const separator = ',';
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    '\n' +
    rows
      .map(row => {
        return keys
          .map(k => {
            const rawVal = row[k];
            let cellStr = '';
            if (rawVal === null || rawVal === undefined) {
              cellStr = '';
            } else if (rawVal instanceof Date) {
              cellStr = rawVal.toLocaleString();
            } else {
              cellStr = String(rawVal);
            }

            cellStr = cellStr.replace(/"/g, '""');
            if (cellStr.search(/("|,|\n)/g) >= 0) {
              cellStr = `"${cellStr}"`;
            }
            return cellStr;
          })
          .join(separator);
      })
      .join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportMultiSheetExcel = (
  filename: string,
  sheet1Name: string,
  sheet1Data: Record<string, unknown>[],
  sheet2Name: string,
  sheet2Data: Record<string, unknown>[]
) => {
  const wb = XLSX.utils.book_new();

  const ws1 = XLSX.utils.json_to_sheet(sheet1Data);
  const ws2 = XLSX.utils.json_to_sheet(sheet2Data);

  // Column widths for Sheet 1 (Data KK)
  ws1['!cols'] = [
    { wch: 6 },  // No
    { wch: 20 }, // Nomor KK
    { wch: 28 }, // Nama Kepala Keluarga
    { wch: 20 }, // NIK Kepala Keluarga
    { wch: 18 }, // Blok / No Rumah
    { wch: 16 }, // Status Tempat Tinggal
    { wch: 14 }, // Jumlah Jiwa
    { wch: 28 }, // Profesi / Pekerjaan
    { wch: 16 }, // No WhatsApp
    { wch: 15 }, // Tanggal Masuk
  ];

  // Column widths for Sheet 2 (Detail Penduduk Jiwa) with Kolom B = Nama Kepala Keluarga
  ws2['!cols'] = [
    { wch: 6 },  // Kolom A: No
    { wch: 28 }, // Kolom B: Nama Kepala Keluarga
    { wch: 28 }, // Kolom C: Nama Lengkap Anggota / Jiwa
    { wch: 22 }, // Kolom D: Hubungan dalam Keluarga
    { wch: 14 }, // Kolom E: Usia (Tahun)
    { wch: 18 }, // Kolom F: Blok / No Rumah
    { wch: 20 }, // Kolom G: Nomor Kartu Keluarga (KK)
    { wch: 20 }, // Kolom H: NIK
    { wch: 18 }, // Kolom I: Status Tempat Tinggal
    { wch: 24 }, // Kolom J: Pekerjaan / Profesi
    { wch: 16 }, // Kolom K: Kontak WhatsApp / No HP
  ];

  XLSX.utils.book_append_sheet(wb, ws1, sheet1Name);
  XLSX.utils.book_append_sheet(wb, ws2, sheet2Name);

  XLSX.writeFile(wb, `${filename}.xlsx`);
};
