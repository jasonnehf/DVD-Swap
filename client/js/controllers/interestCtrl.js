'use strict'

angular.module('dvdSwap')
.controller('interestCtrl', function($scope, UserService) {

  angular.element(document).ready(function(){

    $(".belowFoldButt").click(function() {
      $('html,body').animate({
        scrollTop: $(".below-fold").offset().top - 62},
        'slow');
    });

  })


var movies = ["movie1", "movie2", "movie3"];

 $scope.getMatches = function(text){
  return movies.filter(movie=> movie.includes(text))


}

})