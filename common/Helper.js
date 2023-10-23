const jwt = require("jsonwebtoken");
const secretKey = "chat-app-lBox@2023";

const createToken = (user, expirationTime = 1) => {
  expirationTime = expirationTime * 24 * 60 * 60;
  const payload = { user_id: user._id };
  const options = { expiresIn: expirationTime };
  return jwt.sign(payload, secretKey, options);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return "Token has expired.";
    } else {
      return "Invalid token.";
    }
  }
};

module.exports = {
  createToken,
  verifyToken,
};
