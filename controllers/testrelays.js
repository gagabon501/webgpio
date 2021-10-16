const gpio = require("rpi-gpio");

exports.testRelays = function (req, res) {
  const PINS = [7, 11, 13, 15];
  const delay = 1000;
  const max = 20;

  console.log(`Max loop: ${max}`);

  for (let i = 0; i < max; i++) {
    gpio.setup(7, gpio.DIR_OUT, on7);

    function on7() {
      setTimeout(function () {
        gpio.write(7, 1, off7);
      }, delay);
    }

    function off7() {
      setTimeout(function () {
        gpio.write(7, 0, () => {
          gpio.destroy(() => console.log("closed pin7"));
          gpio.setup(11, gpio.DIR_OUT, on11);
        });
      }, delay);
    }

    function on11() {
      setTimeout(function () {
        gpio.write(11, 1, off11);
      }, delay);
    }

    function off11() {
      setTimeout(function () {
        gpio.write(11, 0, () => {
          gpio.destroy(() => console.log("closed pin11"));
          gpio.setup(13, gpio.DIR_OUT, on13);
        });
      }, delay);
    }

    function on13() {
      setTimeout(function () {
        gpio.write(13, 1, off13);
      }, delay);
    }

    function off13() {
      setTimeout(function () {
        gpio.write(13, 0, () => {
          gpio.destroy(() => console.log("closed pin13"));
          gpio.setup(15, gpio.DIR_OUT, on15);
        });
      }, delay);
    }

    function on15() {
      setTimeout(function () {
        gpio.write(15, 1, off15);
      }, delay);
    }

    function off15() {
      setTimeout(function () {
        gpio.write(15, 0, () => {
          gpio.destroy(() => console.log(`Iteration: ${i}`));
        });
      }, delay);
    }
  }

  res.redirect("/");
};
