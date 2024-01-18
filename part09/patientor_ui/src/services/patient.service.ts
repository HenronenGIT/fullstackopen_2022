import axios from "axios";
import { EntryFormValues, Patient, PatientFormValues } from "../types/Patient";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const addEntry = async (
  object: EntryFormValues | undefined,
  patient_id: string
) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/patients/${patient_id}/entries`,
    object
  );

  return data;
};

export default {
  getAll,
  create,
  getPatient,
  addEntry,
};
