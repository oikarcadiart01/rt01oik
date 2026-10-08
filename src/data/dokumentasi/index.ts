import { EventDocumentation } from '../../types';
import { DOKUMENTASI_KERJA_BAKTI_2026_09_13 } from './Kerja_Bakti_Massal_Lingkungan_2026-09-13';
import { DOKUMENTASI_HUT_RI_2026_08_17 } from './Peringatan_HUT_Kemerdekaan_RI_ke-81_2026-08-17';
import { DOKUMENTASI_SISKAMLING_2026_10_03 } from './Siskamling_dan_Ronda_Malam_2026-10-03';
import { DOKUMENTASI_PJU_2026_06_21 } from './Pemasangan_Lampu_PJU_dan_Pos_Kamling_2026-06-21';

export * from './Kerja_Bakti_Massal_Lingkungan_2026-09-13';
export * from './Peringatan_HUT_Kemerdekaan_RI_ke-81_2026-08-17';
export * from './Siskamling_dan_Ronda_Malam_2026-10-03';
export * from './Pemasangan_Lampu_PJU_dan_Pos_Kamling_2026-06-21';

/**
 * Daftar folder dokumentasi kegiatan lingkungan RT 01 RW 12 Cluster Arcadia.
 * Setiap folder diberi nama berformat: <nama kegiatan>_<tanggal>
 */
export const DOCUMENTATION_FOLDERS: EventDocumentation[] = [
  DOKUMENTASI_KERJA_BAKTI_2026_09_13,
  DOKUMENTASI_HUT_RI_2026_08_17,
  DOKUMENTASI_SISKAMLING_2026_10_03,
  DOKUMENTASI_PJU_2026_06_21,
];
