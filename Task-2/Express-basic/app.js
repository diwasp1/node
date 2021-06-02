const express = require("express");
const app = express();
const config = require("./config/config");

const { PORT } = config;

// middleware

// application level middleware
app.use((req, res, next) => {
  next();
});

// ROUTES
app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

// Dynamic URLs
app.get("/post/:id", (req, res) => {
  res.send(`Post id : ${req.params.id}`);
});

// Query
app.get("/post", (req, res) => {
  res.send(`Post id :  ${req.query.id}`);
});

//The 404 Route
app.get("*", (req, res) => {
  res.status(404).send("PAGE NOT FOUND");
});

app.listen(PORT, () => {
  console.log(`Server started at Port: ${PORT} `);
});
