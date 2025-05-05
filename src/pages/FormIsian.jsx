// src/pages/FormIsian.jsx
import { useFormContext } from "../context/FormContext";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import DatePicker from "../components/DatePicker";
import TextArea from "../components/TextArea";
import Checkbox from "../components/Checkbox";

export default function FormIsian() {
    const navigate = useNavigate();
    const { formData, setFormData } = useFormContext();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTersangkaChange = (index, field, value) => {
    const updated = [...formData.tersangka];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, tersangka: updated }));
  };

  const addTersangka = () => {
    setFormData((prev) => ({
      ...prev,
      tersangka: [...prev.tersangka, { nama: "", nip: "", jabatan: "", unit: "" }],
    }));
  };

  return (
    <div className="space-y-8">
      {/* ...previous sections... */}

      {/* Pulbaket */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Pulbaket</h2>
        <InputField label="Status Pulbaket (ya/tidak)" name="pulbaket_status" value={formData.pulbaket_status} onChange={handleChange} />

        {formData.pulbaket_status === "ya" && (
          <>
            <InputField label="Nomor UPTP" name="nomor_uptp" value={formData.nomor_uptp} onChange={handleChange} />
            <DatePicker label="Tanggal UPTP" name="tanggal_uptp" value={formData.tanggal_uptp} onChange={handleChange} />
            <InputField label="Nomor LHPBK" name="nomor_lhpbk" value={formData.nomor_lhpbk} onChange={handleChange} />
            <DatePicker label="Tanggal LHPBK" name="tanggal_lhpbk" value={formData.tanggal_lhpbk} onChange={handleChange} />
            <TextArea label="Kesimpulan LHPBK" name="kesimpulan_lhpbk" value={formData.kesimpulan_lhpbk} onChange={handleChange} rows={4} />
          </>
        )}

        {formData.pulbaket_status === "tidak" && (
          <TextArea label="Hasil Pulbaket Mandiri" name="hasil_pulbaket" value={formData.hasil_pulbaket} onChange={handleChange} rows={4} />
        )}
      </section>

      {/* Kriteria Investigasi */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Kriteria Investigasi</h2>
        <Checkbox label="Citra DJP" name="inv_kriteria_citra" checked={formData.inv_kriteria_citra} onChange={handleChange} />
        <Checkbox label="Strategis" name="inv_kriteria_strategis" checked={formData.inv_kriteria_strategis} onChange={handleChange} />
        <Checkbox label="Nasional" name="inv_kriteria_nasional" checked={formData.inv_kriteria_nasional} onChange={handleChange} />
        {formData.inv_kriteria_citra && (
          <TextArea label="Penjelasan Investigasi Citra" name="inv_penjelasan_citra" value={formData.inv_penjelasan_citra} onChange={handleChange} />
        )}
        {formData.inv_kriteria_strategis && (
          <TextArea label="Penjelasan Investigasi Strategis" name="inv_penjelasan_strategis" value={formData.inv_penjelasan_strategis} onChange={handleChange} />
        )}
        {formData.inv_kriteria_nasional && (
          <TextArea label="Penjelasan Investigasi Nasional" name="inv_penjelasan_nasional" value={formData.inv_penjelasan_nasional} onChange={handleChange} />
        )}
      </section>

      {/* Data Tersangka */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Data Tersangka</h2>
        {formData.tersangka.map((t, index) => (
          <div key={index} className="border p-4 mb-2 rounded">
            <InputField label="Nama" name={`nama_${index}`} value={t.nama} onChange={(e) => handleTersangkaChange(index, "nama", e.target.value)} />
            <InputField label="NIP" name={`nip_${index}`} value={t.nip} onChange={(e) => handleTersangkaChange(index, "nip", e.target.value)} />
            <InputField label="Jabatan" name={`jabatan_${index}`} value={t.jabatan} onChange={(e) => handleTersangkaChange(index, "jabatan", e.target.value)} />
            <InputField label="Unit Kerja" name={`unit_${index}`} value={t.unit} onChange={(e) => handleTersangkaChange(index, "unit", e.target.value)} />
          </div>
        ))}
        <button type="button" onClick={addTersangka} className="mt-2 text-sm text-blue-600 hover:underline">
          + Tambah Tersangka
        </button>
      </section>

      {/* Dugaan Investigasi */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Dugaan Investigasi</h2>
        <InputField label="Dugaan Pelanggaran Versi Investigasi" name="dugaan_pelanggaran_inves" value={formData.dugaan_pelanggaran_inves} onChange={handleChange} />
        <TextArea label="Tempat dan Waktu Pelanggaran" name="tempat_waktu_pelanggaran" value={formData.tempat_waktu_pelanggaran} onChange={handleChange} rows={3} />
      </section>

      {/* Penerusan */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Kriteria Penerusan</h2>
        <InputField label="Jenis Penerusan (litdal/atsung)" name="jenis_penerusan" value={formData.jenis_penerusan} onChange={handleChange} />
        {formData.jenis_penerusan === "litdal" && (
          <InputField label="Kanwil Litdal" name="kanwil_litdal" value={formData.kanwil_litdal} onChange={handleChange} />
        )}
        {formData.jenis_penerusan === "atsung" && (
          <InputField label="Atasan Langsung Terlapor" name="atsung_terlapor" value={formData.atsung_terlapor} onChange={handleChange} />
        )}
      </section>

      {/* Usul Tindak Lanjut */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Usul Tindak Lanjut</h2>
        <InputField label="Tindak Lanjut (investigasi/litdal/atsung/unit_terkait/arsip)" name="tindak_lanjut" value={formData.tindak_lanjut} onChange={handleChange} />
        {formData.tindak_lanjut === "unit_terkait" && (
          <>
            <InputField label="Alasan Penerusan ke Unit Terkait" name="alasan_unit_terkait" value={formData.alasan_unit_terkait} onChange={handleChange} />
            <InputField label="Nama Unit Terkait" name="nama_unit_terkait" value={formData.nama_unit_terkait} onChange={handleChange} />
          </>
        )}
      </section>

      {/* Penandatangan */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Penandatangan</h2>
        <InputField label="Kepala Seksi" name="kepala_seksi" value={formData.kepala_seksi} onChange={handleChange} />
        <InputField label="Pelaksana Analisis" name="pelaksana_analisis" value={formData.pelaksana_analisis} onChange={handleChange} />
        <InputField label="Kasubdit" name="kasubdit" value={formData.kasubdit} onChange={handleChange} />
      </section>
      <button
        onClick={() => navigate("/preview")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Lihat Preview
      </button>
    </div>
  );
  
}
