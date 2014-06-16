'use strict';

/* Directives */


var MYSTOCKS = React.createClass({
  displayName: 'MYSTOCKS',
  render: function() {

    var stocks = this.props.stocks;
    if (stocks.length > 0) {
      var rows = stocks.map(function(stock) {
        var classString
        var clickHandler = function(ev) {
          console.log("Still in reactJs");
          console.log(ev);
        }

        return (
          React.DOM.tr({
              onClick: clickHandler
            },
            React.DOM.td(null, stock['symbol']),
            React.DOM.td(null, stock['price']),
            React.DOM.td(null, stock['variation']),
            React.DOM.td(null, stock['company']),
            React.DOM.td(null, stock['sector'])
          )
        );
      });
    }

    return (
      React.DOM.table(null,
        rows
      )
    );
  }
});

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
