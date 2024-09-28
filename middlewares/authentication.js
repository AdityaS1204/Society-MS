const { validateToken } = require("../services/authentication");
const User = require("../models/user");

function checkForAuthenticationCookie(cookieName) {
  return async (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.userPayload = userPayload;
      const user = await User.findById(userPayload._id);
      if (!user) {
        return res.status(401).send("User not found");
      }
      req.user = user; 
      return next();
    } catch (error) {
      console.log("token error");
      return next();
    }
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
