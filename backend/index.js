// backend/index.js (atau server.js)
import express from "express";
import cors from "cors";
import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createReport } from "docx-templates";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("LUP Generator Backend is running");
});

app.post("/generate", async (req, res) => {
  const data = req.body;

  try {
    console.log(">> Memulai generate dokumen");

    const templatePath = join(__dirname, "template", "template.docx");

    if (!fs.existsSync(templatePath)) {
      console.error(">> Template tidak ditemukan:", templatePath);
      return res.status(404).send("Template file not found.");
    }

    const templateBuffer = fs.readFileSync(templatePath);

    const buffer = await createReport({
      template: templateBuffer,
      data,
      cmdDelimiter: ["{{", "}}"],
      onTag: (tag) => {
        console.log(">> Tag ditemukan:", tag);
      },
    });

    const outputFileName = `LHA_${Date.now()}.docx`;
    const outputPath = join("/tmp", outputFileName); // wajib di /tmp untuk Render

    fs.writeFileSync(outputPath, buffer);
    console.log(">> Dokumen berhasil dibuat:", outputPath);

    res.download(outputPath, outputFileName, (err) => {
      if (err) {
        console.error(">> Gagal saat mengirim file:", err);
        if (!res.headersSent) {
          res.status(500).send("Gagal mengunduh file.");
        }
      } else {
        console.log(">> File berhasil dikirim:", outputFileName);
        fs.unlinkSync(outputPath);
      }
    });
  } catch (err) {
    console.error(">> Error saat generate:", err);
    res.status(500).send("Gagal generate file.");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});