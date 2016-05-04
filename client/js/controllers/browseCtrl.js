angular.module('dvdSwap')
.controller('browseCtrl', function($scope, MovieService){

//get all movies people want to trade on page load ) 12 at a time?

MovieService.getAllHaves()
  .then(function(res){
    $scope.movies = res.data
    console.log($scope.movies)
  }, function(err){
    console.error(err)
  })





// this.genres = ('comedy romance adventure').split(' ').map(function (genres) { return { genre: genres }; });
// console.log(this.genres) 

})