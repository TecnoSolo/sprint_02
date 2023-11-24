var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController")

router.get("/buscarUltimasMedidas/:idSensor", function (req, res) {
   dashboardController.buscarUltimasMedidas(req, res);
})
router.get("/buscarMedidasEmTempoReal/:idSensor", function (req, res) {
   dashboardController.buscarMedidasEmTempoReal(req, res);
})
router.get("/analyticsMedidasTempoReal/:idSensor", function (req, res) {
   dashboardController.analyticsMedidasTempoReal(req, res);
})

module.exports = router