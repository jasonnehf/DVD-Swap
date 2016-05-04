var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/me', stormpath.getUser, (req, res) => {
  console.log('user', req.user)
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(401).send('Not logged in');
  }
});

var fakeUser = {
  name: "blah",
  haves: [],
  wants: []
}


router.put('/have', (req, res) => {
  fakeUser.haves.push(req.body)
  res.send(fakeUser)
})



module.exports = router;

