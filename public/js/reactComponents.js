/** @jsx React.DOM */
var MYSTOCKS = React.createClass({
  displayName: 'MYSTOCKS',
  render: function() {
    var stocks = this.props.stocks;
    stocks = _.sortBy(stocks, 'price').reverse();
    var rows = [];
    if (stocks) {
      rows = stocks.map(function(stock) {

        var variationClass = '';
        var variation = parseFloat(stock['variation']);
        if (variation < 0) {
          variationClass  = "down";
        } else if (variation > 0) {
          variationClass  = "up";
        }

        var clickHandler = function(ev) {
          console.log("Still in reactJs");
          console.log(ev);
        }

        return (
          React.DOM.tr({
              className:variationClass,
              onClick: clickHandler
            },
            React.DOM.td(null, stock['symbol']),
            React.DOM.td(null, stock['price']),
            React.DOM.td(null, variation),
            React.DOM.td(null, stock['company']),
            React.DOM.td(null, stock['sector']),
            React.DOM.td(null, stock['industry'])
          )
        );
      });
    }

    return (
      <table>
        <thead>
          <tr>
            <th className="symbol">Symbol</th>
            <th className="price">Price</th >
            <th className="variation">Variation</th>
            <th className="company">Company</th>
            <th className="sector">Sector</th>
            <th className="industry">Industry</th>
          </tr>
        </thead>
        <tbody> {
          rows
        } </tbody>
        </table>
    )
  }
});
