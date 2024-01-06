import {
  countArrayAverage,
  calcRating,
  countOfPositives,
  giveRatingDescription,
} from "./utils";

interface returnValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exercise_days: number[],
  target: number
): returnValues => {
  if (exercise_days.length < 1) {
    throw new Error("No exercises were given");
  }
  if (target < 1) {
    throw new Error("Target must be greater than 0");
  }

  const periodLength = exercise_days.length;
  const trainingDays = countOfPositives(exercise_days);
  const average = countArrayAverage(exercise_days);
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

const target: number = Number(process.argv[2]);
const exercise_days: number[] = process.argv
  .slice(3)
  .map((element) => Number(element));

console.log(calculateExercises(exercise_days, target));

// npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
