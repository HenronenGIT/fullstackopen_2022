const calculateBmi = (height: number, weight: number): string => {
  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
  }

  if (height === 0 || weight === 0) throw new Error("Height or weight cannot be 0!");
  const bmi = weight / (((height / 100) * height) / 100);

  if (bmi <= 18.4) {
    return "Underweight";
  }
  if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal (healthy weight)";
  }
  if (bmi >= 25 && bmi <= 29.9) {
    return "Overweight";
  }
  return "Obese";
};

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

console.log(calculateBmi(height, weight));
