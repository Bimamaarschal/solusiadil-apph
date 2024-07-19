const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const cekJWT = require('../middlewares/cekJWT');

router.get("/datablog",  cekJWT, blogController.getDatablog);
router.get("/tulisblog",  cekJWT, blogController.getTulisblog);
router.post('/kirimblog', blogController.blogbaruData);
router.get("/lihatblog", cekJWT, blogController.bloglihatData);
router.get('/bacablog', cekJWT,blogController.blogbacaData);

module.exports = router;
