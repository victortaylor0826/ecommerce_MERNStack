const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //Get token from the header
  const token = req.header("Authorization");

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token found, Auth Denied!!" });
  }

  try {
    const pureToken = token.replace("Bearer ", "");
    const decoded = jwt.verify(pureToken, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Not a valid Token", err });
  }
};
