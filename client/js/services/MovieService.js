'use strict';

angular.module('dvdSwap').service('MovieService', function($http) {


//get all the movies from the have list 
this.getAllHaves = function(){
  return $http.get('/movies/have')
};


this.getMovieMatches = function(text){
  return $http.get(`http://www.omdbapi.com/?s=${text}&y=&plot=short&r=json`)
 // var newText = text.replace(/\s/g,"").toLowerCase().slice(0,5)
 // var firstLetter = newText.charAt(0)
 // console.log(' firstLetter  ' ,  firstLetter );
 // var url = `http://sg.media-imdb.com/suggests/${firstLetter}/${newText}.json`
 // console.log(url)
 // $http.jsonp(url)
 // .then(function(json) {
 //  console.log(json)
   // $scope.response = json.data.data;
 // });

}


});