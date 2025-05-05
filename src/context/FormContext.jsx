// src/context/FormContext.jsx
import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // === Informasi Umum ===
    nomor_fpp: "",
    tanggal_fpp: "",

    // === Resume Pengaduan ===
    sumber_pengaduan: "",
    info_tambahan: "",
    resume_1: "",
    resume_2: "",
    resume_3: "",

    // === Identitas Terlapor ===
    nama_terlapor: "",
    nip_terlapor: "",
    jabatan_terlapor: "",
    unit_terlapor: "",

    // === Identitas Pelapor ===
    nama_pelapor: "",
    alamat_pelapor: "",
    telepon_pelapor: "",

    // === Analisis Pelanggaran ===
    isi_pengaduan: "",
    dugaan_pelanggaran: "",
    pasal_dan_huruf: "",
    isi_pasal_dan_huruf: "",

    // === Kriteria Pelanggaran ===
    kriteria_citra: false,
    kriteria_strategis: false,
    kriteria_nasional: false,
    penjelasan_dampak_citra: "",
    penjelasan_dampak_strategis: "",
    penjelasan_dampak_nasional: "",

    // === Pulbaket ===
    pulbaket_status: "",
    nomor_uptp: "",
    tanggal_uptp: "",
    nomor_lhpbk: "",
    tanggal_lhpbk: "",
    kesimpulan_lhpbk: "",
    hasil_pulbaket: "",

    // === Kriteria Investigasi ===
    inv_kriteria_citra: false,
    inv_kriteria_strategis: false,
    inv_kriteria_nasional: false,
    inv_penjelasan_citra: "",
    inv_penjelasan_strategis: "",
    inv_penjelasan_nasional: "",

    // === Data Tersangka ===
    tersangka: [
      {
        nama: "",
        nip: "",
        jabatan: "",
        unit: ""
      }
    ],

    // === Dugaan Investigasi ===
    dugaan_pelanggaran_inves: "",
    tempat_waktu_pelanggaran: "",

    // === Kriteria Penerusan ===
    jenis_penerusan: "",
    kanwil_litdal: "",
    atsung_terlapor: "",

    // === Usul Tindak Lanjut ===
    tindak_lanjut: "",
    alasan_unit_terkait: "",
    nama_unit_terkait: "",

    // === Penandatangan ===
    kepala_seksi: "",
    pelaksana_analisis: "",
    kasubdit: ""
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
