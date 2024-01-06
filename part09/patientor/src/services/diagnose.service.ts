import diagnoses from "../data/diagnoses";
import { Diagnose } from "../types/Diagnose";

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

// const addDiary = () => {
//   return null;
// };

export default {
  getDiagnoses,
  //   getNonSensitiveEntries,
  //   addDiary,
};
