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
        stocks: '='
      },
      link: function(scope, el, attrs) {
        scope.$watch('stocks', function(newValue, oldValue) {
          React.renderComponent(
            StocksComponent({
              stocks: newValue
            }),
            el[0]
          );
        })
      }
    }
  });
