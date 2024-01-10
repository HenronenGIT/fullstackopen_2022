// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

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

export type NewPatientEntry = Omit<Patient, "id" | "entries">;

export enum Gender {
  Other = "other",
  Male = "male",
  Female = "female",
}
