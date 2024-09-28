// const JWT = require('jsonwebtoken');
// const { create, validate } = require('../models/user');

// const secret = "superMan@1212";

// function createTokenForUser(user){
//     const payload = {
//         _id: user._id,
//         email:user.email,
//         profileImageURL:user.profileImageURL,
//         role: user.role,
//     };
//     const token = JWT.sign(payload,secret);
//     return token;
//     }

//     function vaildateToken(token) {
//         const payload = JWT.verify(token,secret);
//         return payload;
//     }

//     module.exports = {
//         createTokenForUser,
//         vaildateToken,
//     };


const { createTokenForUser, validateToken } = require('./authHelpers');

module.exports = {
  createTokenForUser,
  validateToken,
};
