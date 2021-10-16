const gpio = require("rpi-gpio");

exports.garage_status = function (req, res) {
  const SENSOR1_PIN16 = 16;
  const SENSOR2_PIN18 = 18;

  function gsetup16(err, res) {
    if (err) throw err;
    gpio.read(SENSOR1_PIN16, (err, value) => goread16(err, value, res));
  }

  function goread16(err, value, res) {
    if (err) throw err;
    if (value === false) {
      console.log("DOOR CLOSED");
      res.render("welcome", { status: "DOOR CLOSED" });
    } else {
      gpio.setup(SENSOR2_PIN18, gpio.DIR_IN, (err) => gsetup18(err, res));
    }
  }

  function gsetup18(err, res) {
    if (err) throw err;
    gpio.read(SENSOR2_PIN18, (err, value) => goread18(err, value, res));
  }

  function goread18(err, value, res) {
    if (err) throw err;
    if (value === false) {
      console.log("DOOR OPEN");
      res.render("welcome", { status: "DOOR OPEN" });
    } else {
      console.log("DOOR OPENING/CLOSING");
      res.render("welcome", { status: "DOOR OPENING/CLOSING" });
    }
  }

  //callback function here has only one parameter - that is for "error" -
  //hence the need to have another function gsetup(err, res) so that the 'res' object is included in the parameter
  gpio.setup(SENSOR1_PIN16, gpio.DIR_IN, (err) => gsetup16(err, res));
};
