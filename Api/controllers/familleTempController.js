"use strict";

const FamilleTemp = require("../models/familleTemp");
const Chaton = require("../models/chaton");

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

exports.getFamilleTempById = (req, res, next) => {
  FamilleTemp.findById(req.params.familleTempId)
    .populate("chatons.chatonId")
    .then((familleTemp) => {
      if (!familleTemp) {
        const error = new Error("Famille temporaire introuvable!");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Famille temporaire récupérée avec succès!",
        familleTemp: familleTemp,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateFamilleTemp = (req, res, next) => {
  const familleTempId = req.params.familleTempId;

  const updateFamilleTemp = new FamilleTemp({
    _id: familleTempId,
    adresse: req.body.adresse,
    chatons: req.body.chatons,
  });
  FamilleTemp.findByIdAndUpdate(
    { _id: familleTempId },
    { $set: updateFamilleTemp },
    { new: true }
  )
    .then((result) => {
      res.status(200).json({
        message: "Famille temporaire modifiée avec succès!",
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

exports.deleteFamilleTemp = (req, res, next) => {
  const familleTempId = req.params.id;
  FamilleTemp.findByIdAndDelete(familleTempId)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.accueillir = (req, res, next) => {
  const familleTempId = req.params.familleTempId;
  const chatonId = req.body.chatonId;

  Chaton.findById(chatonId)
    .then((chaton) => {
      if (!chaton) {
        const error = new Error("Chaton introuvable!");
        error.statusCode = 404;
        throw error;
      }
      FamilleTemp.findByIdAndUpdate(
        { _id: familleTempId },
        { $push: { chatons: { chatonId: chatonId } } },
        { new: true }
      )
        .then((familleTemp) => {
          if (!familleTemp) {
            const error = new Error("Famille temporaire introuvable!");
            error.statusCode = 404;
            throw error;
          }
          res.status(200).json({
            message: "Chaton accueilli avec succès!",
            familleTemp: familleTemp,
          });
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
