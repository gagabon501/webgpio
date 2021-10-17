// Login GET route
exports.login_get = (req, res) => {
  return res.render("login", {
    title: "Login",
    errmsg: "",
  });
};

//Login POST route
exports.login_post = (req, res) => {
  if (req.body.password === process.env.PASSWD) {
    req.session.authenticated = true;
    console.log(req.session);
    res.redirect("/home");
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
