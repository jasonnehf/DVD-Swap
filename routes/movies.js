var express = require('express');
var router = express.Router();

//****** change according to our movie model

var fakeMovies = [ {
  title: 'AHere is a Title',
  poster: "http://placehold.it/150x150" ,
  genre:  'comedy',
  year: '1990'
}, {
  title: 'LHere is a Title',
  poster: "http://placehold.it/150x150" ,
  genre:  'comedy',
  year: '1990'
}, {
  title: 'CHere is a Title',
  poster: "http://placehold.it/150x150" ,
  genre:  'comedy',
  year: '2002',
}, {
  title: 'Here is a Title',
  poster: "http://placehold.it/150x150" ,
  genre:  'comedy',
  year: '1990',
}, {
  title: 'DHere is a Title',
  poster: "http://placehold.it/150x150" ,
  genre:  'comedy',
  year: '1990',
}, {
  title: 'Here is a Title',
  poster: "http://placehold.it/150x150" ,
  genre:  'comedy',
  year: '1999',
}, {
  title: 'FHere is a Title',
  poster: "http://placehold.it/150x150" ,
  genre:  'comedy',
  year: '1990'
}, {
  title: 'MHere is a Title',
  poster: "http://placehold.it/150x150" ,
  genre:  'comedy',
  year: '2000'
}, {
  title: 'Here is a Title',
  poster: "http://placehold.it/150x150" ,
  genre:  'comedy',
  year: '1990',
}, {
  title: 'ZHere is a Title',
  poster: "http://placehold.it/150x150" ,
  genre:  'comedy',
  year: '1990',
}, {
  title: 'Here is a Title',
  poster: "http://placehold.it/150x150" ,
  genre:  'comedy',
  year: '1990',
}, {
  title: 'Here is a Title',
  poster: "http://placehold.it/150x150" ,
  genre:  'comedy',
  year: '1980'
}]



router.get('/have', function (req, res) {
//   have.find({}, (err, data) => {
//     if(err) {
//       return res.status(499).send(err)
//     }
    res.send(fakeMovies);
  // })
})

router.get('/fake', function(req, res) {
  res.send(fakeMovies);
})



module.exports = router;

