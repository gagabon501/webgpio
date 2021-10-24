const express = require("express");
const router = express.Router();
const login = require("../controllers/login");
const home = require("../controllers/home");
const status = require("../controllers/status");
const checkStatus = require("../controllers/checkStatus");
const operate = require("../controllers/operate");
const publicIp = require("../controllers/getPublicIp");
const get404 = require("../controllers/get404");

router.get("/", (req, res) => {
  if (req.session.authenticated) res.redirect("/home");
  res.redirect("/login");
});
router.get("/login", login.login_get);
router.post("/login", login.login_post);
router.get("/logout", login.logout_get);
router.get("/home", home.homePage);
router.get("/status", status.garageStatus);
router.get("/checkStatus", checkStatus.checkStatus);
router.get("/operate", operate.operateDoor);
router.get("/getPip", publicIp.getPublicIp);
router.get("*", get404.get404);

module.exports = router;
