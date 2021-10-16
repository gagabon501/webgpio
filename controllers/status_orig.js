const gpio = require("rpi-gpio");

exports.garageStatus = function (req, res) {
  const SENSOR1_PIN16 = 16;
  const SENSOR2_PIN18 = 18;

  function callback_18(err) {
    if (err) throw err;
    gpio.read(SENSOR2_PIN18, (err, value) => {
      console.log(`pin18: ${value}`);
      if (value === false) {
        console.log("DOOR OPEN");

        //note here that the 'res' object is available even if you are already inside a deep function
        // res.render("welcome", {
        //   status: "DOOR OPEN",
        //   bgclass: "card card-body text-center door_open",
        //   btnlabel: "Close",
        // });
        res.json({
          status: "DOOR OPEN",
          bgclass: "card card-body text-center text-white door_open",
          btnlabel: "Close",
        });
      } else {
        console.log("DOOR OPENING/CLOSING");

        //note here that the 'res' object is available even if you are already inside a deep function
        // res.render("welcome", {
        //   status: "DOOR OPENING/CLOSING",
        //   bgclass: "card card-body text-center door_opening_closing",
        //   btnlabel: "Operate",
        // });

        res.json({
          status: "DOOR OPENING/CLOSING",
          bgclass: "card card-body text-center text-white door_opening_closing",
          btnlabel: "Operate",
        });
      }
    });
  }

  function callback_16(err) {
    if (err) throw err;
    gpio.read(SENSOR1_PIN16, (err, value) => {
      if (err) throw err;
      console.log(`pin16: ${value}`);
      if (value) {
        //Notes: 15-Oct-21
        //the setting gpio.DIR_HIGH as the initial state solved my problem of the incorrect reading the pins at the start!!!
        //previously, I was relying on the SiriGarage code to initialize the system and get the accurate readings. Now I found the solution!
        gpio.setup(SENSOR2_PIN18, gpio.DIR_HIGH, callback_18);
      } else {
        console.log("DOOR CLOSED");

        //note here that the 'res' object is available even if you are already inside a deep function
        // res.render("welcome", {
        //   status: "DOOR CLOSED",
        //   bgclass: "card card-body text-center door_closed",
        //   btnlabel: "Open",
        // });
        res.json({
          status: "DOOR CLOSED",
          bgclass: "card card-body text-center text-white door_closed",
          btnlabel: "Open",
        });
      }
    });
  }

  gpio.setup(SENSOR1_PIN16, gpio.DIR_HIGH, callback_16);
};
