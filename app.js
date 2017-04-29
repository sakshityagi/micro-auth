var express = require('express');
var mongoose = require('mongoose');
var open = require('open');
var bodyParser = require('body-parser')
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

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/chat-app');
mongoose.connection.on('error', function (err) {
      console.error('MongoDB connection error: ' + err);
      process.exit(-1);
    }
);

require('./routes')(app);
app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
