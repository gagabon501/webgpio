const gpio = require("onoff").Gpio;
const sensor_pin = 16;
if (gpio.accessible) {
  let sensor = new gpio(sensor_pin, "in");

  sensor.read((err, value) => {
    if (err) throw err;
    console.log(`sensor: ${value}`);
  });
} else {
  console.log("System does not support GPIOs");
  res.send("System does not support GPIOs");
}
