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
            return res.status(400).send("Unable to create hashed password.");
        }
        args.password = hash;
        const newUser = new User(args);
        newUser.save()
            .then(function(user) {
                var token = jwt.sign({ _id: user._id }, "micro-auth", {
                    expiresIn: 60 * 60 * 5
                });
                return res.status(200).send({ token });
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

/**
 * Login a user with valid credentials
 */
exports.login = function (req, res) {
    let args = req.body;
    User.findOne({
        'username':args.username
    }).then(function(user) {
        if(!user){
            return res.status(401).send("Couldn't find user.");
        }
        bcrypt.compare(args.password, user.password, function(err, result) {
            if(result){
                var token = jwt.sign({ _id: user._id }, "micro-auth", {
                    expiresIn: 60 * 60 * 5
                });
                return res.status(200).send({ token });
            } else {
                return res.status(401).send("Invalid username or password");
            }
        });
    });
};
