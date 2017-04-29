const express = require('express');
const mongoose = require('mongoose');
const open = require('open');
const bodyParser = require('body-parser')
const user = require('./user');

const port = 3000;
const app = express();
const config = {
    mongo: {
        host: "ds123371.mlab.com:23371/heroku_x1gzz76r",
        user: "microservice-integration",
        password: "igdefault"
    }
};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(`mongodb://${config.mongo.user}:${config.mongo.password}@${config.mongo.host}`);
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
    console.log("App is working ...");
    open(`http://localhost:${port}`);
  }
});
