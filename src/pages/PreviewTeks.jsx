// src/pages/PreviewTeks.jsx
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

  const renderIsiPengaduan = () => {
    if (formData.isi_pengaduan === "pelanggaran") {
      return (
        <>
          <p className="mb-1">✔ Pelanggaran Kode Etik/Disiplin</p>
          <p>{`Berdasarkan analisis terhadap pengaduan, disampaikan bahwa: ${formData.nama_terlapor} diduga melakukan ${formData.dugaan_pelanggaran}; dan perbuatan tersebut merupakan pelanggaran terhadap ${formData.pasal_dan_huruf} PP 94/2021 yang mengatur bahwa "${formData.isi_pasal_dan_huruf}".`}</p>
        </>
      );
    }
    return <p>-</p>;
  };

  const renderKriteria = () => {
    const kriteria = [];
    if (formData.kriteria_citra) kriteria.push(`✔ Citra DJP\nPegawai yang ${formData.dugaan_pelanggaran} dapat ${formData.penjelasan_dampak_citra}`);
    if (formData.kriteria_strategis) kriteria.push(`✔ Strategis\nPegawai yang ${formData.dugaan_pelanggaran} dapat ${formData.penjelasan_dampak_strategis}`);
    if (formData.kriteria_nasional) kriteria.push(`✔ Nasional\nPegawai yang ${formData.dugaan_pelanggaran} dapat ${formData.penjelasan_dampak_nasional}`);
    return kriteria.length > 0 ? kriteria.map((k, i) => <p key={i}>{k}</p>) : <p>-</p>;
  };

  const renderPulbaket = () => {
    if (formData.pulbaket_status === "ya") {
      return (
        <>
          <p>Berdasarkan penelitian terhadap pengaduan yang dilakukan oleh Pelaksana Analisis disimpulkan bahwa atas pengaduan tersebut masih dibutuhkan data/atau keterangan tambahan sehingga pelaksana analisis mengusulkan pembentukan Tim Pulbaket yang telah disetujui oleh Kepala Subdirektorat Investigasi Internal dengan Usulan nomor {formData.nomor_uptp} tanggal {formData.tanggal_uptp}.</p>
          <p>Berdasarkan LHPBK nomor {formData.nomor_lhpbk} tanggal {formData.tanggal_lhpbk}, didapatkan informasi sebagai berikut:</p>
          <p>{formData.kesimpulan_lhpbk}</p>
        </>
      );
    }
    if (formData.pulbaket_status === "tidak") {
      return (
        <>
          <p>Pelaksana Analisis melakukan pencarian bahan dan keterangan tambahan sendiri tanpa membentuk tim.</p>
          <p>Informasi yang diperoleh:</p>
          <p>{formData.hasil_pulbaket}</p>
        </>
      );
    }
    return <p>-</p>;
  };

  const renderTindakLanjut = () => {
    const fpp = `${formatNomorFPP()} tanggal ${formData.tanggal_fpp}`;
    switch (formData.tindak_lanjut) {
      case "investigasi":
        return <p>Semua unsur layak investigasi terpenuhi sehingga atas pengaduan {fpp} diusulkan untuk dilakukan investigasi.</p>;
      case "litdal":
        return <p>Unsur investigasi tidak sepenuhnya terpenuhi, namun perlu penelitian pendahuluan. Diteruskan ke Tim Penelitian Pendahuluan Kanwil DJP {formData.kanwil_litdal}.</p>;
      case "atsung":
        return <p>Langsung dapat diteruskan ke Atasan Langsung {formData.atsung_terlapor}.</p>;
      case "unit_terkait":
        return <p>Pengaduan tidak terkait pelanggaran etik/disiplin namun terkait {formData.alasan_unit_terkait}. Diteruskan ke Unit {formData.nama_unit_terkait}.</p>;
      case "arsip":
        return <p>Unsur layak investigasi tidak terpenuhi. Pengaduan {fpp} diarsipkan.</p>;
      default:
        return <p>-</p>;
    }
  };

  return (
    <div className="prose max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Preview Hasil LHA</h2>

      <section className="mb-6">
        <h3 className="font-semibold">Nomor FPP</h3>
        <p>{formatNomorFPP()}</p>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">Isi Pengaduan</h3>
        {renderIsiPengaduan()}
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">Kriteria Pelanggaran</h3>
        {renderKriteria()}
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">Pulbaket</h3>
        {renderPulbaket()}
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">Tindak Lanjut</h3>
        {renderTindakLanjut()}
      </section>

      <div className="mt-8">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          ← Kembali ke Form
        </button>
      </div>
    </div>
  );
}
