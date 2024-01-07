import {
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from "../types/Patient";
import patients from "../data/patients";
import { randomUUID } from "crypto";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (object: NewPatientEntry): NewPatientEntry => {
  const id = randomUUID();
  const newPatient = {
    id,
    ...object,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
};
