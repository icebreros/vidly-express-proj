const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const genres = require('./routes/genres');
const home = require('./routes/home');
const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./middleware/logger');

app.set('view engine', 'pug');
app.set('views', './views'); //default value
//Middleware functions are called sequentially
//In this case, express.json() is first, followed by Logging and Authenticating
app.use(express.json()); //parses body of req, if JSON object it will populate req.body
app.use(express.urlencoded({ extended: true })); //key=value&key=value
app.use(express.static('public'));
app.use(helmet());
// Essentially, for any routes that start with endpoint '/api/genres', use genres router
app.use('/api/genres', genres);
app.use('/', home);

//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
}

dbDebugger('Connected to the database...'); //something like that
// app.use(logger);
// app.use(function (req, res, next) {
//   console.log('Logging...');
//   next();
// });
// app.use(function (req, res, next) {
//   console.log('Authenticating...');
//   next();
// });

//PORT LISTENING
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
