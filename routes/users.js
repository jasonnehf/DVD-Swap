var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/', function(req, res) { // done!
  console.log('req.bodyGet:',req.body);
  User.find({}, function(err, users) {
    console.log('user:',users);
    console.log('err', err);
    res.status(err ? 400 : 200).send(err || users);

  });
});
// router.post('/', function(req, res) { // done!
//   console.log('req.bodyGet:',req.body);
//   User.find({}, function(err, users) {
//     console.log('user:',users);
//     console.log('err', err);
//     res.status(err ? 400 : 200).send(err || users);
//
//   });
// });

router.post('/authenticate', function(req, res) { //authenticate done. POST
  User.authenticate(req.body, function(err, user) {
    if(err) {
        res.status(400).send(err);
      } else {
        var token = user.generateToken();
        res.cookie('dvdcookies', token).send(user);
      }
  })
})



router.post('/register', function(req, res) {
  console.log("HIt register in user route file"); //done?
  User.register(req.body, function(err, user) {
    console.log("req.bodyReg", req.body);
    console.log("user",user);
    if(err) {
      res.status(400).send(err)
    }else {
      var token = user.generateToken();
      res.cookie('dvdcookie', token).send(user);
      console.log('tokenPost', token);
    }
  });
});

router.put('/:id', function(req, res) { // Done! PUT
  User.findByIdAndUpdate(req.params.id,
    { $set: req.body },
    { new: true },
    function(err, user) {
      res.status(err ? 400 : 200).send(err || user);
    });
  });

module.exports = router;
