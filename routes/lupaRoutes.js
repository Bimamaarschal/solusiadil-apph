const express = require("express");
const router = express.Router();
const lupaController = require("../controllers/lupaController");

router.get('/lupa', lupaController.Lupa);
router.post('/ceklupa', lupaController.cekLupa);
router.post('/updatePassword', lupaController.updatePassword);

module.exports = router;
