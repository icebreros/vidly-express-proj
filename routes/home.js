const express = require('express');
const router = express.Router();

//rendering to PUG view engine
router.get('/', (req, res) => {
  console.log('home');
  res.render('index', {
    title: 'My Express App',
    message: 'Hello',
  });
});

module.exports = router;
