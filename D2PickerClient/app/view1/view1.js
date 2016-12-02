'use strict';

angular.module('myApp.view1', ['ngRoute'])
.controller('View1Ctrl', ['$scope', 'HeroesService', function ($scope, HeroesService) {
  HeroesService.getHeroes().then(function (result) {
      $scope.heroes = result.data.heroes;
    })
}])
