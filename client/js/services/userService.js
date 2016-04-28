'use strict';

angular.module('dvdSwap').service('UserService', function($http, $rootScope) {

  
  this.getUser = function(){ 
    return $http.get('/users/profile')
    .then(function(res) {
      $rootScope.user = res.data
    }, function(err){
      $rootScope.user = null;
      throw err;
      console.log('err', err);
    });
  }


  this.logoutUser = () => $http.post('/logout')

  
})

