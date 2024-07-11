const express = require("express");
const router = express.Router();
const konsultasiController = require("../controllers/konsultasiController");
const cekJWT = require('../middlewares/cekJWT');

router.get("/konsultasi", konsultasiController.getKonsultasi);
router.get("/konsultasidt", cekJWT, konsultasiController.getDetailKonsultasi);
router.post('/updateKonsultasi', konsultasiController.updateKonsultasi);

module.exports = router;
