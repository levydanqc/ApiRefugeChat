"use strict";

const FamilleTemp = require("../models/familleTemp");

exports.getFamilleTemp = (req, res, next) => {
  let condition = {};
  if (req.query.active && req.query.active === "1")
    condition = { "chatons.0": { $exists: true } };
  else if (req.query.active && req.query.active === "0")
    condition = { "chatons.0": { $exists: false } };
  FamilleTemp.find(condition)
    .sort({ _id: 1 })
    .populate("chatons.chatonId")
    .then((famillesTemp) => {
      res.status(200).json({
        message: "Familles temporaires récupérées avec succès!",
        famillesTemp: famillesTemp,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createFamilleTemp = (req, res, next) => {
  const familleTemp = new FamilleTemp({
    adresse: req.body.adresse,
    chatons: req.body.chatons,
  });
  familleTemp
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Famille temporaire créée avec succès!",
        familleTemp: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
