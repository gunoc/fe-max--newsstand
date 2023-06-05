import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/rolling", (req, res) => {
  fs.readFile("server/data/rolling.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading JSON file");
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.get("/grid", (req, res) => {
  fs.readFile("server/data/grid.json", "utf-8", (err, data) => {
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
