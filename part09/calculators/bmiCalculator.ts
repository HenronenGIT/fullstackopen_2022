interface returnObject {
  weight: number;
  height: number;
  result: string;
}

const calculateBmi = (height: number, weight: number): returnObject => {
  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
  }

  if (height === 0 || weight === 0)
    throw new Error("Height or weight cannot be 0!");

  const bmi = weight / (((height / 100) * height) / 100);

  let result = "";
  if (bmi <= 18.4) {
    result = "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    result = "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi <= 29.9) {
    result = "Overweight";
  } else {
    result = "Obese";
  }
  return { weight, height, result };
};

// const height: number = Number(process.argv[2]);
// const weight: number = Number(process.argv[3]);
//
// console.log(calculateBmi(height, weight));

export default calculateBmi;
