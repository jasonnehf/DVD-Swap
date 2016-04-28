'use strict'

angular.module('dvdSwap')
.controller('userCtrl', function($scope, UserService, $rootScope, $state) {


 UserService.getUser()

 .catch(function(res){
 $state.go('interest')
 })
 
 var movies = ["movie1", "movie2", "movie3"];

 $scope.getMatches = function(text){
  return movies.filter(movie=> movie.includes(text))
}


})

