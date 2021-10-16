const gpio = require("rpi-gpio");

exports.garageStatus = (req, res) => {
  const SENSOR1_PIN16 = 16;
  const SENSOR2_PIN18 = 18;

  function callback_18(err) {
    if (err) throw err;
    gpio.read(SENSOR2_PIN18, (err, value) => {
      if (err) throw err;
      if (value === false) {
        console.log("DOOR OPEN");

        //note here that the 'res' object is available even if you are already inside a deep function
        res.render("welcome", {
          status: "DOOR OPEN",
          bgclass: "card card-body text-center door_open",
        });
      } else {
        console.log("DOOR OPENING/CLOSING");

        //note here that the 'res' object is available even if you are already inside a deep function
        res.render("welcome", {
          status: "DOOR OPENING/CLOSING",
          bgclass: "card card-body text-center door_opening_closing",
        });
      }
    });
  }

  function callback_16(err) {
    if (err) throw err;
    gpio.read(SENSOR1_PIN16, (err, value) => {
      if (err) throw err;
      if (value === false) {
        console.log("DOOR CLOSED");

        //note here that the 'res' object is available even if you are already inside a deep function
        res.render("welcome", {
          status: "DOOR CLOSED",
          bgclass: "card card-body text-center door_closed",
        });
      } else {
        gpio.setup(SENSOR2_PIN18, gpio.DIR_IN, callback_18);
      }
    });
  }

  gpio.reset();
  gpio.setup(7, gpio.DIR_OUT, (err) => {
    gpio.write(7, 1, (err) => {
      if (err) throw err;
      console.log("switched on pin7");
    });
  });
  //gpio.destroy(() => console.log("pins unexported"))
  gpio.setup(SENSOR1_PIN16, gpio.DIR_IN, callback_16);
};
