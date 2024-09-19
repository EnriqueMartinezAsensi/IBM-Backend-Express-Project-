const jwt = require("jsonwebtoken");
const myTokenSecret = "palabra secreta";

const authenticate = (req, res, next) => {
  if (req.session.authorization) {
    token = req.session.authorization["accessToken"]; 
    jwt.verify(token, myTokenSecret, (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
};

const checkLoging = (req, res) => {
  return res
    .status(200)
    .json({ message: "Hello, You are an authenticated user. Congratulations!" });
};

module.exports = { authenticate, checkLoging }