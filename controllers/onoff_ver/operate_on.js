const gpio = require("onoff").Gpio;
const DOOR1_PIN7 = 11;

exports.openDoor = (req, res) => {
  const door = new gpio(DOOR1_PIN7, "out");
  door.write(1^1, (err) => {
    if (err) throw err;
    console.log("Door switched on");
    door.read((err, value) => {
    if (err) throw err
    console.log(`value: ${value}`)
    })
    res.redirect("/");
  });
};
