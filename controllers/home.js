exports.homePage = function (req, res) {
  if (!req.session.authenticated) return res.redirect("/logout");
  res.render("welcome");
};
