//Middleware functions are called sequentially
//In this case, express.json() is first, followed by Logging and Authenticating

function log(req, res, next) {
  console.log('Logging...');
  next();
}

module.exports = log;
