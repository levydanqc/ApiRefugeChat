const express = require("express");

const familleTempController = require("../controllers/familleTempController");
const adoptantsController = require("../controllers/adoptantController");

const router = express.Router();

router.get("/famillesTemp", familleTempController.getFamilleTemp);

module.exports = router;
