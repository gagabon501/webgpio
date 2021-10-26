exports.showCamera = async (req, res) => {
  if (!req.session.authenticated) return res.redirect("/logout");
  res.render("camera");
};
