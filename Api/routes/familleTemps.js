const express = require("express");

const familleTempController = require("../controllers/familleTempController");

const router = express.Router();

router.get("/famillesTemp", familleTempController.getFamilleTemp);

router.post("/familleTemp", familleTempController.createFamilleTemp);

router.get("/famillesTemp/:id", familleTempController.getFamilleTempById);

router.put("/famillesTemp/:id", familleTempController.updateFamilleTemp);

router.delete("/famillesTemp/:id", familleTempController.deleteFamilleTemp);

module.exports = router;
