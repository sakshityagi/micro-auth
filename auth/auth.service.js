'use strict';

const User = require('../user/user.model');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = function (req, res) {
    const args = req.query;
    jwt.verify(args.token, "micro-auth", (err, decoded) => {
        if (err) {
            return res.status(401).send(false);
        }
        User.findOne({_id: decoded._id}, (err, user) => {
            if(err && !user) return res.status(401).send(false);
            return res.status(200).send(true);
        })
    })
};