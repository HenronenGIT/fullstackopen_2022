import { Router } from "express";
import diagnosesService from "../services/diagnose.service";

const diagnosesRouter = Router();

diagnosesRouter.get("/", (_req, res) => {
  res.send(diagnosesService.getDiagnoses());
});

export default diagnosesRouter;
