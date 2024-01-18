import { Patient } from "../../types/Patient";
import { Entry } from "../../types/Patient";
import EntryDetails from "../EntryDetails/EntryDetails";

const PatientEntries = ({
  entries,
}: // getDiagnoseDescription,
{
  entries: Entry[] | undefined;
  // getDiagnoseDescription: (code: string) => string | undefined;
}) => {
  return (
    <div>
      <h3>Entries</h3>
      {entries?.map((entry) => (
        <div key={entry.id}>
          <EntryDetails entry={entry} />
          {/* <p>{entry.date}</p> */}
          {/* <i>{entry.description}</i> */}
          {/* <ul> */}
          {/* {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} - {getDiagnoseDescription(code)}
              </li>
            ))} */}
          {/* </ul> */}
        </div>
      ))}
    </div>
  );
};

export default PatientEntries;
