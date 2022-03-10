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

exports.getChaton = (req, res, next) => {
  Chaton.findById(req.params.chatonId)
    .then((chaton) => {
      if (!chaton) {
        const error = new Error("Chaton introuvable.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Chaton récupéré avec succès.",
        chaton: chaton,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateChaton = (req, res, next) => {
  const chatonId = req.params.chatonId;
  const updateChaton = {};
  for (const [attr, value] of Object.entries(req.body)) {
    updateChaton[attr] = value;
  }
  Chaton.findByIdAndUpdate({ _id: chatonId }, { $set: updateChaton })
    .then((result) => {
      res.status(200).json({
        message: "Chaton mis à jour avec succès.",
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
