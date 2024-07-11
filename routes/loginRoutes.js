const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const cekLogin = require("../middlewares/cekLogin");

router.get("/masuk", cekLogin, (req, res) => {
  const { authError } = req;
  res.render("masuk", { authError });
});

router.post("/login", loginController.loginApph);
router.get("/logout", loginController.logoutApph);

module.exports = router;
