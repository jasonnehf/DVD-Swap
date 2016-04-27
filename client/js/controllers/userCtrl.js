'use strict'

angular.module('dvdSwap')
.controller('userCtrl', function($scope, UserService) {

 UserService.getUser()
 .then(function(res) {
  console.log(res)
  $scope.user = res.data
  console.log('$scope.user ' , $scope.user);


}, function(err){
  console.log('err', err)
});


 var movies = ["movie1", "movie2", "movie3"];

 $scope.getMatches = function(text){
  return movies.filter(movie=> movie.includes(text))


}


})