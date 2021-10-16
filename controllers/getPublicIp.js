const pip = require("public-ip");
exports.getPublicIp = async (req, res) => {
  const publicIp = await pip.v4();
  res.json({ publicIp: publicIp });
};
