const gpio = require("onoff").Gpio;
const DOOR1_PIN7 = 7;

exports.closeDoor = (req, res) => {
  const door = new gpio(DOOR1_PIN7, "out");
  door.write(0, (err) => {
    if (err) throw err;
    console.log("Door switched off");
    res.redirect("/");
  });
};
