exports.checkStatus = function (req, res) {
  if (!req.session.authenticated) return res.redirect("/logout");
  res.redirect("/home");
};
