export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
};

export type NonSensitivePatient = Omit<Patient, "ssn">;

export type NewPatientEntry = Omit<Patient, "id">;
