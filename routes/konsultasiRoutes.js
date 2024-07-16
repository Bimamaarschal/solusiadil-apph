const express = require("express");
const router = express.Router();
const konsultasiController = require("../controllers/konsultasiController");
const cekJWT = require('../middlewares/cekJWT');

router.get("/konsultasi",  cekJWT, konsultasiController.getKonsultasi);
router.get("/konsultasidt", cekJWT, konsultasiController.getDetailKonsultasi);
router.get("/konsultasidt2", cekJWT, konsultasiController.getDetailKonsultasi2);
router.get("/konsultasilihat", cekJWT, konsultasiController.getDetailKonsultasi3);
router.post('/updateKonsultasi', konsultasiController.updateKonsultasi);
router.post('/updateKonsultasi1', konsultasiController.updateKonsultasi1);

module.exports = router;
