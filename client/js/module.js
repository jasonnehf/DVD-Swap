angular.module('dvdSwap', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){


  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('browse', {
    url: "/",
    templateUrl: "html/browse.html",
    controller: "browseCtrl"
  })
  .state('profile', {
    url: "/profile",
    templateUrl: "html/profile.html",
    controller: "profileCtrl"
  })
  .state('login', {
    url: "/login",
    templateUrl: "html/login.html",
    controller: "loginCtrl"
  })
  .state('admin', {
    url: "/admin",
    templateUrl: "html/admin.html",
    controller: "adminCtrl"
  })
  .state('interest', {
    url: "/interest",
    templateUrl: "html/interest.html",
    controller: "interestCtrl"
  })


})