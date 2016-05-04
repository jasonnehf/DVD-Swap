'use strict'

angular.module('dvdSwap')
.controller('userCtrl', function($scope, UserService, $rootScope, $state) {


 UserService.getUser()

 .catch(function(res){
 $state.go('interest')
 })
 
var movies = ["movie1", "movie2", "movie3", "movie4"];

 $scope.getMatches = function(text){
  return movies.filter(movie=> movie.includes(text))
}

$scope.movieHave = [];

// add disable button if nothing is in search bar
$scope.addHave = function(searchText){
  $scope.movieHave.push(searchText)
}

$scope.movieWant = [];
$scope.addWant= function(searchText2){
  $scope.movieWant.push(searchText2)
}


})

