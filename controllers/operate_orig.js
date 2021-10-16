const gpio = require("rpi-gpio");

const PIN = 7;

function writePin(err, value) {
  if (err) throw err;
  gpio.write(PIN, !value, function (err) {
    if (err) throw err;
    console.log(`Written to pin ${PIN}: ${value}`);
  });
}

function readPin(err) {
  if (err) throw err;
  gpio.read(PIN, (err, value) => {
    if (err) throw err;
    gpio.setup(PIN, gpio.DIR_OUT, (err) => writePin(err, value));
  });
}

exports.operateDoor = (req, res) => {
  gpio.setup(PIN, gpio.DIR_IN, readPin);
  res.redirect("/");
};
