const gpio = require("rpi-gpio").promise;
const appLogger = require("./logger"); //using winston

exports.garageStatus = async (req, res) => {
  if (!req.session.authenticated) return res.redirect("/logout");
  const SENSOR1_PIN16 = 16;
  const SENSOR2_PIN18 = 18;

  gpio
    .setup(SENSOR2_PIN18, gpio.DIR_HIGH)
    .then(() => callback_18())
    .catch((err) => {
      appLogger.error("Error at setup pin18: " + err.toString());
    });

  const callback_18 = () => {
    gpio
      .read(SENSOR2_PIN18)
      .then((value) => {
        appLogger.info(`pin18: ${value}`);
        if (value) {
          console.log("DOOR CLOSED");
          appLogger.info("DOOR CLOSED");

          res.json({
            status: "DOOR CLOSED",
            bgclass: "card card-body text-center text-white door_closed",
            btnlabel: "Operate",
          });
        } else {
          console.log("DOOR OPEN");
          appLogger.info("DOOR OPEN");

          res.json({
            status: "DOOR OPEN",
            bgclass: "card card-body text-center text-white door_open",
            btnlabel: "Operate",
          });
        }
      })
      .catch((err) => {
        appLogger.error("Error at setup pin18: " + err.toString());
      });

    // .catch((err) => console.log("Error at read pin18: ", err.toString()));
  };
};
