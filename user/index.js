'use strict';


const express = require('express');
const controller = require('./user.controller');
//var auth = require('../auth/auth.service');

const router = express.Router();

//router.get('/me', auth.isAuthenticated(), controller.me);
//router.put('/:id', auth.isAuthenticated(), controller.updateUser);
router.post('/', controller.create);

module.exports = router;
