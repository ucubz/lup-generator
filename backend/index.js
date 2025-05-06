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
    const templatePath = join(__dirname, "template", "template.docx");

    if (!fs.existsSync(templatePath)) {
      return res.status(404).send("Template file not found.");
    }

    const templateBuffer = fs.readFileSync(templatePath);

    const buffer = await createReport({
      template: templateBuffer,
      data,
      cmdDelimiter: ["{{", "}}"],
      onTag: (tag) => {
        console.log("Tag ditemukan:", tag); // Untuk debug
      }
    });

    const outputPath = join(__dirname, "LHA.docx");
    fs.writeFileSync(outputPath, buffer);

    const timestamp = Date.now();
    const outputFileName = `LHA_${timestamp}.docx`;
    const outputPathWithIncrement = join(__dirname, outputFileName);

    fs.writeFileSync(outputPathWithIncrement, buffer);

    res.download(outputPathWithIncrement, outputFileName, (err) => {
      if (err) {
      console.error("Download error:", err);
      res.status(500).send("Gagal mengunduh file.");
      } else {
      fs.unlinkSync(outputPathWithIncrement); // hapus file setelah dikirim
      }
    });
  } catch (err) {
    console.error("Error saat generate:", err);
    res.status(500).send("Gagal generate file.");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
