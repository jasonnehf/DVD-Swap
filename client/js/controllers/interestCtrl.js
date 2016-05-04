'use strict'

angular.module('dvdSwap')
.controller('interestCtrl', function($scope, UserService, MovieService) {

  angular.element(document).ready(function(){

    $(".belowFoldButt").click(function() {
      $('html,body').animate({
        scrollTop: $(".below-fold").offset().top - 62},
        'slow');
    });

  })


  MovieService.getAllHaves()
  .then(function(res){
    $scope.movies = res.data
    
  }, function(err){
    console.error(err)
  })


  $scope.getMatches = function(text){
    text = text.toLowerCase();
    return $scope.movies.filter(movie=> movie.title.toLowerCase().includes(text)).splice(0,5)

  }








})