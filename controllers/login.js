const appLogger = require("./logger");

// Login GET route
exports.login_get = (req, res, next) => {
  return res.render("login", {
    title: "Login",
    error_msg: req.flash("error_msg"), //get data from the global variable locals.error_msg
  });
};

//Login POST route
exports.login_post = (req, res, next) => {
  if (req.body.password === process.env.PASSWD) {
    req.session.authenticated = true;
    console.log(req.session);
    res.redirect("/home");
  } else {
    appLogger.error(
      `Invalid password: client ip: ${req.connection.remoteAddress} - password: ${req.body.password}`
    );
    req.flash("error_msg", "Invalid password"); //fill-in the global variable locals.error_msg: res.locals.error_msg = req.flash("error_msg");
    res.redirect("/login");
  }
};

// GET for logout logout
exports.logout_get = (req, res, next) => {
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
