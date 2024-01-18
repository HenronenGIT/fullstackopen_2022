import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import diagnoseService from "../../services/diagnose.service";
import patientService from "../../services/patient.service";
import { Patient } from "../../types/Patient";
import EntryDetails from "../EntryDetails/EntryDetails";
import AddEntryForm from "../AddEntryForm/AddEntryForm";
import diagnoseService from "../../services/diagnose.service";
import { Diagnose } from "../../types/Diagnose";

const SinglePatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>();
  // const [diagnoses, setDiagnoses] = useState();

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getPatient(id!);
      setPatient(patient);
    };

    diagnoseService
      .getAll()
      .then((result) => {
        setDiagnoses(result);
      })
      .catch(() => {
        setDiagnoses(undefined);
      });

    void fetchPatient();
  }, [id]);

  return (
    <div>
      <h2>
        {patient?.name}
        {patient?.gender === "female" ? (
          <FemaleIcon />
        ) : patient?.gender === "male" ? (
          <MaleIcon />
        ) : null}
      </h2>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>

      <AddEntryForm patient_id={id} diagnoses={diagnoses} />

      {patient?.entries?.map((entry) => (
        <div
          style={{
            borderRadius: "10px",
            border: "1px solid #ccc",
            padding: "10px",
            marginTop: "10px",
          }}
          key={entry.id}
        >
          <EntryDetails entry={entry} />
        </div>
      ))}
    </div>
  );
};

export default SinglePatientPage;
