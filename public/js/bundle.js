'use strict';

angular.module('dvdSwap', ['ui.router', 'ngMaterial']).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider.state('browse', {
    url: "/",
    templateUrl: "html/browse.html",
    controller: "browseCtrl"
  }).state('profile', {
    url: "/profile",
    templateUrl: "html/profile.html",
    controller: "userCtrl"
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

angular.module('dvdSwap').controller('browseCtrl', ["$scope", function ($scope) {}]);

angular.module('dvdSwap').controller('loginCtrl', ["$scope", function ($scope) {}]);

angular.module('dvdSwap').controller('adminCtrl', ["$scope", function ($scope) {}]);

angular.module('dvdSwap').controller('adminCtrl', ["$scope", function ($scope) {}]);
'use strict';

angular.module('dvdSwap').controller('interestCtrl', ["$scope", "UserService", function ($scope, UserService) {

  angular.element(document).ready(function () {

    $(".belowFoldButt").click(function () {
      $('html,body').animate({
        scrollTop: $(".below-fold").offset().top - 62 }, 'slow');
    });
  });

  var movies = ["movie1", "movie2", "movie3"];

  $scope.getMatches = function (text) {
    return movies.filter(function (movie) {
      return movie.includes(text);
    });
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
}]);
'use strict';

angular.module('dvdSwap').controller('userCtrl', ["$scope", "UserService", "$rootScope", "$state", function ($scope, UserService, $rootScope, $state) {

  UserService.getUser().catch(function (res) {
    $state.go('interest');
  });

  var movies = ["movie1", "movie2", "movie3", "movie4"];

  $scope.getMatches = function (text) {
    return movies.filter(function (movie) {
      return movie.includes(text);
    });
  };

  $scope.movieHave = [];

  // add disable button if nothing is in search bar
  $scope.addHave = function (searchText) {
    $scope.movieHave.push(searchText);
  };

  $scope.movieWant = [];
  $scope.addWant = function (searchText2) {
    $scope.movieWant.push(searchText2);
  };
}]);
"use strict";
'use strict';

angular.module('dvdSwap').service('UserService', ["$http", "$rootScope", function ($http, $rootScope) {

  this.getUser = function () {
    return $http.get('/users/profile').then(function (res) {
      $rootScope.user = res.data;
      console.log(res.data);
    }, function (err) {
      $rootScope.user = null;
      throw err;
      console.log('err', err);
    });
  };

  this.logoutUser = function () {
    return $http.post('/logout');
  };
}]);