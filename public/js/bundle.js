'use strict';

angular.module('dvdSwap', ['ui.router', 'ngMaterial']).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise("interest");

  $stateProvider.state('browse', {
    url: "/browse",
    templateUrl: "html/browse.html",
    controller: "browseCtrl"
  }).state('profile', {
    url: "/profile",
    templateUrl: "html/profile.html",
    controller: "profileCtrl"
  }).state('admin', {
    url: "/admin",
    templateUrl: "html/admin.html",
    controller: "adminCtrl"
  }).state('interest', {
    url: "/interest",
    templateUrl: "html/interest.html",
    controller: "interestCtrl"
  }).state('detail', {
    url: "/detail",
    templateUrl: "html/detail.html"
    // controller: "interestCtrl"
  }).state('goodbye', {
    url: "/goodbye",
    templateUrl: "html/goodbye.html"
  });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true,
    rewriteLinks: false
  });
}]);
'use strict';

angular.module('dvdSwap').controller('browseCtrl', ["$scope", "MovieService", function ($scope, MovieService) {

  //get all movies people want to trade on page load ) 12 at a time?

  MovieService.getAllHaves().then(function (res) {
    $scope.movies = res.data;
    console.log($scope.movies);
  }, function (err) {
    console.error(err);
  });

  // this.genres = ('comedy romance adventure').split(' ').map(function (genres) { return { genre: genres }; });
  // console.log(this.genres)
}]);
'use strict';

angular.module('dvdSwap').controller('interestCtrl', ["$scope", "UserService", "MovieService", function ($scope, UserService, MovieService) {

  angular.element(document).ready(function () {

    $(".belowFoldButt").click(function () {
      $('html,body').animate({
        scrollTop: $(".below-fold").offset().top - 62 }, 'slow');
    });
  });

  MovieService.getAllHaves().then(function (res) {
    $scope.movies = res.data;
  }, function (err) {
    console.error(err);
  });

  $scope.getMatches = function (text) {
    text = text.toLowerCase();
    return $scope.movies.filter(function (movie) {
      return movie.title.toLowerCase().includes(text);
    }).splice(0, 5);
  };
}]);
"use strict";
'use strict';

angular.module('dvdSwap').controller('navCtrl', ["$scope", "UserService", "$rootScope", "$state", function ($scope, UserService, $rootScope, $state) {

  $scope.logout = function (user) {
    UserService.logoutUser(user).then(function () {
      $rootScope.user = null;
      $state.go('goodbye');
    }, function (err) {
      console.log('err', err);
    });
  };

  $scope.user = $rootScope.user;
}]);
'use strict';

angular.module('dvdSwap').controller('profileCtrl', ["$scope", "UserService", "$rootScope", "$state", "MovieService", function ($scope, UserService, $rootScope, $state, MovieService) {

  UserService.getUser().catch(function (res) {
    $state.go('interest');
  });

  $scope.searchTextChange = function (text) {
    MovieService.getMovieMatches(text);
  };
  // MovieService.getAllMovies()
  //   .then(function(res){
  //   $scope.movies = res.data
  //   console.log('$scope.movies ' , $scope.movies);

  // }, function(err){
  //   console.error(err)
  // })

  $scope.getMatches = function (text) {
    text = text.toLowerCase();
    return $scope.movies.filter(function (movie) {
      return movie.title.toLowerCase().includes(text);
    });
  };

  // add disable button if nothing is in search bar

  $scope.addHave = function (searchText) {
    console.log("click", searchText);
    UserService.addHave(searchText).then(function (res) {

      console.log(res);
      $scope.profileUser = res.data;
    }, function (err) {
      console.error(err);
    });
  };

  $scope.bai = function (movie) {
    // UserService.deleteHave(movie)
    var index = $scope.profileUser.haves.indexOf(movie);
    $scope.profileUser.haves.splice(index, 1);
  };

  // UserService.addHave()
  // .then(function(res){

  // }, function(err){
  //   console.error(err)
  // })

  $scope.movieWant = [];
  $scope.addWant = function (searchText2) {
    $scope.movieWant.push(searchText2);
  };
}]);
'use strict';

angular.module('dvdSwap').service('MovieService', ["$http", "$window", function ($http, $window) {
	//get all the movies from the have list
	this.getAllHaves = function () {
		return $http.get('/movies/have');
	};
	this.getMovieMatches = function (text) {
		if (!text) return;
		var newText = text.replace(/\s/g, "").toLowerCase().slice(0, 5);
		var firstLetter = newText.charAt(0);
		var outside = {};
		var url = 'http://sg.media-imdb.com/suggests/' + newText.charAt(0) + '/' + newText + '.json?callback=JSON_CALLBACK';
		$window["imdb$" + newText] = function (stuff) {
			return stuff;
		};
		//implement it

		//test it
		$http.jsonp(url).then(function (json) {
			console.log(json);
		}, function (err) {
			console.log("FUCKED UP");
			console.log(err);
		});
	};
}]);
'use strict';

angular.module('dvdSwap').service('UserService', ["$http", "$rootScope", function ($http, $rootScope) {

  this.getUser = function () {
    return $http.get('/users/me').then(function (res) {
      $rootScope.user = res.data;
      console.log(res.data);
    }, function (err) {
      $rootScope.user = null;
      throw err;
      console.log('err', err);
    });
  };

  this.getAllWants = function () {
    return $http.get('/users/want');
  };

  // get http:.get(user /profile to get the user info from DB

  this.logoutUser = function () {
    return $http.post('/logout');
  };

  this.addHave = function (title) {
    console.log(title);
    return $http.put('/users/have', { title: title });
  };

  this.deleteHave = function (movie) {
    return $http.delete('/users/have');
  };
}]);