var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var User = require('../user/user.controller');


passport.use(new Strategy(
    function(token, cb) {
        User.findByToken(token, function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            return cb(null, user);
        });
    }));
