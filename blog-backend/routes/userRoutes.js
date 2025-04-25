const express = require("express");
const router = express.Router();
const {
  checkLogin,
  login,
  register,
  logout,
} = require("../service/userAuthSer");

router.get("/", checkLogin);
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

module.exports = router;
