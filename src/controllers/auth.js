const httpStatus = require('http-status');
const {
  registerUser,
  loginUser
} = require('../services/auth')

exports.signup = (req, res, next) => {
  registerUser(req.body).then((response) => {
    if (response.status == 200) {
      return res.status(httpStatus.OK).json(response);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }).catch((er) => {
    next(er)
  })
};

exports.signin = (req, res, next) => {
  loginUser(req.body).then((response) => {
    if (response.status == 200) {
      return res.status(httpStatus.OK).json(response);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }).catch((er) => {
    next(er)
  })
};