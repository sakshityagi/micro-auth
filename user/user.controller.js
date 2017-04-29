'use strict';

const User = require('./user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

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
exports.create = function (req, res) {
    let args = req.body;
    bcrypt.hash(args.password, null, null, function(err, hash) {
        // Store hash in your password DB.
        if(err || !hash){
            return res.sendStatus(400);
        }
        args.password = hash;
        const newUser = new User(args);
        newUser.save()
            .then(function(user) {
                var token = jwt.sign({ _id: user._id }, "micro-auth", {
                    expiresIn: 60 * 60 * 5
                });
                return res.json({ token });
            })
            .catch(validationError(res));
    });
};

/**
 * Update user info
 */
exports.updateUser = function (req, res) {};

/**
 * Get my info
 */
exports.me = function(req, res, next) {};

exports.findByToken = (token, cb) => {
    process.nextTick(() => {

    });
};
