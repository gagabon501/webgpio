const gpio = require("onoff").Gpio;

// exports.garage_status = (req, res) => {
//   const useLed = (led, value) => led.writeSync(value);

//   let led;

//   if (Gpio.accessible) {
//     led = new Gpio(16, "out");
//     // more real code here
//   } else {
//     led = {
//       writeSync: (value) => {
//         console.log("virtual led now uses value: " + value);
//       },
//     };
//   }

//   useLed(led, 1);
// };

exports.garage_status = (req, res) => {
  const SENSOR1_PIN16 = 16;
  const SENSOR2_PIN18 = 18;

  if (gpio.accessible) {
    const pin16 = new gpio(SENSOR1_PIN16, "out");
    const pin18 = new gpio(SENSOR2_PIN18, "out");

    // pin22.read((err, value) => {
    //   if (err) throw err;
    //   console.log(`pin22: ${value}`);

    //   if (value) {
    //     //circuit open
    //     pin18.read((err, value) => {
    //       if (err) throw err;
    //       console.log(`pin18: ${value}`);
    //       if (value) {
    //         //opening/closing
    //         console.log("DOOR OPENING/CLOSING");

    //         //note here that the 'res' object is available even if you are already inside a deep function
    //         res.render("welcome", {
    //           status: "DOOR OPENING/CLOSING",
    //           bgclass: "card card-body text-center door_opening_closing",
    //         });
    //       } else {
    //         console.log("DOOR OPEN");
    //         //note here that the 'res' object is available even if you are already inside a deep function
    //         res.render("welcome", {
    //           status: "DOOR OPEN",
    //           bgclass: "card card-body text-center door_open",
    //         });
    //       }
    //     });
    //   } else {
    //     console.log("DOOR CLOSED");

    //     //note here that the 'res' object is available even if you are already inside a deep function
    //     res.render("welcome", {
    //       status: "DOOR CLOSED",
    //       bgclass: "card card-body text-center door_closed",
    //     });
    //   }
    // });

//    pin16.read((err, value) => {
//      if (err) throw err;
//      console.log(`pin16: ${value}`);
//    });

    pin18.read((err, value) => {
      if (err) throw err;
      console.log(`pin18: ${value}`);
    });

    res.render("welcome", {
      status: "TESTING",
      bgclass: "card card-body text-center door_open",
    });
  } else {
    console.log("System does not support GPIOs");
    res.send("System does not support GPIOs");
  }
};
