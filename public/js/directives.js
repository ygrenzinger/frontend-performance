'use strict';

/* Directives */
angular.module('myApp.directives', [])
  .directive('appVersion', function(appname) {
    return function(scope, elm, attrs) {
      elm.text(appname);
    };
  })
  .directive('fastStocks', function() {
    return {
      restrict: 'E',
      scope: {
        stocks: '=',
        orderBy: '='
      },
      link: function(scope, el, attrs) {
        var orderBy = 'price';
        scope.$watch('orderBy', function(newValue) {
          orderBy = newValue;
        });
        scope.$watch('stocks', function(newValue) {
          React.renderComponent(
            StocksComponent({
              stocks: newValue,
              orderBy: orderBy
            }),
            el[0]
          );
        });
      }
    }
  });
