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
        scope.$watchCollection('stocks', function(newValue, oldValue) {
          React.renderComponent(
            MYSTOCKS({
              stocks: newValue
            }),
            el[0]
          );
        })
      }
    }
  });
