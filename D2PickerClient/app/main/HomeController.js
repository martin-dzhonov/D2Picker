'use strict';

angular.module('d2p.homecontroller', ['ngRoute'])
.controller('HomeController', ['$scope', 'Api', 'd2pconfig', 'localStorageModule', '$location',
function ($scope, Api, d2pconfig, localStorageModule, $location) {
  $scope.register = function(){
    Api.$post('http://localhost:5000/register', $scope.formData)
    .success(function(data) {
      localStorageModule.set(d2pconfig.access_token, data.token);
      localStorageModule.set(d2pconfig.status_token, 'REGISTERED');
      $location.path('/login');
    });
  }
}]);
