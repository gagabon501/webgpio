const gpio = require("rpi-gpio");

exports.test_relays = function (req, res) {
	const PINS = [7, 11, 13, 15];
	const delay = 2000;

	function testPin(pin) {
	  gpio.setup(pin, gpio.DIR_OUT, (err) => on(err, pin));
	}

	function on(err, pin) {
	  if (err) throw err;
	  console.log(pin);
	  const do_write = (pin) => setTimeout((pin) => {
	    console.log(`pin ${pin}: on`);
	    gpio.write(pin, 1, (err) => off(err, pin));
	  }, delay);
	  do_write(pin);
	}

	function off(err, pin) {
//	  if (err) throw err;
	  console.log(pin);
	  const do_off = (pin) => setTimeout((pin) => {
	    console.log(`pin ${pin}: off`);
	    gpio.write(pin, 0, destroy);
	  }, delay);
	  do_off(pin);
	}

	function destroy() {
	  //gpio.destroy(() => {
	  //  console.log("closed write pins");
	  //});
	  console.log("done");

	  return;
	}

	PINS.forEach((pin) => {
	  testPin(pin);
	});
	
	res.redirect("/");

}
