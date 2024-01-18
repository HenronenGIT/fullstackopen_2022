// import { Diagnose } from "../../types/Diagnose";
// import { Patient } from "../../types/Patient";
import { Entry } from "../../types/Patient";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import { assertNever } from "../../utils/helpers";

interface Props {
  entry: Entry;
}

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <div>
            {entry.date}
            <LocalHospitalIcon />
          </div>
          <i>{entry.description}</i>
          <p>discharged: {entry.discharge.date}</p>
          <p>criteria: {entry.discharge.criteria}</p>
          <p>diagnose by: {entry.specialist}</p>
        </div>
      );

    case "HealthCheck":
      return (
        <div>
          {entry.date}
          <MedicalServicesIcon />
          <p>{entry.description}</p>
          <p>Health rating: {entry.healthCheckRating}</p>
          <p>diagnose by: {entry.specialist}</p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          {entry.date}
          <WorkIcon />
          <p>{entry.description}</p>
          <p>diagnose by: {entry.specialist}</p>
        </div>
      );

    default:
      assertNever(entry);
  }
};

export default EntryDetails;
