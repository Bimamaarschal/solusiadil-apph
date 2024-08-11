const express = require("express");
const router = express.Router();
const berandaController = require("../controllers/berandaController");
const cekBeranda = require("../middlewares/cekBeranda");
const cekLoginMasuk = require("../middlewares/cekLoginMasuk");

router.get("/beranda", cekBeranda, berandaController.getBeranda);


router.get("/tentangkami", (req, res) => {
  res.render("tentangkami");
});

router.get("/blog", cekLoginMasuk, (req, res) => {
  res.render("blog");
});

router.get("/layanan", cekLoginMasuk, (req, res) => {
  res.render("layanan");
});

router.get("/kontak", (req, res) => {
  res.render("kontak");
});

router.get("/faq", (req, res) => {
  res.render("faq");
});

router.get("/sop", (req, res) => {
  res.render("sop");
});

router.get("/gabung", cekLoginMasuk, (req, res) => {
  res.render("gabung");
});

router.get("/jdih", cekLoginMasuk, (req, res) => {
  res.render("jdih");
});

router.get("/panduan", cekLoginMasuk, (req, res) => {
  res.render("panduan");
});

router.get("/tampiljwt", cekLoginMasuk, (req, res) => {
  res.render("login");
});

module.exports = router;
