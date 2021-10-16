const gpio = require("rpi-gpio").promise;

// var gpiop = require("rpi-gpio").promise;

// gpiop
//   .setup(7, gpiop.DIR_OUT)
//   .then(() => {
//     return gpiop.write(7, true);
//   })
//   .catch((err) => {
//     console.log("Error: ", err.toString());
//   });

exports.test_relays = function (req, res) {
  const PINS = [7, 11, 13, 15];
  const delay = 2000;

  function testPinOn(pin) {
    gpio
      .setup(pin, gpio.DIR_OUT)
      .then((pin) => doWrite(pin))
      .catch((err) => {
        console.log("Error: ", err.toString());
      });
  }

  function doWrite(pin) {
    console.log(`pin ${pin} - ON`);
    gpio.write(pin, 1);
    gpio.destroy(() => console.log("done"));
  }

  function testPinOff(pin) {
    gpio
      .setup(pin, gpio.DIR_OUT)
      .then((pin) => {
        return gpio.write(pin, 0);
      })
      .catch((err) => {
        console.log("Error: ", err.toString());
      });
  }

  // PINS.forEach((pin) => {
  //   testPinOn(pin);
  // });

  testPinOn(7);

  res.redirect("/");
};
