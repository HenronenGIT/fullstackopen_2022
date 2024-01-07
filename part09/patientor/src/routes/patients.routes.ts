import { Router } from "express";
import patientsService from "../services/patients.service";

const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

patientsRouter.post("/", (req, res) => {
  // const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  // try {
    const newPatient = patientsService.addPatient(req.body);
    res.json(newPatient);
  // } catch (e) {
  //   res.status(400).send(e.message);
  // }
});

export default patientsRouter;
