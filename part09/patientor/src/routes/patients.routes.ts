import { Router } from "express";
import patientsService from "../services/patients.service";
import { toNewPatientEntry } from "../utils/utils";

const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

patientsRouter.post("/", (req, res) => {
  const newPatientEntry = toNewPatientEntry(req.body);

  const newPatient = patientsService.addPatient(newPatientEntry);
  res.json(newPatient);
});

export default patientsRouter;
