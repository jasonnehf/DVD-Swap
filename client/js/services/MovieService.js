'use strict';
angular.module('dvdSwap').service('MovieService', function($http) {


//get all the movies from the have list
this.getAllHaves = function(){
  return $http.get('/movies/have')
};


this.getMovieMatches = function(text){
  // text = text.replace(/\s/g,"").toLowerCase();
  if(text.length<3) return [];
  return $http.get(`http://www.omdbapi.com/?s=${text}&plot=short&r=json`).then(function(res) {
  	console.log(res);
  	if(!res.data.Search) return [];
  	for(var i=0;i<res.data.Search.length; i++) {
		if(res.data.Search[i].Poster === 'N/A')
			res.data.Search[i].Poster = 'https://placeholdit.imgix.net/~text?txtsize=16&txt=NO+POSTER&w=50&h=50&txttrack=-2'
  	}
  	return res.data.Search;
  });

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

// angular.module('dvdSwap').service('MovieService', function($http, $window) {
// 	//get all the movies from the have list
// 	this.getAllHaves = function() {
// 		return $http.get('/movies/have')
// 	};
// 	this.getMovieMatches = function(text) {
// 		if(!text) return;
// 		var newText = text.replace(/\s/g, "").toLowerCase().slice(0, 5)
// 		var firstLetter = newText.charAt(0)
// 		var outside = {};
// 		var url = `http://sg.media-imdb.com/suggests/${newText.charAt(0)}/${newText}.json?callback=JSON_CALLBACK`;
// 		$window["imdb$"+newText] = function(stuff) {	return stuff;};
// 			//implement it

// 		//test it
// 		$http.jsonp(url)
// 			.then(function(json) {
// 				console.log(json);
// 			}, function(err) {
// 				console.log("FUCKED UP");
// 				console.log(err);
// 			});
// 	}
// });