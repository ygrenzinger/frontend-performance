/*
 * Serve JSON to our AngularJS client
 */

var interval = 1000;
var nbPricesGenerated = 1;
var nbCompanies = 200;

exports.name = function (req, res) {
  res.json({
  	name: 'Market Prices'
  });
};


exports.interval = function() {
  return interval;
};
exports.changeInterval = function (_interval) {
  interval = _interval;
};

exports.nbPricesGenerated = function() {
  return nbPricesGenerated;
};
exports.changeNbPricesGenerated = function (_nbPricesGenerated) {
  nbPricesGenerated = _nbPricesGenerated;
};

exports.nbCompanies = function() {
  return nbCompanies;
};
exports.changeNbCompanies = function (_nbCompanies) {
  nbCompanies = _nbCompanies;
};
