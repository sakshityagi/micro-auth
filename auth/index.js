'use strict';

const express = require('express');
const auth = require('./auth.service');

const router = express.Router();

router.get('/', auth.isAuthenticated);

module.exports = router;