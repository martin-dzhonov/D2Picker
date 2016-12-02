angular.module('myApp.heroes.service', [])
  .service('HeroesService', function($http) {
    this.getHeroes = function(){
      return $http.get('heroes.json').success(function(data) {
        return data;
      });
    }
});
