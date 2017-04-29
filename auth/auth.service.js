'use strict';

const User = require('../user/user.model');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = function (req, res) {
    const args = req.query;
    jwt.verify(args.token, "micro-auth", (err, decoded) => {
        if (err) {
            return res.sendStatus(401).send('Failed to authenticate token.');
        }
        User.findOne({_id: decoded._id}, (err, user) => {
            if (user) return res.sendStatus(200);
            else return res.sendStatus(401);
        })
    })
};