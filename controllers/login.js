const appLogger = require("./logger");

// Login GET route
exports.login_get = async (req, res, next) => {
  return res.render("login", {
    error_msg: req.flash("error_msg"), //get data from the flash variable (error_msg) that was set in the "/login" POST route
  });
};

//Login POST route
exports.login_post = async (req, res, next) => {
  if (req.body.password === process.env.PASSWD) {
    req.session.authenticated = true;
    console.log(req.session);
    res.redirect("/home");
  } else {
    appLogger.error(
      `Invalid password: client ip: ${req.connection.remoteAddress} - password: ${req.body.password}`
    );
    //NOTES: if not for flash() you would have to re-render the login.ejs screen so as to provide a feedback to the user that password entered was
    //       incorrect. Here because of flash(), I just needed to call a "redirect("/login") and set the "error_msg" variable with flash()
    req.flash("error_msg", "Invalid password"); //fill-in the flash variable (error_msg) so it is made available in the "/login" GET route
    res.redirect("/login");
  }
};

// GET for logout logout
exports.logout_get = async (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/login");
      }
    });
  }
};
