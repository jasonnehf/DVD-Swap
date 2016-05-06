'use strict';
angular.module('dvdSwap').service('MovieService', function($http, $window) {
	//get all the movies from the have list
	this.getAllHaves = function() {
		return $http.get('/movies/have')
	};
	this.getMovieMatches = function(text) {
		if(!text) return;
		var newText = text.replace(/\s/g, "").toLowerCase().slice(0, 5)
		var firstLetter = newText.charAt(0)
		var outside = {};
		var url = `http://sg.media-imdb.com/suggests/${newText.charAt(0)}/${newText}.json?callback=JSON_CALLBACK`;
		$window["imdb$"+newText] = function(stuff) {	return stuff;};
			//implement it

		//test it
		$http.jsonp(url)
			.then(function(json) {
				console.log(json);
			}, function(err) {
				console.log("FUCKED UP");
				console.log(err);
			});
	}
});
