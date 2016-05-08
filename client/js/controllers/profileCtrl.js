'use strict'
angular.module('dvdSwap').controller('profileCtrl', function($scope, UserService, $rootScope, $state, MovieService) {
	UserService.getUser()
		.catch(function(res) {
			$state.go('interest');
		});

	// $scope.searchTextChange = function(text) {
	// 	if (text.length < 3) {
	// 		return;
	// 	}

		$scope.getMovieMatches = function(searchText) {
			return MovieService.getMovieMatches(searchText);
		}
		// MovieService.getAllMovies()
		//   .then(function(res){
		//     $scope.movies = res.data
		//     console.log('$scope.movies ' , $scope.movies);
		//   }, function(err){
		//     console.error(err)
		//   })
		// $scope.getMatches = function(text){
		//   text = text.toLowerCase()
		//   return $scope.movies.filter(movie=> movie.title.toLowerCase().includes(text))
		// }
		// add disable button if nothing is in search bar
	$scope.addHave = function(searchText) {
		console.log("click", searchText)
		UserService.addHave(searchText)
			.then(function(res) {
				console.log(res);
				$scope.profileUser = res.data
			}, function(err) {
				console.error(err)
			})
	}
	$scope.bai = function(movie) {
			// UserService.deleteHave(movie)
			let index = $scope.profileUser.haves.indexOf(movie)
			$scope.profileUser.haves.splice(index, 1)
		}
		// UserService.addHave()
		// .then(function(res){
		// }, function(err){
		//   console.error(err)
		// })
	$scope.movieWant = [];
	$scope.addWant = function(searchText2) {
		$scope.movieWant.push(searchText2)
	}
})