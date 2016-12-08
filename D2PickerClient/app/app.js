'use strict';

var app = angular.module('d2p', ['ngRoute','d2p.homecontroller','d2p.registercontroller','d2p.logincontroller','d2p.api', 'd2p.config', 'd2p.localstorage']).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $routeProvider
  .when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginController'
  })
  .when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterController'
  })
  .when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeController'
  });

  // $routeProvider.otherwise({redirectTo: '/login'});

}]);
