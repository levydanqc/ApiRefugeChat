"use strict";

const Chaton = require("../models/chaton");

exports.getChatons = (req, res, next) => {
  Chaton.find(req.query.sexe ? { sexe: req.query.sexe } : {})
    .sort({ _id: 1 })
    .then((chatons) => {
      res.status(200).json({
        message: "Chatons récupérés avec succès.",
        chatons: chatons,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
