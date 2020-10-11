const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const cabRoutes = require('./cabs');

router.use('/auth', authRoutes);
router.use('/cabs', cabRoutes);

module.exports = router;