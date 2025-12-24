import express from "express";
import {solveGaussian} from "./service/elimination.js";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/display", (req, res) => {
  const matrix = req.body.matrix;
  const steps = solveGaussian(matrix);
  
  res.render("display", { matrix, steps, solutions });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
