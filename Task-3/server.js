const express = require("express");
const app = express();

const config = require("./config");

const router = require("./router");

const { PORT } = config;

// buildin middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API Running");
});

// ----------------- Define Routes ---------------- //
app.use("/api", router);

// ERROR HANDLING middleware

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message, msg: "SOmething went wromg" });
});

//The 404 Route
app.use(function (req, res, next) {
  res.status(404).send("PAGE NOT FOUND");
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
