import express from "express";

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
  res.render("display", { matrix });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
