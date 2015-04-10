// var demoApp = angular.module('demoApp', ['demoControllers']);

var demoApp = angular.module('demoApp', ['ngRoute', 'demoControllers', 'demoServices']);

demoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  }).
  when('/userview', {
    templateUrl: 'partials/userview.html',
    controller: 'UserController'
  }).
  when('/taskview', {
    templateUrl: 'partials/taskview.html',
    controller: 'TaskController'
  }).
  when('/detailuser/:ID', {
    templateUrl: 'partials/detailuser.html',
    controller: 'DetailUserController'
  }).
   when('/detailtask/:ID', {
    templateUrl: 'partials/detailtask.html',
    controller: 'DetailTaskController'
  }).
  when('/adduser', {
    templateUrl: 'partials/adduser.html',
    controller: 'AddUserController'
  }).
  when('/addtask', {
    templateUrl: 'partials/addtask.html',
    controller: 'AddTaskController'
  }).
  otherwise({
    redirectTo: '/settings'
  });
}]);