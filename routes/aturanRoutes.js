const express = require("express");
const router = express.Router();
const aturanController = require("../controllers/aturanController");
const cekJWT = require('../middlewares/cekJWT');
const upload  = require('../middlewares/upload');

router.get("/dataaturan",  cekJWT, aturanController.getDataaturan);
router.get("/tulisaturan",  cekJWT, aturanController.getTulisaturan);
router.get("/lihataturan", cekJWT, aturanController.aturanlihatData);
router.get('/bacaaturan', cekJWT,aturanController.aturanbacaData);

router.post('/kirimaturan', upload.single('isi_2'), aturanController.aturanbaruData);

module.exports = router;
