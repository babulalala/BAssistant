'use strict';

/*
2017.02.28
- need to change route to ui-route, recently I use ng-route
*/

angular.module('bassApp',['bassApp.controllers','ui.router','shoppingListModule','noteModule','testModule']);

angular.module('bassApp').config(function($stateProvider,$urlRouterProvider,$locationProvider){
  $locationProvider.html5Mode(false);

  $stateProvider.state({
    name: 'home',
    url: '/home',
    controller: 'bassAppController',
    templateUrl: 'views/home.html',
  });

  $urlRouterProvider.otherwise('/home');

  // add module views here
  // shoppingListModule
  $stateProvider.state({
    name: 'shoppingList',
    url: '/shoppingList',
    controller: 'ShoppingListController',
    templateUrl: 'modules/shoppingList/views/shoppingList.html',
  });
    
  // noteModule
  $stateProvider.state({
    name: 'note',
    url: '/note',
    controller: 'NoteController',
    templateUrl: 'modules/note/views/note.html',
  });

  // testModule
  // this module is used for test and study
  $stateProvider.state({
    name: 'test',
    url: '/test',
    controller: 'testController',
    templateUrl: 'modules/test/views/test.html',
  });

});

/*

angular.module('bassApp').config(function($routeProvider,$locationProvider){
  $routeProvider.when('/shoppingList',{
    controller: 'ShoppingListController',
    templateUrl: 'modules/shoppingList/views/shoppingList.html',
    resolve: {
      names: function() {
          return ['Misko', 'Vojta', 'Brad'];
      }
    }
  }).when('/note',{
    controller: 'NoteController',
    templateUrl: 'modules/note/views/note.html',
  }).when('/home',{
    controller: 'bassAppController',
    templateUrl: 'views/home.html',
  }).otherwise({redirectTo: '/home'});
  $locationProvider.html5Mode(false);
});

angular.module('mainApp').run(function($rootScope){
  $rootScope.$on('$routeChangeSuccess',function(){
    console.log("mainApp: route change success");
  });
 });
*/
