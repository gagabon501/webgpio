const gpio = require("rpi-gpio");
const appLogger = require("./logger"); //using winston

const PIN = 7;
const DELAY = 1000; //1-second
const RESET_DELAY = 2000; //1-second

function writePin(err) {
  if (err) throw err;

  //switch-off first
  gpio.write(PIN, false, function (err) {
    if (err) throw err;

    //then delay for 1-second, then switch-on
    setTimeout(() => gpio.write(PIN, true), DELAY);

    //wait for another 2-seconds to get ready for the next operation - button push
    setTimeout(() => gpio.write(PIN, false), RESET_DELAY);
  });
}

exports.operateDoor = async (req, res) => {
  if (!req.session.authenticated) return res.redirect("/logout");
  gpio.setup(PIN, gpio.DIR_OUT, writePin);
  res.redirect("/home");
};
