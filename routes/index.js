var express = require('express');
var router = express.Router();


var User = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
});


router.get('/protected', function(req, res) {
  console.log('req.user:', req.user);
  res.send('wooo! protected!!');
});


router.use(User.authMiddleware);






module.exports = router;
