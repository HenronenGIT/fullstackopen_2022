import { NewPatientEntry } from "../types/Patient";
import { Gender } from "../types/Patient";

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "occupation" in object &&
    "gender" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parsePatientName(object.name),
      dateOfBirth: parsePatientDateOfBirth(object.dateOfBirth),
      ssn: parsePatientSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parsePatientOccupation(object.occupation),
      entries: [],
    };
    return newEntry;
  }
  throw new Error("Incorrect or missing data");
};

const parsePatientName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parsePatientDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error("Incorrect or missing dateOfBirth");
  }
  return dateOfBirth;
};

const parsePatientSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const parsePatientOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

