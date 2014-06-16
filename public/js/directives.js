'use strict';

/* Directives */


var MYSTOCKS = React.createClass({
  displayName: 'MYSTOCKS',
  render: function() {

    var stocks = this.props.stocks;
    var rows = [];
    if (stocks) {
      rows = stocks.map(function(stock) {
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
      <table>
        <thead>
          <tr>
            <th className="symbol">Symbol</th>
            <th className="price">Price</th>
            <th className="variation">Variation</th>
            <th className="company">Company</th>
            <th className="sector">Sector</th>
            <th className="industry">Industry</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
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
