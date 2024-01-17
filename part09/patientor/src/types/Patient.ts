import { Diagnose } from "./Diagnose";

export type Entry =
  | OccupationalHealthcareEntry
  | HealthCheckEntry
  | HospitalEntry;

interface BaseEntry {
  id: string;
  type: string;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: Diagnose["code"][];
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
  "Healthy" = 1,
  "LowRisk" = 2,
  "HighRisk" = 3,
  "CriticalRisk" = 4,
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface Discharge {
  date: string;
  criteria: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = Omit<Patient, "id">;

// export type NewDiagnoseEntry = Omit<Entry, "id">;

export enum Gender {
  Other = "other",
  Male = "male",
  Female = "female",
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;
