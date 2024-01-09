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

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatient,
};
