export const countOfPositives = (arr: number[]): number => {
  return arr.filter((num) => num > 0).length;
};

export const countArrayAverage = (arr: number[]): number => {
  return arr.reduce((acc, cur) => {
    return acc + cur / arr.length;
  }, 0);
};

export const calcRating = (trainingDays: number): number => {
  if (trainingDays >= 3) {
    return 3;
  } else if (trainingDays <= 2 && trainingDays > 1) {
    return 2;
  } else {
    return 1;
  }
};

export const giveRatingDescription = (rating: number): string => {
  switch (rating) {
    case 3:
      return "Fantastic!";
    case 2:
      return "Medicore";
    case 1:
      return "We need to work on something";
    default:
      return "Something went wrong";
  }
};
