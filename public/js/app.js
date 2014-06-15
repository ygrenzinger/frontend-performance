'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'ngRoute',

  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',

  // 3rd party dependencies
  'btford.socket-io'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/angular', {
      templateUrl: 'partials/angular',
      controller: 'AngularCtrl'
    }).
    when('/react', {
      templateUrl: 'partials/react',
      controller: 'ReactCtrl'
    }).
    otherwise({
      redirectTo: '/angular'
    });

  $locationProvider.html5Mode(true);
});
