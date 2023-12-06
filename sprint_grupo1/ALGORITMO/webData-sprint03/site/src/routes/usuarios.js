var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});


router.post("/pegarDados", function (req, res) {
    usuarioController.buscarDados(req, res);
 })



 router.post("/pegarDadosSensores", function (req, res) {
    usuarioController.buscarDadosSensor(req, res);
 })


 router.post("/pegarDadosEndereco", function (req, res) {
    usuarioController.buscarDadosEndereco(req, res);
 })
module.exports = router;