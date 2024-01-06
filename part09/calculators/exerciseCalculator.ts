import {
  countArrayAverage,
  calcRating,
  countOfPositives,
  giveRatingDescription,
} from "./utils";

export interface IcalculateExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  daily_excersises: number[],
  target: number
): IcalculateExercisesResult => {
  if (daily_excersises.length < 1) {
    throw new Error("No exercises were given");
  }
  if (target < 1) {
    throw new Error("Target must be greater than 0");
  }

  const periodLength = daily_excersises.length;
  const trainingDays = countOfPositives(daily_excersises);
  const average = countArrayAverage(daily_excersises);
  const success = trainingDays >= target ?? true;
  const rating = calcRating(trainingDays);
  const ratingDescription = giveRatingDescription(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

// const target: number = Number(process.argv[2]);
// const exercise_days: number[] = process.argv
//   .slice(3)
//   .map((element) => Number(element));

// console.log(calculateExercises(exercise_days, target));

// npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4

export default calculateExercises;
