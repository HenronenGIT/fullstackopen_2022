import { Router } from "express";
import patientsService from "../services/patients.service";
import { toNewPatientEntry } from "../utils/patientParse";
import { toNewEntry } from "../utils/entryParse";

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

patientsRouter.post("/:id/entries", (req, res) => {
  const { id } = req.params;

  try {
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientsService.addEntry(newEntry, id);
    res.json(updatedPatient);
  } catch (e: unknown) {
    let errorMessage = "Something went wrong: ";

    if (e instanceof Error) {
      errorMessage += e.message;
    }

    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;
