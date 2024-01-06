import { Router } from "express";
import patientsService from "../services/patients.service";

const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

export default patientsRouter;
