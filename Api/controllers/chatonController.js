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

exports.createChaton = (req, res, next) => {
  const chaton = new Chaton({
    nom: req.body.nom,
    sexe: req.body.sexe,
    dateNaissance: req.body.dateNaissance,
  });
  chaton
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Chaton créé avec succès.",
        chaton: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
