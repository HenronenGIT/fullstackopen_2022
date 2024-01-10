// eslint-disable-next-line @typescript-eslint/no-empty-interface
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
  healthCheckRating: number;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: { date: string; criteria: string };
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
// export type NonSensitivePatient = Omit<Patient, "ssn">;

// export type NewPatientEntry = Omit<Patient, "id" | "entries">;
export type NewPatientEntry = Omit<Patient, "id" >;

export enum Gender {
  Other = "other",
  Male = "male",
  Female = "female",
}
