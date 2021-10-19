const logger = require("../controllers/logger");
module.exports = function (err, req, res, next) {
  //Log here the error to winston
  //here we imported winston configuration from 'logger.js' and passed the error message (err.message)
  //   if (res.status === 500) {
  //     res.status(500).send("Server error!");
  //     logger.error(
  //       `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
  //         req.originalUrl
  //       } - ${req.method} - ${req.ip}`
  //     );
  //   } else if (res.status === 400) {
  //     res.status(404).send("PAGE NOT FOUND");
  //     logger.error(
  //       `400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  //     );
  //   } else {
  //     logger.error(`Server error: ${err.message}`);
  //   }
  //   res.status(404).send("PAGE NOT FOUND");
  //   logger.error(
  //     `400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  //   );
  // logger.error(
  //   `400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  // );
  logger.error(`Server error: ${err.message}`);
  //   next(res.json({ msg: "Invalid password" }));
  next();
  //   console.log("Error: ", err.message);
};
