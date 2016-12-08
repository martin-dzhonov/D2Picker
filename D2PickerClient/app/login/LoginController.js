'use strict';

angular.module('d2p.logincontroller', ['ngRoute'])
.controller('LoginController', ['$scope', 'Api', 'localStorageModule', 'd2pconfig', '$location',
 function ($scope, Api, localStorageModule, d2pconfig, $location) {
  $scope.login = function(){
    Api.$post('http://localhost:5000/login', $scope.formData)
    .success(function(data) {
      localStorageModule.set(d2pconfig.access_token, data.token);
      localStorageModule.set(d2pconfig.status_token, 'REGISTERED');
      $location.path('/home');
    })
    .error(function(error){
      console.log(error);
    });;
  }
}]);
