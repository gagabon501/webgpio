const gpio = require("rpi-gpio");

const PIN = 7;

function write(err) {
  if (err) throw err;
  gpio.write(PIN, true, function (err) {
    if (err) throw err;
    console.log(`Written to pin ${PIN} - ON`);
  });
}

exports.openDoor = (req, res) => {
  gpio.setup(PIN, gpio.DIR_OUT, write);
  res.redirect("/");
};
