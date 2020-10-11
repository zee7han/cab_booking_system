const express = require('express');
const validate = require('express-validation');

const controller = require('../controllers/auth');
const validation = require('../validations/auth');
const {
    checkDuplicateUsernameOrEmail
} = require("../middlewares/authentication")

const router = express.Router();

router.route('/signup').post(validate(validation.signup), checkDuplicateUsernameOrEmail, controller.signup);
router.route('/signin').post(validate(validation.signin), controller.signin);

module.exports = router;