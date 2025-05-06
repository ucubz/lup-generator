// src/context/FormContext.jsx
import React, { createContext, useState, useContext } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // === Data Utama FPP ===
    nomor_fpp: "",
    tahun_fpp: "",
    tanggal_fpp: "",
    pasal_pelanggaran: "",
    isi_pasal_pelanggaran: "",

    // === Resume Pengaduan ===
    sumber_pengaduan: "",
    info_tambahan_sumber_pengaduan: "",
    resume_pengaduan: "",

    // === Data Terlapor ===
    nama_terlapor_1: "",
    nip_terlapor_1: "",
    jabatan_terlapor_1: "",
    unit_kerja_terlapor: "",

    // === Data Pelapor ===
    nama_pelapor: "",
    alamat_pelapor: "",
    telepon_pelapor: "",

    // === Analisis Pengaduan ===
    centang_analisis_1: "",
    centang_analisis_2: "",

    // === Kriteria Pelanggaran ===
    cka_1: "",
    cka_2: "",
    cka_3: "",
    dampak_pmk: "",

    // === Pembentukan Tim Pulbaket ===
    centang_pulbaket_1: "",
    centang_pulbaket_2: "",
    hasil_pulbaket_mandiri: "",
    nomor_uptp: "",
    tanggal_uptp: "",
    nomor_lhpbk: "",
    tanggal_lhpbk: "",

    // === Kriteria Layak Investigasi ===
    cdi_1: "",
    cdi_2: "",
    cdi_3: "",
    dugaan_pelanggaran_inves: "",
    dampak_naik_inves: "",
    tempat_pelanggaran_inves: "",
    waktu_pelanggaran_inves: "",

    // === Data Tersangka ===
    nama_tersangka_1: "",
    nip_tersangka_1: "",
    jabatan_tersangka_1: "",
    unit_kerja_tersangka_1: "",

    // === Data Penerusan ===
    centang_penerusan_1: "",
    centang_penerusan_2: "",

    // === Usul Tindak Lanjut ===
    utl_1: "",
    utl_2: "",
    utl_3: "",
    utl_4: "",
    utl_5: "",
    kanwil_litdal: "",
    atsung_terlapor: "",
    alasan_penerusan_unit: "",
    unit_terkait: "",

    // === Penandatangan ===
    nama_kepala_seksi: "",
    pelaksana_analisis: "",
    nama_kasubdit: "",

    // === Data Tambahan ===
    data_terlapor_tambahan: [],
    data_pelapor_tambahan: [],
    data_tersangka_tambahan: []
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);