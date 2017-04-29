'use strict';

var User = require('./user.model');

const validationError = (res, statusCode) => {
    statusCode = statusCode || 422;
    return function(err) {
        return res.status(statusCode).json(err);
    };
};

const handleError = (res, statusCode) => {
    statusCode = statusCode || 500;
    return function(err) {
        return res.status(statusCode).send(err);
    };
};

/**
 * Creates a new user
 */
exports.me = function (req, res) {};

/**
 * Update user info
 */
exports.updateUser = function (req, res) {};

/**
 * Get my info
 */
exports.me = function(req, res, next) {};
