"use strict";

const Adoptant = require("../models/adoptant");

exports.getAdoptants = (req, res, next) => {
  Adoptant.find()
    .sort({ _id: 1 })
    .then((adoptants) => {
      res.status(200).json({
        message: "Adoptants récupérés avec succès!",
        adoptants: adoptants,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.adoptantReserve = (req, res, next) => {
  const chatonId = req.body.chatonId;
  const date = req.body.date;
  const adoptantId = req.params.adoptantId;

  console.log("chatonId", chatonId);

  Adoptant.findById(adoptantId)
    .then((adoptant) => {
      adoptant.historiqueAdoption.push(req.body);
      return adoptant.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Adoptant mis à jour!",
        adoptant: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
