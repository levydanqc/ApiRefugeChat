"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const chatonRoutes = require("./routes/chaton");
const familleTempRoutes = require("./routes/familleTemps");
const adoptantRoutes = require("./routes/adoptant");
const app = express();

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // TODO: Vérifier si fonctionne et utile
  if (req.method === "PUT" || req.method === "POST") {
    res.setHeader("Content-Type", "application/json");
  }

  if (res.method != "GET") {
    res.setHeader("Content-Type", "application/json");
  }

  next();
});

app.use(chatonRoutes);
app.use(familleTempRoutes);
app.use(adoptantRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/refuge")
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
