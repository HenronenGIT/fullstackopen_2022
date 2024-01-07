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

const addPatient = (object: unknown): NewPatientEntry => {
  const id = randomUUID();
  // const newPatient = {
  //   id,
  //   ...object,
  // };
  console.log(
    "%cpatients.service.ts line:29 object",
    "color: #007acc;",
    object
  );
  const newPatient = {
    id,
    name: "Henri Maronen",
    dateOfBirth: "1979-01-30",
    ssn: "300179-77A",
    gender: "male",
    occupation: "Test",
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
};
