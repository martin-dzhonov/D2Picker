'use strict';

angular.module('d2p.homecontroller', ['ngRoute'])
.controller('HomeController', ['$scope', 'Api', 'd2pconfig', 'localStorageModule', '$location',
function ($scope, Api, d2pconfig, localStorageModule, $location) {

  var data1 = {
    hero_id: 1
  }
  Api.$get('http://localhost:5000/getHeroInfo', data1)
  .success(function(data) {
    console.log(data);
    $scope.categories = data;
  });

  $scope.category={
    name:''
  }
  $scope.submitCategory = function (heroId){
    var dd = {
      hero_id: heroId,
      category_name: $scope.category.name
    }
    console.log(dd);
    Api.$post('http://localhost:5000/categories', dd)
    .success(function(data) {
      console.log(data);
    });
  }

  $scope.getHeroes = function(){
    Api.$get('http://localhost:5000/heroes')
    .success(function(data) {
      $scope.heroes = data;
    });
  }
  $scope.getHeroes();

}]);
