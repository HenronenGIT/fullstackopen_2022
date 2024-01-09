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

patientsRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const patient = patientsService.getPatient(id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default patientsRouter;
