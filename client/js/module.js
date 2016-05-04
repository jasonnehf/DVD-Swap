'use strict'

angular.module('dvdSwap', ['ui.router', 'ngMaterial'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider){


  $urlRouterProvider.otherwise("interest");

  $stateProvider
  .state('browse', {
    url: "/browse",
    templateUrl: "html/browse.html",
    controller: "browseCtrl"
  })
  .state('profile', {
    url: "/profile",
    templateUrl: "html/profile.html",
    controller: "profileCtrl"
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
  .state('detail', {
    url: "/detail",
    templateUrl: "html/detail.html"
    // controller: "interestCtrl"
  }) 
  .state('goodbye', {
    url: "/goodbye",
    templateUrl: "html/goodbye.html"
  }) 


$locationProvider.html5Mode({
  enabled:true,
  requireBase: true,
  rewriteLinks: false
});

})