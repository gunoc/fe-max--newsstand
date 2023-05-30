import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/rolling", (req, res) => {
  fs.readFile(path.join(__dirname, "data", "rolling.json"), "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading JSON file");
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`);
});
