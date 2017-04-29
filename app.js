var express = require('express');
var app = express();
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var user = require('./user');


passport.use(new Strategy(
  function(token, cb) {
    db.users.findByToken(token, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  }));


app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(3000, function () {
  console.log('Micro auth app listening on port 3000!')
});
