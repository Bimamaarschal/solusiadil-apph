const express = require("express");
const router = express.Router();
const beritaController = require("../controllers/beritaController");
const cekJWT = require('../middlewares/cekJWT');
const upload  = require('../middlewares/upload');

router.get("/databerita",  cekJWT, beritaController.getDataberita);
router.get("/tulisberita",  cekJWT, beritaController.getTulisberita);
router.get("/lihatberita", cekJWT, beritaController.beritalihatData);
router.get('/bacaberita', cekJWT,beritaController.beritabacaData);
router.get('/hapus', cekJWT, beritaController.hapusData);

router.post('/kirimberita', beritaController.beritabaruData);

module.exports = router;
