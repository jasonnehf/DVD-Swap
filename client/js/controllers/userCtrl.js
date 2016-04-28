'use strict'

angular.module('dvdSwap')
.controller('userCtrl', function($scope, UserService, $rootScope) {


 UserService.getUser()
 .then(function(res) {
  // $scope.user = res.data
  $rootScope.user = res.data
  console.log('$scope.user ' , $rootScope.user);


}, function(err){
  $rootScope.user = null;
  console.log('err', err);
});



 var movies = ["movie1", "movie2", "movie3"];

 $scope.getMatches = function(text){
  return movies.filter(movie=> movie.includes(text))
}


})