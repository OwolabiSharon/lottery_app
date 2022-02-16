const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
 const ApiError = require('../utils/apiError');


module.exports = (req, _, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.accountData = decoded;
    next();
  } catch (error) {
    if (error.message === 'jwt expired') {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Jwt expired');
    }
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Auth Failed');
  }
};
