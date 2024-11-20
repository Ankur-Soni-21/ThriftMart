const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    // get token from header
    const token = req.header("authorization").split(" ")[1];
    const decryptedToken = jwt.verify(token, process.env.jwt_secret);
    req.body.userId = decryptedToken.userId;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.send({
        success: false,
        message: "Session expired. Please log in again.",
      });
    } else {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
};