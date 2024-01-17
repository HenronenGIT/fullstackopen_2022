import { Diagnose } from "../types/Diagnose";
// import { Discharge, EntryWithoutId } from "../types/Patient";
import { EntryWithoutId, HealthCheckRating } from "../types/Patient";

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object" || !("type" in object)) {
    throw new Error("Incorrect or missing data");
  }

  if (
    !("description" in object && "date" in object && "specialist" in object)
  ) {
    throw new Error("Incorrect or missing data");
  }

  switch (object.type) {
    // case "Hospital":
    //   if ("discharge" in object) {
    //     const newEntry: EntryWithoutId = {
    //       type: object.type,
    //       description: parseDescription(object.description),
    //       date: parseDate(object.date),
    //       specialist: parseSpecialist(object.specialist),
    //       discharge: parseDischarge(object.discharge),
    //       diagnosisCodes: parseDiagnosisCodes(object),
    //     };
    //     return newEntry;
    //   } else {
    //     throw new Error("Incorrect or missing data");
    //   }
    // case "OccupationalHealthcare":
    //   if ("sickLeave" in object && "employerName" in object) {
    //     const newEntry: EntryWithoutId = {
    //       type: object.type,
    //       description: parseDescription(object.description),
    //       date: parseDate(object.date),
    //       specialist: parseSpecialist(object.specialist),
    //       sickLeave: parseSickLeave(object.sickLeave),
    //       employerName: parseName(object.employerName),
    //       diagnosisCodes: parseDiagnosisCodes(object),
    //     };
    //     return newEntry;
    //   } else {
    //     throw new Error("Incorrect or missing data");
    //   }
    case "HealthCheck":
      if ("healthCheckRating" in object) {
        const newEntry: EntryWithoutId = {
          type: object.type,
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          healthCheckRating: parseHealthCheck(object.healthCheckRating),
          diagnosisCodes: parseDiagnosisCodes(object),
        };
        return newEntry;
      } else {
        throw new Error("Incorrect or missing data");
      }
    default:
      throw new Error("Invalid entry type");
  }
};

const parseDescription = (description: unknown): string => {
  if (!description || typeof description !== "string") {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || typeof date !== "string") {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || typeof specialist !== "string") {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

// const parseDischarge = (discharge: unknown): Discharge => {
//   if (!discharge || typeof discharge !== "object") {
//     throw new Error("Incorrect or missing discharge");
//   }

//   if (!("date" in discharge && "criteria" in discharge)) {
//     throw new Error("Incorrect or missing discharge");
//   }

//   return {
//     date: parseDate(discharge.date),
//     criteria: parseCriteria(discharge.criteria),
//   };
// };

// const parseSickLeave = (
//   sickLeave: unknown
// ): { startDate: string; endDate: string } => {
//   if (!sickLeave || typeof sickLeave !== "object") {
//     throw new Error("Incorrect or missing sick leave");
//   }

//   if (!("startDate" in sickLeave && "endDate" in sickLeave)) {
//     throw new Error("Incorrect or missing sick leave");
//   }

//   return {
//     startDate: parseDate(sickLeave.startDate),
//     endDate: parseDate(sickLeave.endDate),
//   };
// };

// const parseName = (name: unknown): string => {
//   if (!name || typeof name !== "string") {
//     throw new Error("Incorrect or missing name");
//   }
//   return name;
// };

const parseHealthCheck = (healthCheck: unknown): HealthCheckRating => {
  const healthCheckRating = Number(healthCheck);
  if (
    healthCheckRating === undefined ||
    healthCheckRating === null ||
    typeof healthCheckRating !== "number" ||
    healthCheckRating < 0 ||
    healthCheckRating > 3
  ) {
    throw new Error("Incorrect or missing health check");
  }
  return healthCheckRating;
};

// const parseCriteria = (criteria: unknown): string => {
//   if (!criteria || typeof criteria !== "string") {
//     throw new Error("Incorrect or missing criteria");
//   }
//   return criteria;
// };

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnose["code"]>;
};
