const gpio = require("rpi-gpio");

const PIN = 7;

function write(err) {
  if (err) throw err;
  gpio.write(PIN, false, function (err) {
    if (err) throw err;
    console.log(`Written to pin ${PIN} - OFF`);
  });
}

exports.closeDoor = () => {
  gpio.setup(PIN, gpio.DIR_OUT, write);
};
