const express = require('express');
const validate = require('express-validation');

const controller = require('../controllers/cabs');
const validation = require('../validations/cabs');

const {
    verifyToken
} = require("../middlewares/authentication")

const router = express.Router();

router.route('/onboard_cab').post(validate(validation.onBoardCab), verifyToken, controller.onBoardCab);
router.route('/fetch_cabs').get(validate(validation.fetchCabs), controller.fetchCabs);
router.route('/allocate_cab').post(validate(validation.allocateCab), verifyToken, controller.allocateCab);
router.route('/deport_cab').post(validate(validation.deportCab), verifyToken, controller.deportCab);

module.exports = router;