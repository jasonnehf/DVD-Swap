'use strict';

var app = angular.module('dvdSwap');



app.service('UserService', function($http) {

  this.getUser = () =>  $http.get('/users/profile')  

  this.logoutUser = () => $http.post('/logout')

  
})