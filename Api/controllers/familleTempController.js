"use strict";

const FamilleTemp = require("../models/familleTemp");

exports.getFamilleTemp = (req, res, next) => {
  FamilleTemp.find()
    .then((familleTemps) => {
      res.status(200).json({
        message: "Familles temporaires récupérées avec succès!",
        familleTemps: familleTemps,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
