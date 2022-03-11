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

exports.createAdoptant = (req, res, next) => {
  const adoptant = new Adoptant({
    email: req.body.email,
    nom: req.body.nom,
    telephone: req.body.telephone,
    historiqueAdoption: req.body.historiqueAdoption,
  });

  adoptant
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Adoptant créé avec succès!",
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

exports.getAdoptantById = (req, res, next) => {
  Adoptant.findById(req.params.adoptantId)
    .then((adoptant) => {
      if (!adoptant) {
        const error = new Error("Adoptant introuvable.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Adoptant récupéré avec succès.",
        adoptant: adoptant,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateAdoptant = (req, res, next) => {
  const adoptantId = req.params.adoptantId;
  const updateAdoptant = new Adoptant({
    _id: adoptantId,
    email: req.body.email,
    nom: req.body.nom,
    telephone: req.body.telephone,
    historiqueAdoption: req.body.historiqueAdoption,
  });

  Adoptant.findByIdAndUpdate(
    { _id: adoptantId },
    { $set: updateAdoptant },
    { new: true }
  )
    .then((result) => {
      res.status(200).json({
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
