export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type Entry =
  | OccupationalHealthcareEntry
  | HealthCheckEntry
  | HospitalEntry;

interface BaseEntry {
  id: string;
  date: string;
  type: string;
  description: string;
  specialist: string;
  diagnosisCodes?: string[];
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

export type PatientFormValues = Omit<Patient, "id" | "entries">;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryFormValues = UnionOmit<Entry, "id">;
