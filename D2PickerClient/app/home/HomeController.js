'use strict';

angular.module('d2p.homecontroller', ['ngRoute'])
.controller('HomeController', ['$scope', 'Api', 'd2pconfig', 'localStorageModule', '$location',
function ($scope, Api, d2pconfig, localStorageModule, $location) {

  $scope.inputs ={};

  $scope.toggleHero = function(hero){
    hero.toggled = !hero.toggled
    $scope.heroSelected = hero;
    if(hero.toggled){
      var data1 = {
        hero_id: hero.id
      }
      Api.$post('http://localhost:5000/getHeroInfo', data1)
      .success(function(data) {
        console.log(data);
        $scope.categories = data;
      });
    }
  }

    $scope.save = function(){
      var data ={
        categories: $scope.categories,
        hero_id: $scope.heroSelected.id
      }

      Api.$post('http://localhost:5000/updateAttributes', data)
      .success(function(data) {
      });
    }

  $scope.save = function(){
    var data ={
      categories: $scope.categories,
      hero_id: $scope.heroSelected.id
    }

    Api.$post('http://localhost:5000/updateAttributes', data)
    .success(function(data) {
    });
  }

  $scope.getHeroes = function(){
    Api.$get('http://localhost:5000/heroes')
    .success(function(data) {
      $scope.heroes = data;
    });
  }

  $scope.updateAttribute = function(attribute){
    var data = {
      attribute: attribute
    };
      Api.$post('http://localhost:5000/updateAttributes', data)
      .success(function(data) {
        console.log(data);
      });
  }

  $scope.toggleBool = function(attribute){
    if(attribute.value == 0){
      attribute.value = 1;
    } else{
      attribute.value = 0;
    }

    $scope.updateAttribute(attribute);
  }

  $scope.getHeroes();


    // $scope.submitCategory = function (heroId){
    //   var dd = {
    //     hero_id: heroId,
    //     category_name: $scope.category.name
    //   }
    //   console.log(dd);
    //   Api.$post('http://localhost:5000/categories', dd)
    //   .success(function(data) {
    //     console.log(data);
    //   });
    // }
}]);
