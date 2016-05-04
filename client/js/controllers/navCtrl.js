'use strict'

angular.module('dvdSwap')
.controller('navCtrl', function($scope, UserService, $rootScope, $state) {




$scope.logout = function(user){
  UserService.logoutUser(user)
  .then(function(){
    $rootScope.user = null;
    $state.go('goodbye')
  }, function(err){
    console.log('err', err)
  })
}



})