const express = require("express");

const familleTempController = require("../controllers/familleTempController");

const router = express.Router();

router.get("/famillesTemp", familleTempController.getFamilleTemp);

module.exports = router;
