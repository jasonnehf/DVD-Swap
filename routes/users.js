var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/profile', stormpath.getUser, function (req, res) {
  console.log('user', req.user)
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(401).send('Not logged in');
  }
});



module.exports = router;

