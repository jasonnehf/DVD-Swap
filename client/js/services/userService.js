'use strict';

angular.module('dvdSwap').service('UserService', function($http, $rootScope) {


  this.getUser = function(){ 
    return $http.get('/users/me')
    .then(function(res) {
      $rootScope.user = res.data
      console.log(res.data)
    }, function(err){
      $rootScope.user = null;
      throw err;
      console.log('err', err);
    });
  }

  this.getAllWants = function() {
    return $http.get('/users/want')
  }

// get http:.get(user /profile to get the user info from DB

this.logoutUser = () => $http.post('/logout')


this.addHave = function(title){
  console.log(title)
  return $http.put('/users/have', {title})
}

this.deleteHave = (movie) => $http.delete('/users/have')

})

