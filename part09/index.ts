import express from "express";
import calculateBmi from "./bmiCalculator";

const app = express();

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

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
