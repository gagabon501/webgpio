const express = require("express");
const router = express.Router();
const home = require("../controllers/home");
const status = require("../controllers/status");
const checkStatus = require("../controllers/checkStatus");
const operate = require("../controllers/operate");
const publicIp = require("../controllers/getPublicIp");

router.get("/", home.homePage);
router.get("/status", status.garageStatus);
router.get("/checkStatus", checkStatus.checkStatus);
router.get("/operate", operate.operateDoor);
router.get("/getPip", publicIp.getPublicIp);

module.exports = router;
