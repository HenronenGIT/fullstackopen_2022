interface returnValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  description: string;
  target: 1 | 2 | 3;
  average: number;
}

const calculateExercises = (exercise_days: number[], target: number) => {
  const periodLength = exercise_days.length;

  let trainingDays = 0;
  exercise_days.forEach((element) => {
    if (element > 0) {
      trainingDays += 1;
    }
  });

  const average = exercise_days.reduce((accumulator, currentValue) => {
    return accumulator + currentValue / periodLength;
  }, 0);

  const sucess = trainingDays >= target ?? true;

  let rating = 0;

  if (trainingDays >= 3) {
    rating = 3;
  } else if (trainingDays <= 2 && trainingDays > 1) {
    rating = 2;
  } else {
    rating = 1;
  }

  let ratingDescription;
  switch (rating) {
    case 3:
      ratingDescription = "Fantastic!";
      break;
    case 2:
      ratingDescription = "Medicore";
      break;
    case 1:
      ratingDescription = "We need to work on something";
    default:
      break;
  }
  return {
    periodLength,
    trainingDays,
    sucess,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
