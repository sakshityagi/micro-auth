const express = require('express');
const mongoose = require('mongoose');
const open = require('open');
const bodyParser = require('body-parser')
const user = require('./user');

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
