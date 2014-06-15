/*
 * Serve content over a socket
 */

var _ = require('lodash-node');
var moment = require('moment');
var fs = require('fs');
var api = require('./api');

module.exports = function(socket) {
  var allStocks = {};
  var allStocksArray = [];
  fs.readFile('sp500.json', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    var json = JSON.parse(data);;
    for (var i = 0; i < json.length; i++) {
      var stock = json[i];
      allStocks[stock['symbol']] = {
        "symbol": stock['symbol'],
        "company": stock['company'],
        "sector": stock['sector'],
        "industry": stock['industry'],
        "price": _.random(0.00, 200.00),
        "variation": 0.00
      }
    }
    allStocksArray = _.values(allStocks);
  });

  var randomizeNewStockPrices = function() {
    var stocks = [];
    for (var j = 0; j < api.nbCompanies(); j++) {
      stocks.push(allStocksArray[j]);
    }
    //var stocks = _.first(allStocksArray, api.nbCompanies());

    var symbols = _.map(stocks, function(stock){
      return stock.symbol;
    });

    for (var i = 0; i < api.nbCompanies(); i++) {
      var symbol = symbols[_.random(0, api.nbCompanies() - 1)];
      var stock = allStocks[symbol];
      var variation = _.random(-0.9, 0.9) * api.interval() / 1000;
      variation = Math.round(variation * 100) / 100;
      var newPrice = (stock.price * variation) / 100.0 + stock.price;
      newPrice = Math.round(newPrice * 100) / 100;
      stock.price = newPrice;
      stock.variation = variation;
    }
    return stocks;
  }

  var emit = function() {
    socket.emit('send:time', {
      time: moment().format("YYYY/MM/DD, HH:mm:ss.SSS")
    });
    if (!_.isEmpty(allStocks)) {
      socket.emit('send:stocks', randomizeNewStockPrices());
    }
    setTimeout(emit, api.interval());
  };

  emit();
};

var companies = [
  "Accor",
  "Air Liquide",
  "Airbus Group",
  "Alstom",
  "ArcelorMittal",
  "AXA",
  "BNP Paribas",
  "Bouygues",
  "Capgemini",
  "Carrefour",
  "Crédit Agricole",
  "EDF",
  "Essilor",
  "Gemalto",
  "GDF Suez",
  "Groupe Danone",
  "L'Oréal",
  "Lafarge",
  "Legrand",
  "LVMH",
  "Michelin",
  "Orange",
  "Pernod Ricard",
  "PPR",
  "Publicis",
  "Renault",
  "Safran",
  "Saint-Gobain",
  "Sanofi",
  "Schneider Electric",
  "Société Générale",
  "Solvay",
  "STMicroelectronics",
  "Technip",
  "Total",
  "Unibail-Rodamco",
  "Vallourec",
  "Veolia Environnement",
  "Vinci",
  "Vivendi"
];
var symbols = [
  "AC",
  "AI",
  "AIR",
  "ALO",
  "MT",
  "CS",
  "BNP",
  "EN",
  "CAP",
  "CA",
  "ACA",
  "EDF",
  "EI",
  "GTO",
  "GSZ",
  "BN",
  "OR",
  "LG",
  "LR",
  "MC",
  "ML",
  "ORA",
  "RI",
  "PP",
  "PUB",
  "RNO",
  "SAF",
  "SGO",
  "SAN",
  "SU",
  "GLE",
  "SOLB",
  "STM",
  "TEC",
  "FP",
  "UL",
  "VK",
  "VIE",
  "DG",
  "VIV"
];
