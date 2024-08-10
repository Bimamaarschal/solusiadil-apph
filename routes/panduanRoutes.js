const express = require("express");
const router = express.Router();
const panduanController = require("../controllers/panduanController");
const cekJWT = require('../middlewares/cekJWT');
const upload  = require('../middlewares/upload');

router.get("/datapanduan",  cekJWT, panduanController.getDatapanduan);
router.get("/tulispanduan",  cekJWT, panduanController.getTulispanduan);
router.get("/lihatpanduan", cekJWT, panduanController.panduanlihatData);
router.get('/bacapanduan', cekJWT,panduanController.panduanbacaData);

router.post('/kirimpanduan', upload.single('isi_2'), panduanController.panduanbaruData);

module.exports = router;
