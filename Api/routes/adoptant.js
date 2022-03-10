const express = require("express");

const adoptantController = require("../controllers/adoptantController");

const router = express.Router();

router.get("/adoptants", adoptantController.getAdoptants);

module.exports = router;
