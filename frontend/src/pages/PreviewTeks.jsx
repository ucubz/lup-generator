// src/pages/PreviewTeks.jsx
import React from "react";
import { useFormContext } from "../context/FormContext";
import { useNavigate } from "react-router-dom";

export default function PreviewTeks() {
  const { formData } = useFormContext();
  const navigate = useNavigate();

  const formatNomorFPP = () => {
    if (!formData.nomor_fpp || !formData.tanggal_fpp) return "-";
    const year = new Date(formData.tanggal_fpp).getFullYear();
    return `FPP-${formData.nomor_fpp}/PJ.11/${year}`;
  };

  // Removed unused variable formattedNomorFPP

  const renderCentang = (group, labels) => {
    return labels.map((label, index) => {
      const tag = `${group}_${index + 1}`;
      return (
        <p key={tag}>
          {formData[tag] === "√" ? `✔ ${label}` : `✘ ${label}`}
        </p>
      );
    });
  };

  const submitForm = async () => {
    try {
      const response = await fetch("http://localhost:3001/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Gagal mengunduh dokumen");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Laporan_Hasil_Analisis.docx";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Terjadi kesalahan saat submit: " + error.message);
    }
  };

  return (
    <div className="prose max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Preview Hasil LHA</h2>

      <section className="mb-6">
        <h3 className="font-semibold">Data Utama FPP</h3>
        <p><strong>Nomor FPP:</strong> {formData.nomor_fpp || "-"}</p>
        <p><strong>Tahun FPP:</strong> {formData.tahun_fpp || "-"}</p>
        <p><strong>Tanggal FPP:</strong> {formData.tanggal_fpp || "-"}</p>
        <p><strong>Pasal Pelanggaran:</strong> {formData.pasal_pelanggaran || "-"}</p>
        <p><strong>Isi Pasal Pelanggaran:</strong> {formData.isi_pasal_pelanggaran || "-"}</p>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">Resume Pengaduan</h3>
        <p><strong>Sumber Pengaduan:</strong> {formData.sumber_pengaduan || "-"}</p>
        <p><strong>Info Tambahan Sumber Pengaduan:</strong> {formData.info_tambahan_sumber_pengaduan || "-"}</p>
        <p><strong>Resume Pengaduan:</strong> {formData.resume_pengaduan || "-"}</p>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">Data Terlapor</h3>
        <p><strong>Nama Terlapor:</strong> {formData.nama_terlapor_1 || "-"}</p>
        <p><strong>NIP Terlapor:</strong> {formData.nip_terlapor_1 || "-"}</p>
        <p><strong>Jabatan Terlapor:</strong> {formData.jabatan_terlapor_1 || "-"}</p>
        <p><strong>Unit Kerja Terlapor:</strong> {formData.unit_kerja_terlapor || "-"}</p>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">Data Pelapor</h3>
        <p><strong>Nama Pelapor:</strong> {formData.nama_pelapor || "-"}</p>
        <p><strong>Alamat Pelapor:</strong> {formData.alamat_pelapor || "-"}</p>
        <p><strong>Telepon Pelapor:</strong> {formData.telepon_pelapor || "-"}</p>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">Analisis Pengaduan</h3>
        {renderCentang("centang_analisis", [
          "Pelanggaran Kode Etik dan/atau Disiplin",
          "Bukan Pelanggaran Kode Etik dan/atau Disiplin",
        ])}
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">Kriteria Pelanggaran</h3>
        {renderCentang("cka", [
          "Berdampak pada Citra DJP",
          "Bernilai Strategis",
          "Berskala Nasional",
        ])}
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">Pembentukan Tim Pulbaket</h3>
        {renderCentang("centang_pulbaket", [
          "Ya, Bentuk Tim Pulbaket",
          "Tidak, Bentuk Tim Pulbaket",
        ])}
        <p><strong>Hasil Pulbaket Mandiri:</strong> {formData.hasil_pulbaket_mandiri || "-"}</p>
        <p><strong>Nomor UPTP:</strong> {formData.nomor_uptp || "-"}</p>
        <p><strong>Tanggal UPTP:</strong> {formData.tanggal_uptp || "-"}</p>
        <p><strong>Nomor LHPBK:</strong> {formData.nomor_lhpbk || "-"}</p>
        <p><strong>Tanggal LHPBK:</strong> {formData.tanggal_lhpbk || "-"}</p>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">Kriteria Layak Investigasi</h3>
        {renderCentang("cdi", [
          "Berdampak terhadap Citra DJP",
          "Bernilai Strategis",
          "Berskala Nasional",
        ])}
        <p><strong>Dugaan Pelanggaran Investigasi:</strong> {formData.dugaan_pelanggaran_inves || "-"}</p>
        <p><strong>Dampak Naik Investigasi:</strong> {formData.dampak_naik_inves || "-"}</p>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">Usul Tindak Lanjut</h3>
        {renderCentang("utl", [
          "Investigasi",
          "Penerusan Tim Litdal",
          "Penerusan ke Atsung",
          "Penerusan ke Unit Terkait",
          "Arsip",
        ])}
        <p><strong>Alasan Penerusan ke Unit:</strong> {formData.alasan_penerusan_unit || "-"}</p>
        <p><strong>Unit Terkait:</strong> {formData.unit_terkait || "-"}</p>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">Penandatangan</h3>
        <p><strong>Kepala Seksi:</strong> {formData.nama_kepala_seksi || "-"}</p>
        <p><strong>Pelaksana Analisis:</strong> {formData.pelaksana_analisis || "-"}</p>
        <p><strong>Kasubdit:</strong> {formData.nama_kasubdit || "-"}</p>
      </section>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          ← Kembali ke Form
        </button>
        <button
          onClick={submitForm}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit dan Unduh LHA
        </button>
      </div>
    </div>
  );
}
