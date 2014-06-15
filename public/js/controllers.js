'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('AppCtrl', function($scope, $http, socket) {
  $http.get("/api/interval").success(function(interval) {
    $scope.interval = interval;
  });
  $scope.changeInterval = function() {
    $http.put('/api/interval/'+$scope.interval).success(function(interval) {
      $scope.interval = interval;
    });
  };

  $http.get("/api/nbPricesGenerated").success(function(nbPricesGenerated) {
    $scope.nbPricesGenerated = nbPricesGenerated;
  });
  $scope.changeNbPricesGenerated = function() {
    $http.put('/api/nbPricesGenerated/'+$scope.nbPricesGenerated).success(function(nbPricesGenerated) {
      $scope.nbPricesGenerated = nbPricesGenerated;
    });
  };

  $http.get("/api/nbCompanies").success(function(nbCompanies) {
    $scope.nbCompanies = nbCompanies;
  });
  $scope.changeNbCompanies = function() {
    $http.put('/api/nbCompanies/'+$scope.nbCompanies).success(function(nbCompanies) {
      $scope.nbCompanies = nbCompanies;
    });
  };

  socket.on('send:stocks', function(data) {
    $scope.stocks = data;
  });
  socket.on('send:time', function(data) {
    $scope.time = data.time;
  });
}).
controller('AngularCtrl', function($scope, socket) {
  $scope.getVariationClass = function(variation) {
    if (variation > 0) {
      return 'up';
    } else if (variation < 0) {
      return 'down';
    } else {
      return '';
    }
  }
}).
controller('ReactCtrl', function($scope) {
  // write Ctrl here
});
