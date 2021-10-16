const gpio = require("rpi-gpio");

exports.testRelays = function (req, res) {
  const PINS = [7, 11, 13, 15];
  const delay = 2000;

  function testPin(pin) {
    gpio.setup(pin, gpio.DIR_OUT, (err) => on(err, pin));
  }

  function on(err, pin) {
    if (err) throw err;
    console.log(`on pin: ${pin}`);
    gpio.write(pin, 1, (err) => off(err, pin));
  }

  function off(err, pin) {
    if (err) throw err;
    console.log(`off pin: ${pin}`);
    gpio.write(pin, 0, destroy);
  }

  function destroy() {
    //gpio.destroy(() => {
    //  console.log("closed write pins");
    //});
    console.log("done");

    return;
  }

  //  for(let i=0; i < 5; i++) {
  PINS.forEach((pin) => {
    testPin(pin);
  });
  // }

  res.redirect("/");
};
