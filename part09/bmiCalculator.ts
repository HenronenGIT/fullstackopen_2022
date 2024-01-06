const calculateBmi = (height: number, weight: number): string => {
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

console.log(calculateBmi(180, 74));
