const logger = require("../controllers/logger");
module.exports = function (err, req, res, next) {
  logger.error("Server error: " + err.message);
  res.status(500).send("Server error.");
};
