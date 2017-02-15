'use strict';

angular.module('mainApp',['mainApp.controllers','ngRoute','shoppingListModule','noteModule']);

angular.module('mainApp').config(function($routeProvider){
  $routeProvider.when('/shoppingList',{
    controller: 'ShoppingListController',
    templateUrl: 'modules/shoppingList/views/shoppingList.html',
  }).when('/note',{
    controller: 'NoteController',
    templateUrl: 'modules/note/views/note.html',
  });
});
