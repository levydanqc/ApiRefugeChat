const express = require("express");

const adoptantController = require("../controllers/adoptantController");

const router = express.Router();

router.get("/adoptants", adoptantController.getAdoptants);

router.post("/adoptant", adoptantController.createAdoptant);

router.get("/adoptants/:adoptantId", adoptantController.getAdoptantById);

module.exports = router;
