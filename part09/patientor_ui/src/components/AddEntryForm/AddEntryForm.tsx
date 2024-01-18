import { SyntheticEvent, useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  Input,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormControl,
  Box,
} from "@mui/material";
import { EntryFormValues } from "../../types/Patient";
import patientService from "../../services/patient.service";
import axios from "axios";
// import { Label } from "@mui/icons-material";
import { Diagnose } from "../../types/Diagnose";

interface Props {
  patient_id: string | undefined;
  diagnoses: Diagnose[] | undefined;
}

const AddEntryForm = ({ patient_id, diagnoses }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectValue, setSelectValue] = useState("HealthCheck");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<string[]>([]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    let entry: EntryFormValues | undefined = undefined;

    switch (selectValue) {
      case "HealthCheck":
        entry = {
          type: "HealthCheck",
          description,
          date,
          specialist,
          healthCheckRating: Number(healthCheckRating),
        };
        break;

      case "Hospital":
        entry = {
          type: "Hospital",
          date,
          description,
          specialist,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;

      case "OccupationalHealthcare":
        entry = {
          type: "OccupationalHealthcare",
          date,
          description,
          specialist,
          employerName,
          sickLeave: {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd,
          },
        };
        break;

      default:
        break;
    }

    patientService
      .addEntry(entry, patient_id!)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        } else {
          console.error(error);
        }
      });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value as string);
  };

  const handleSelectChange = (
    event: SelectChangeEvent<typeof selectedDiagnoses>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedDiagnoses(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      {errorMessage && (
        <div
          style={{
            backgroundColor: "#ffcccc",
            color: "#ff0000",
            padding: "10px",
            border: "1px solid #ff0000",
            borderRadius: "5px",
          }}
        >
          {errorMessage}
        </div>
      )}
      <div hidden={true}>Error!</div>

      <form onSubmit={handleSubmit} style={{}}>
        <Select value={selectValue} onChange={handleChange}>
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>
        </Select>
        <h3>New Patient Entry</h3>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel>Date</InputLabel>
        <Input
          type="date"
          color="primary"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel>Diagnoses</InputLabel>
          <Select
            multiple
            value={selectedDiagnoses}
            onChange={handleSelectChange}
            input={<OutlinedInput label="Diagnoses" />}
          >
            {diagnoses?.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectValue === "HealthCheck" ? (
          <div>
            <RadioGroup
              onChange={({ target }) => setHealthCheckRating(target.value)}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="1"
              name="radio-buttons-group"
            >
              <InputLabel>Health Rating</InputLabel>
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="1 - Healthy"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="2 - Low Risk"
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="3 - High Risk"
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="4 - Critical Risk"
              />
            </RadioGroup>
          </div>
        ) : selectValue === "Hospital" ? (
          <div>
            <InputLabel>Discharge Date</InputLabel>
            <Input
              type="date"
              color="primary"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </div>
        ) : selectValue === "OccupationalHealthcare" ? (
          <div>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <div>
              <InputLabel>Sickleave start</InputLabel>

              <Input
                placeholder="start"
                type="date"
                value={sickLeaveStart}
                onChange={({ target }) => setSickLeaveStart(target.value)}
              />
            </div>
            <div>
              <InputLabel>Sickleave end</InputLabel>

              <Input
                type="date"
                value={sickLeaveEnd}
                onChange={({ target }) => setSickLeaveEnd(target.value)}
              />
            </div>
          </div>
        ) : null}

        <Button type="submit" variant={"contained"}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddEntryForm;
