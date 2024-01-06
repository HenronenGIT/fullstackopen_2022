import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

export const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, res) => {
  if (!_req.query.height || !_req.query.weight) {
    res.send({ error: "malformatted parameters" });
  }

  const height: number = Number(_req.query.height);
  const weight: number = Number(_req.query.weight);

  const bmi = calculateBmi(height, weight);
  res.send(bmi);
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.send({ error: "parameters missing" });
  }

  const result = calculateExercises(daily_exercises, target);
  res.status(200).send(result);
});

//
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
