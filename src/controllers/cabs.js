const httpStatus = require('http-status');
const {
  onBoardCab,
  fetchCabs,
  allocateCab,
  deportCab
} = require('../services/cabs')

exports.onBoardCab = (req, res, next) => {
  onBoardCab(req.body).then((response) => {
    if (response.status == 200) {
      return res.status(httpStatus.OK).json(response);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }).catch((er) => {
    next(er)
  })
};

exports.fetchCabs = (req, res, next) => {
  fetchCabs(req.query).then((response) => {
    if (response.status == 200) {
      return res.status(httpStatus.OK).json(response);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }).catch((er) => {
    next(er)
  })
};

exports.allocateCab = (req, res, next) => {
  allocateCab(req.body).then((response) => {
    if (response.status == 200) {
      return res.status(httpStatus.OK).json(response);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }).catch((er) => {
    next(er)
  })
};

exports.deportCab = (req, res, next) => {
  deportCab(req.body).then((response) => {
    if (response.status == 200) {
      return res.status(httpStatus.OK).json(response);
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }).catch((er) => {
    next(er)
  })
};