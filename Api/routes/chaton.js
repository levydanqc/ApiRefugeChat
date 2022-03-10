const express = require('express');

const chatonController = require('../controllers/chatonController');

const router = express.Router();

router.get('/chatons', chatonController.getChatons);

router.post('/chaton', chatonController.createChaton);

//router.get('/chatons/:chatonId', chatonController.getChaton);

//router.put('/chatons/:chatonId', chatonController.updateChaton);

//router.delete('/chatons/:chatonId', chatonController.deleteChaton);

module.exports = router;
