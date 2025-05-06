// src/pages/FormIsian.jsx
import React from "react";
import { useFormContext } from "../context/FormContext";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

export default function FormIsian() {
  const handleChangeDynamic = (e, index, group) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedGroup = [...prev[group]];
      updatedGroup[index] = { ...updatedGroup[index], [name]: value };
      return { ...prev, [group]: updatedGroup };
    });
  };

  const handleAddDynamic = (group, newItem) => {
    setFormData((prev) => ({
      ...prev,
      [group]: [...prev[group], newItem],
    }));
  };
  const navigate = useNavigate();
  const { formData, setFormData } = useFormContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDropdownChange = (group, selected) => {
    setFormData((prev) => {
      const updatedGroup = Object.keys(prev)
        .filter((key) => key.startsWith(group))
        .reduce((acc, key) => {
          acc[key] = key === selected ? "√" : "";
          return acc;
        }, {});
      return { ...prev, ...updatedGroup };
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Form Isian</h1>

      {/* Data Utama FPP */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Data Utama FPP</h2>
        <InputField label="Nomor FPP" name="nomor_fpp" value={formData.nomor_fpp} onChange={handleChange} />
        <InputField label="Tahun FPP" name="tahun_fpp" value={formData.tahun_fpp} onChange={handleChange} />
        <InputField label="Tanggal FPP" name="tanggal_fpp" value={formData.tanggal_fpp} onChange={handleChange} />
        <InputField label="Pasal Pelanggaran" name="pasal_pelanggaran" value={formData.pasal_pelanggaran} onChange={handleChange} />
        <InputField label="Isi Pasal Pelanggaran" name="isi_pasal_pelanggaran" value={formData.isi_pasal_pelanggaran} onChange={handleChange} />
      </section>

      {/* Resume Pengaduan */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Resume Pengaduan</h2>
        <InputField label="Sumber Pengaduan" name="sumber_pengaduan" value={formData.sumber_pengaduan} onChange={handleChange} />
        <InputField label="Info Tambahan Sumber Pengaduan" name="info_tambahan_sumber_pengaduan" value={formData.info_tambahan_sumber_pengaduan} onChange={handleChange} />
        <InputField label="Resume Pengaduan" name="resume_pengaduan" value={formData.resume_pengaduan} onChange={handleChange} />
      </section>

      {/* Data Terlapor */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Data Terlapor</h2>
        <InputField label="Nama Terlapor" name="nama_terlapor_1" value={formData.nama_terlapor_1} onChange={handleChange} />
        <InputField label="NIP Terlapor" name="nip_terlapor_1" value={formData.nip_terlapor_1} onChange={handleChange} />
        <InputField label="Jabatan Terlapor" name="jabatan_terlapor_1" value={formData.jabatan_terlapor_1} onChange={handleChange} />
        <InputField label="Unit Kerja Terlapor" name="unit_kerja_terlapor" value={formData.unit_kerja_terlapor} onChange={handleChange} />
      </section>

      {/* Data Terlapor Tambahan */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Data Terlapor Tambahan</h2>
        {formData.data_terlapor_tambahan.map((terlapor, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mb-4">
            <InputField
              label="Nama Terlapor Tambahan"
              name="nama"
              value={terlapor.nama}
              onChange={(e) => handleChangeDynamic(e, index, "data_terlapor_tambahan")}
            />
            <InputField
              label="NIP"
              name="nip"
              value={terlapor.nip}
              onChange={(e) => handleChangeDynamic(e, index, "data_terlapor_tambahan")}
            />
            <InputField
              label="Jabatan"
              name="jabatan"
              value={terlapor.jabatan}
              onChange={(e) => handleChangeDynamic(e, index, "data_terlapor_tambahan")}
            />
            <InputField
              label="Unit Kerja"
              name="unit"
              value={terlapor.unit}
              onChange={(e) => handleChangeDynamic(e, index, "data_terlapor_tambahan")}
            />
          </div>
        ))}
        <button
          type="button"
          className="px-3 py-1 bg-green-600 text-white rounded"
          onClick={() => handleAddDynamic("data_terlapor_tambahan", { nama: "", nip: "", jabatan: "", unit: "" })}
        >
          + Tambah Terlapor
        </button>
      </section>

      {/* Data Pelapor */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Data Pelapor</h2>
        <InputField label="Nama Pelapor" name="nama_pelapor" value={formData.nama_pelapor} onChange={handleChange} />
        <InputField label="Alamat Pelapor" name="alamat_pelapor" value={formData.alamat_pelapor} onChange={handleChange} />
        <InputField label="Telepon Pelapor" name="telepon_pelapor" value={formData.telepon_pelapor} onChange={handleChange} />
      </section>
      
      {/* Data Pelapor Tambahan */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Data Pelapor Tambahan</h2>
        {formData.data_pelapor_tambahan.map((field, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mb-4">
            <InputField
              label="Nama Field"
              name="label"
              value={field.label}
              onChange={(e) => handleChangeDynamic(e, index, "data_pelapor_tambahan")}
            />
            <InputField
              label="Isi Field"
              name="value"
              value={field.value}
              onChange={(e) => handleChangeDynamic(e, index, "data_pelapor_tambahan")}
            />
          </div>
        ))}
        <button
          type="button"
          className="px-3 py-1 bg-green-600 text-white rounded"
          onClick={() => handleAddDynamic("data_pelapor_tambahan", { label: "", value: "" })}
        >
          + Tambah Field Pelapor
        </button>
      </section>

      {/* Analisis Pengaduan */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Analisis Pengaduan</h2>
        <select className="block w-full px-3 py-2 border" onChange={(e) => handleDropdownChange("centang_analisis", e.target.value)}>
          <option value="">Pilih</option>
          <option value="centang_analisis_1">Pelanggaran Kode Etik</option>
          <option value="centang_analisis_2">Bukan Pelanggaran Kode Etik</option>
        </select>
      </section>

      {/* Kriteria Pelanggaran */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Kriteria Pelanggaran</h2>
        <select className="block w-full px-3 py-2 border" onChange={(e) => handleDropdownChange("cka", e.target.value)}>
          <option value="">Pilih</option>
          <option value="cka_1">Citra DJP</option>
          <option value="cka_2">Strategis</option>
          <option value="cka_3">Nasional</option>
        </select>
        <InputField label="Dampak PMK" name="dampak_pmk" value={formData.dampak_pmk} onChange={handleChange} />
      </section>

      {/* Pembentukan Tim Pulbaket */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Tim Pulbaket</h2>
        <select className="block w-full px-3 py-2 border" onChange={(e) => handleDropdownChange("centang_pulbaket", e.target.value)}>
          <option value="">Pilih</option>
          <option value="centang_pulbaket_1">Ya</option>
          <option value="centang_pulbaket_2">Tidak</option>
        </select>
        <InputField label="Hasil Pulbaket Mandiri" name="hasil_pulbaket_mandiri" value={formData.hasil_pulbaket_mandiri} onChange={handleChange} />
        <InputField label="Nomor UPTP" name="nomor_uptp" value={formData.nomor_uptp} onChange={handleChange} />
        <InputField label="Tanggal UPTP" name="tanggal_uptp" value={formData.tanggal_uptp} onChange={handleChange} />
        <InputField label="Nomor LHPBK" name="nomor_lhpbk" value={formData.nomor_lhpbk} onChange={handleChange} />
        <InputField label="Tanggal LHPBK" name="tanggal_lhpbk" value={formData.tanggal_lhpbk} onChange={handleChange} />
      </section>

      {/* Kriteria Investigasi */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Kriteria Investigasi</h2>
        <select className="block w-full px-3 py-2 border" onChange={(e) => handleDropdownChange("cdi", e.target.value)}>
          <option value="">Pilih</option>
          <option value="cdi_1">Citra DJP</option>
          <option value="cdi_2">Strategis</option>
          <option value="cdi_3">Nasional</option>
        </select>
        <InputField label="Dugaan Pelanggaran" name="dugaan_pelanggaran_inves" value={formData.dugaan_pelanggaran_inves} onChange={handleChange} />
        <InputField label="Dampak Investigasi" name="dampak_naik_inves" value={formData.dampak_naik_inves} onChange={handleChange} />
        <InputField label="Tempat Pelanggaran" name="tempat_pelanggaran_inves" value={formData.tempat_pelanggaran_inves} onChange={handleChange} />
        <InputField label="Waktu Pelanggaran" name="waktu_pelanggaran_inves" value={formData.waktu_pelanggaran_inves} onChange={handleChange} />
      </section>
      
      {/* Data Tersangka */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Data Tersangka</h2>
        <InputField label="Nama Tersangka" name="nama_tersangka_1" value={formData.nama_tersangka_1} onChange={handleChange} />
        <InputField label="NIP Tersangka" name="nip_tersangka_1" value={formData.nip_tersangka_1} onChange={handleChange} />
        <InputField label="Jabatan Tersangka" name="jabatan_tersangka_1" value={formData.jabatan_tersangka_1} onChange={handleChange} />
        <InputField label="Unit Kerja Tersangka" name="unit_kerja_tersangka_1" value={formData.unit_kerja_tersangka_1} onChange={handleChange} />
        <InputField label="Tempat Pelanggaran Investigasi" name="tempat_pelanggaran_inves" value={formData.tempat_pelanggaran_inves} onChange={handleChange} />
        <InputField label="Waktu Pelanggaran Investigasi" name="waktu_pelanggaran_inves" value={formData.waktu_pelanggaran_inves} onChange={handleChange} />
      </section>

      {/* Data Tersangka Tambahan */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Data Tersangka Tambahan</h2>
        {formData.data_tersangka_tambahan.map((tersangka, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mb-4">
            <InputField
              label="Nama Tersangka Tambahan"
              name="nama"
              value={tersangka.nama}
              onChange={(e) => handleChangeDynamic(e, index, "data_tersangka_tambahan")}
            />
            <InputField
              label="NIP"
              name="nip"
              value={tersangka.nip}
              onChange={(e) => handleChangeDynamic(e, index, "data_tersangka_tambahan")}
            />
            <InputField
              label="Jabatan"
              name="jabatan"
              value={tersangka.jabatan}
              onChange={(e) => handleChangeDynamic(e, index, "data_tersangka_tambahan")}
            />
            <InputField
              label="Unit Kerja"
              name="unit"
              value={tersangka.unit}
              onChange={(e) => handleChangeDynamic(e, index, "data_tersangka_tambahan")}
            />
          </div>
        ))}
        <button
          type="button"
          className="px-3 py-1 bg-green-600 text-white rounded"
          onClick={() => handleAddDynamic("data_tersangka_tambahan", { nama: "", nip: "", jabatan: "", unit: "" })}
        >
          + Tambah Tersangka
        </button>
      </section>

      {/* Usul Tindak Lanjut */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Usul Tindak Lanjut</h2>
        <select className="block w-full px-3 py-2 border" onChange={(e) => handleDropdownChange("utl", e.target.value)}>
          <option value="">Pilih</option>
          <option value="utl_1">Investigasi</option>
          <option value="utl_2">Tim Litdal</option>
          <option value="utl_3">Atsung</option>
          <option value="utl_4">Unit Terkait</option>
          <option value="utl_5">Arsip</option>
        </select>
        <InputField label="Alasan Penerusan" name="alasan_penerusan_unit" value={formData.alasan_penerusan_unit} onChange={handleChange} />
        <InputField label="Unit Terkait" name="unit_terkait" value={formData.unit_terkait} onChange={handleChange} />
        <InputField label="Kanwil Litdal" name="kanwil_litdal" value={formData.kanwil_litdal} onChange={handleChange} />
        <InputField label="Atsung Terlapor" name="atsung_terlapor" value={formData.atsung_terlapor} onChange={handleChange} />
      </section>

      {/* Penandatangan */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Penandatangan</h2>
        <InputField label="Nama Kepala Seksi" name="nama_kepala_seksi" value={formData.nama_kepala_seksi} onChange={handleChange} />
        <InputField label="Pelaksana Analisis" name="pelaksana_analisis" value={formData.pelaksana_analisis} onChange={handleChange} />
        <InputField label="Nama Kasubdit" name="nama_kasubdit" value={formData.nama_kasubdit} onChange={handleChange} />
      </section>

      {/* Tombol Navigasi */}
      <div className="mt-8">
        <button
          onClick={() => navigate("/preview")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Lihat Preview
        </button>
      </div>
    </div>
  );
}
