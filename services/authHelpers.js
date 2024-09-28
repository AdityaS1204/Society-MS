// services/authHelpers.js
const JWT = require('jsonwebtoken');

const secret = "superMan@1212";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  return JWT.sign(payload, secret);
}

function validateToken(token) {
  return JWT.verify(token, secret);
}

module.exports = {
  createTokenForUser,
  validateToken,
};
