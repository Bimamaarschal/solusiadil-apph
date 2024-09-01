const express = require("express");
const router = express.Router();
const sertifikatController = require("../controllers/sertifikatController");
const cekJWT = require('../middlewares/cekJWT');
const upload  = require('../middlewares/upload');

router.get("/datasertifikat",  cekJWT, sertifikatController.getDatasertifikat);
router.get("/tulissertifikat",  cekJWT, sertifikatController.getTulissertifikat);
router.get("/lihatsertifikat", cekJWT, sertifikatController.sertifikatlihatData);
router.get("/pengajuansertifikat", cekJWT, sertifikatController.sertifikatlihatData2);
router.get("/bacasertifikat", cekJWT,sertifikatController.sertifikatbacaData);
router.get("/hapus", cekJWT, sertifikatController.hapusData);
router.post("/kirimsertifikat", cekJWT, sertifikatController.sertifikatbaruData);
router.get("/cetaksertifikat", cekJWT, sertifikatController.sertifikatCetak);

module.exports = router;
