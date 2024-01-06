import express from "express";
import diagnosesRouter from "./src/routes/diagnoses.routes";
import patientsRouter from "./src/routes/patients.routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("<h1>pong</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
