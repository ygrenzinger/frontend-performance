'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('AppCtrl', function($scope, $http, socket) {
  $http.get("/api/interval").success(function(interval) {
    $scope.interval = parseInt(interval);
  });
  $scope.changeInterval = function() {
    $http.put('/api/interval/'+$scope.interval).success(function(interval) {
      $scope.interval = parseInt(interval);
    });
  };

  $http.get("/api/nbPricesGenerated").success(function(nbPricesGenerated) {
    $scope.nbPricesGenerated = parseInt(nbPricesGenerated);
  });
  $scope.changeNbPricesGenerated = function() {
    $http.put('/api/nbPricesGenerated/'+$scope.nbPricesGenerated).success(function(nbPricesGenerated) {
      $scope.nbPricesGenerated = parseInt(nbPricesGenerated);
    });
  };

  $http.get("/api/nbCompanies").success(function(nbCompanies) {
    $scope.nbCompanies = parseInt(nbCompanies);
  });
  $scope.changeNbCompanies = function() {
    $http.put('/api/nbCompanies/'+$scope.nbCompanies).success(function(nbCompanies) {
      $scope.nbCompanies = parseInt(nbCompanies);
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
